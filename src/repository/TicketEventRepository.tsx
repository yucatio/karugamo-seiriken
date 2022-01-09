import {
  DocumentData, DocumentSnapshot, collection, addDoc, collectionGroup, doc, getDoc, getDocs, query,
  runTransaction, serverTimestamp, updateDoc, where, DocumentReference
} from "firebase/firestore"
import { IllegalStateError } from "../error/IllegalStateError"
import { NotFoundError } from "../error/NotFoundError"

import { db } from "../firebase"
import { TicketEvent, TicketEventForm } from "../model/TicketEventModel"
import { Ticket, TicketStatus } from "../model/TicketModel"
import { ticketEventsPath, ticketsPath, indexPath } from "../settings/SystemSettings"

export const getTicketEvent = async (ticketEventId: string): Promise<TicketEvent | undefined> => {
  const docRef = doc(db, ticketEventsPath, ticketEventId)
  const docSnap = await getDoc(docRef)

  if (!docSnap.exists()) {
    return undefined
  }

  return convertTicketEvent(docSnap);
}

export const getOwnTicketEvents = async (uid: string): Promise<TicketEvent[]> => {
  const docRef = collection(db, ticketEventsPath)
  const q = query(docRef, where("owner", "==", uid))
  const docSnaps = await getDocs(q)
  const ticketEvents: TicketEvent[] = []
  docSnaps.forEach((docSnap) => {
    ticketEvents.push(convertTicketEvent(docSnap))
  })
  return ticketEvents
}

export const getTicket = async (ticketEventId: string, ticketId: string): Promise<Ticket | undefined> => {
  const docRef = doc(db, ticketEventsPath, ticketEventId, ticketsPath, ticketId)
  const docSnap = await getDoc(docRef)

  if (!docSnap.exists()) {
    return undefined
  }

  return convertTicket(docSnap)
}

export const getTicketCollection = async (ticketEventId: string): Promise<Ticket[]> => {
  const docRef = collection(db, ticketEventsPath, ticketEventId, ticketsPath)
  const docSnaps = await getDocs(docRef)

  const tickets: Ticket[] = []

  docSnaps.forEach((docSnap) => {
    tickets.push(convertTicket(docSnap))
  })

  return tickets
}

export const getCurrentUserTicket = async (ticketEventId: string, uid: string) => {
  const docRef = collection(db, ticketEventsPath, ticketEventId, ticketsPath)
  const q = query(docRef, where("user", "==", uid))

  const docSnaps = await getDocs(q)

  if (docSnaps.size < 1) {
    return undefined
  }

  // データは1つのみ
  const docSnap = docSnaps.docs[0]
  return convertTicket(docSnap)
}

export const hasCurrentUserTicketIndex = async (ticketEventId: string, uid: string) => {
  const docRef = doc(db, ticketEventsPath, ticketEventId, indexPath,ticketsPath, "user", uid)
  const docSnap = await getDoc(docRef)

  return docSnap.exists()
}

export const getOwnTickets = async (uid: string): Promise<Ticket[]> => {
  const ticketsGroup = collectionGroup(db, ticketsPath)
  const q = query(ticketsGroup, where("user", "==", uid))
  const docSnaps = await getDocs(q)

  const tickets: Ticket[] = []

  docSnaps.forEach((docSnap) => {
    tickets.push(convertTicket(docSnap))
  })

  return tickets
}

export const createTicketEvent = async (ticketEvent: TicketEventForm, uid: string): Promise<DocumentReference<DocumentData>> => {
  const docRef = await addDoc(collection(db, ticketEventsPath), {
    title: ticketEvent.title,
    numTickets: Number(ticketEvent.numTickets),
    detail: ticketEvent.detail,
    callStatus: "NOT_STARTED",
    nextTicketNum: 1,
    nextCallNum: 1,
    owner: uid,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  })
  return docRef
}

export const updateTicketEvent = async (ticketEventId: string, ticketEvent: TicketEventForm) => {
  await updateDoc(doc(db, ticketEventsPath, ticketEventId), {
    title: ticketEvent.title,
    detail: ticketEvent.detail,
    updatedAt: serverTimestamp(),
  })

}

