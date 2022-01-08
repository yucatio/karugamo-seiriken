export const commonErrorMessage = "エラーが発生しました。時間をおいて再度お試しください。"

export const ticketEventCreated = "整理券を作成しました。"
export const updatedMessage = "更新しました。"
export const ticketIssued = "整理券を取得しました。"
export const callStarted = "呼び出しを開始しました。"
export const numberCalled = (num: number): string => {
  return `${num}番を呼び出しました。`
}

export const ticketIssueFailed = "整理券の取得に失敗しました。"

export const eventTicketNotFound = "整理券が存在しません。古い整理券は削除された可能性があります。"
export const myEventTicketNotFound = "取得済みの整理券はありません。古い整理券は削除された可能性があります。"
export const loginRequiredToShowMyTickets = "取得済みの整理券を見るにはグーグルアカウントでログインしてください。"
export const myTicketNotFound = "作成した整理券はありません。古い整理券は削除された可能性があります。"
export const loginRequiredToShowMyTicketEvents = "作成した整理券を見るにはグーグルアカウントでログインしてください。"
export const unableToStartCalling = "取得済みの整理券が存在しないので呼び出しは開始できません。"
export const loginRequiredToShowAdmin = "管理画面を表示するにはグーグルアカウントでログインしてください。"
export const notUserOwnEvent = "管理対象のイベントではありません。"
export const loginRequiedToUpdateTicketEvent = "編集画面を表示するにはグーグルアカウントでログインしてください。"

/* Input error messages */
export const loginRequired = "ログインが必要です"
export const inputRequired = "入力必須です"
export const acceptTermsOfUseRequired = "利用規約に同意してください"
export const integerRequired = "整数値を入力してください"

export const lengthExceeded = (maxLength: number): string => {
  return `入力は最大${maxLength}文字です`
}

export const minimumRequired = (min: number): string => {
  return `${min}以上を入力してください`
}

export const maxExceeded = (max: number): string => {
  return `${max}以下を入力してください`
}

export const fieldsHaveError = (fields: string[]): string => {
  return `${fields.join("と")}に入力エラーがあります。各項目をご確認ください`
}