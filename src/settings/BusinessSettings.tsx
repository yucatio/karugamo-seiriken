import { CallStatus, TicketEvent } from "../model/TicketEventModel"
import { TicketStatus } from "../model/TicketModel"

export const formatSettings = {
  ticketEvent: {
    title: {
      required: true,
      max: 50,
    },
    numTickets: {
      min: 3,
      max: 100,
    },
    detail: {
      maxPlain: 500,
    }
  }
}

// チケットが削除されるまでの期間
export const ticketExpiryDays = 30

export const commonInputString: { [key: string]: string } = {
  login: "ログイン",
  accept: "利用規約に同意",
}

export const ticketEventString: { [key in keyof TicketEvent]: string } = {
  id: "ID",
  title: "整理券名",
  numTickets: "整理券枚数",
  detail: "詳細情報",
  callStatus: "呼び出し状況",
  nextTicketNum: "次の整理券番号",
  nextCallNum: "次の呼び出し番号",
  owner: "作成者",
  createdAt: "作成日時",
  updatedAt: "更新日時",
}

export const callNumString = "呼び出し済み枚数"
export const ticketNumString = "取得済み枚数"

export const callStatusString: { [key in CallStatus]: string } = {
  NOT_STARTED: "呼び出し開始前",
  CALLING: "呼び出し中",
  FINISHED: "呼び出し終了",
}

export const ticektStatusStringForUser: { [key in TicketStatus]: string } = {
  WAITING: "呼び出し待ち",
  CALLED: "呼び出し済み",
  STATUS_GREEN: "呼び出し済み",
  STATUS_YELLOW: "呼び出し済み",
  STATUS_RED: "呼び出し済み",
}

export const ticektStatusStringForAdmin: { [key in TicketStatus]: string } = {
  WAITING: "呼び出し待ち",
  CALLED: "呼び出し済み",
  STATUS_GREEN: "処理済み",
  STATUS_YELLOW: "ステータス 黄色",
  STATUS_RED: "ステータス 赤",
}
