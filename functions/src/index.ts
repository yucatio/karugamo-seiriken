import * as functions from "firebase-functions"
import * as admin from "firebase-admin"
admin.initializeApp()

// 整理券の保持期間
// 変更する場合はBusinessSettings > ticketExpiryDays も更新する
const ticketExpiryDays = 30

// 古い整理券を削除する
// 定期的なジョブにすべきだが、料金がかかるので一旦Restにしておく
export const deleteOldTicketEvents = functions.https.onRequest(async (request, response) => {
  const db = admin.firestore()
  
  const threshold = new Date()
  // set to start of the day
  threshold.setHours(0, 0, 0, 0)
  threshold.setDate(threshold.getDate() - ticketExpiryDays)

  const query = db.collection("ticket-events").where("createdAt", "<", threshold)
  const querySnapshot = await query.get()
  
  querySnapshot.forEach((doc) => {
    const docData = doc.data()
    functions.logger.info("delete ticket-event",{
      id: doc.id,
      title: docData.title,
      owner: docData.owner,
      createdAt: docData.createdAt.toDate().toISOString(),
      updatedAt: docData.updatedAt.toDate().toISOString(),
    })
    const docRef = db.doc(doc.ref.path)
    db.recursiveDelete(docRef)
  })

  response.send(`Delete count: ${querySnapshot.size}`)
})
