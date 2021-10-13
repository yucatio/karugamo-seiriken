export const ticketEventsPath = "ticket-events"
export const ticketsPath = "tickets"
export const mypagePath = "mypage"
export const createPath = "create"
export const editPath = "edit"
export const adminPath = "admin"

export const howToUsePath = "/info/how-to-use"
export const termsOfUsePath = "/info/terms-of-use"
export const privacyPolicyPath = "/info/privacy-policy"

export const createQRCodeQuery = (size: number, url: string) => (
  `size=${size}x${size}&data=${url}`
)

export const qrCodeGeneratorURL="https://api.qrserver.com/v1/create-qr-code/"