export const issueTicket = async (ticketEventId: string, uid: string): Promise<DocumentReference<DocumentData>> => {
  const ticketDocRef = await runTransaction(db, async (transaction) => {
    const docRef = doc(db, ticketEventsPath, ticketEventId)
    const docSnaps = await transaction.get(docRef)
    if (!docSnaps.exists()) {
      throw new NotFoundError("Document does not exist!")
    }

    const ticketNum = docSnaps.data().nextTicketNum
    const numTickets = docSnaps.data().numTickets

    if (ticketNum > numTickets) {
      throw new IllegalStateError("取得可能枚数を超えています")
    }

    // 整理券をすでに持っていないか最終確認
    const currentUserTicketIndexExists = await hasCurrentUserTicketIndex(ticketEventId, uid)
    if (currentUserTicketIndexExists) {
      throw new IllegalStateError("すでに整理券を取得しています")
    }

    // insert new ticket
    const ticketDocRef = doc(db, ticketEventsPath, ticketEventId, ticketsPath, String(ticketNum))
    transaction.set(ticketDocRef, {
      user: uid,
      status: "WAITING",
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    })

    // insert index
    const ticketIndexDocRef = doc(db, ticketEventsPath, ticketEventId, indexPath, ticketsPath, "user", uid)
    transaction.set(ticketIndexDocRef, {
      number: String(ticketNum),
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    })

    // update ticetEvenr
    const newNextTicketNum = ticketNum + 1
    transaction.update(docRef, { nextTicketNum: newNextTicketNum, updatedAt: serverTimestamp() })

    return ticketDocRef
  })

  return ticketDocRef
}

export const startCalling = async (ticketEventId: string) => {
  await runTransaction(db, async (transaction) => {
    const docRef = doc(db, ticketEventsPath, ticketEventId)
    const docSnaps = await transaction.get(docRef)
    if (!docSnaps.exists()) {
      throw new NotFoundError("Document does not exist!")
    }

    // 現在呼び出し待ちかどうか
    const currentStatus = docSnaps.data().callStatus
    if (currentStatus !== "NOT_STARTED") {
      throw new IllegalStateError("Already started. Please reload")
    }

    transaction.update(docRef, { callStatus: "CALLING", nextCallNum: 2, updatedAt: serverTimestamp() })

    // 1番を呼び出す
    transaction.update(doc(db, ticketEventsPath, ticketEventId, ticketsPath, "1"), {
      status: "CALLED",
      calledAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    })
  })
}

export const callTicket = async (ticketEventId: string, callNumber: number) => {
  await runTransaction(db, async (transaction) => {
    const docRef = doc(db, ticketEventsPath, ticketEventId)
    const docSnaps = await transaction.get(docRef)
    if (!docSnaps.exists()) {
      throw new NotFoundError("Document does not exist!")
    }

    // checks nextCallNum is same as DB
    if (callNumber !== docSnaps.data().nextCallNum) {
      throw new IllegalStateError("data needs to be updated. please reload")
    }

    const nextCallNumber = callNumber + 1
    if (nextCallNumber <= docSnaps.data().numTickets) {
      transaction.update(docRef, { nextCallNum: nextCallNumber, updatedAt: serverTimestamp() })
    } else {
      // 最後の整理券の場合はcallStatusをFINISHEDに変更
      transaction.update(docRef, { nextCallNum: nextCallNumber, callStatus: "FINISHED", updatedAt: serverTimestamp() })
    }

    // ticketの更新
    await updateDoc(doc(db, ticketEventsPath, ticketEventId, ticketsPath, String(callNumber)), {
      status: "CALLED",
      calledAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    })
  })
}

export const changeStatus = async (ticketEventId: string, ticketId: string, status: TicketStatus) => {
  await updateDoc(doc(db, ticketEventsPath, ticketEventId, ticketsPath, ticketId), {
    status,
    updatedAt: serverTimestamp(),
  })
}

const convertTicketEvent = (docSnap: DocumentSnapshot<DocumentData>): TicketEvent => {
  if (!docSnap.exists()) {
    throw new NotFoundError("docSnap doesn't exists")
  }

  const docData: DocumentData = docSnap.data()

  return {
    id: docSnap.id,
    title: docData["title"],
    numTickets: docData["numTickets"],
    detail: docData["detail"],
    callStatus: docData["callStatus"],
    nextTicketNum: docData["nextTicketNum"],
    nextCallNum: docData["nextCallNum"],
    owner: docData["owner"],
    createdAt: docData["createdAt"].toDate(),
    updatedAt: docData["updatedAt"].toDate(),
  }
}

const convertTicket = (docSnap: DocumentSnapshot<DocumentData>): Ticket => {
  if (!docSnap.exists()) {
    throw new NotFoundError("docSnap doesn't exists")
  }

  const docData: DocumentData = docSnap.data()

  return {
    id: docSnap.id,
    user: docData["user"],
    status: docData["status"],
    calledAt: docData["calledAt"]?.toDate(),
    createdAt: docData["createdAt"].toDate(),
    updatedAt: docData["updatedAt"].toDate(),
    parentId: docSnap.ref.parent.parent?.id
  }
}
