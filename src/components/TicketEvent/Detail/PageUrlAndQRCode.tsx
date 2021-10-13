import Link from "@mui/material/Link"

import { TicketEvent } from "../../../model/TicketEventModel"
import { sizeSettings } from "../../../settings/DesignSettings"
import { ticketEventsPath, createQRCodeQuery, qrCodeGeneratorURL } from "../../../settings/SystemSettings"


type Props = {
  ticketEvent: TicketEvent;
}

const PageUrlAndQRCode = (props: Props) => {
  const { ticketEvent } = props

  const pageUrl = `http://${process.env.REACT_APP_DOMAIN}/${ticketEventsPath}/${ticketEvent.id}`

  return (
    <>
      このページのURL :<Link href={pageUrl}>{pageUrl}</Link>
      <br />
      <img src={`${qrCodeGeneratorURL}?${createQRCodeQuery(sizeSettings.qrCode.size, pageUrl)}`} alt="QRコード" />
    </>
  )
}

export default PageUrlAndQRCode