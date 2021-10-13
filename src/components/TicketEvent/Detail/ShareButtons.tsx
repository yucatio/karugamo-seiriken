import { FacebookShareButton, FacebookIcon, TwitterShareButton, TwitterIcon } from 'react-share'
import Stack from "@mui/material/Stack"

import { TicketEvent } from "../../../model/TicketEventModel"
import { ticketEventsPath } from '../../../settings/SystemSettings'

type Props = {
  ticketEvent: TicketEvent;
}

const ShareButtons = (props: Props) => {
  const { ticketEvent } = props
  const pageUrl = `http://${process.env.REACT_APP_DOMAIN}/${ticketEventsPath}/${ticketEvent.id}`

  return (
    <Stack spacing={1} direction="row">
      <TwitterShareButton url={pageUrl} title={ticketEvent.title} hashtags={["かるがも整理券"]}>
        <TwitterIcon size={32} round />
      </TwitterShareButton>
      <FacebookShareButton url={pageUrl} quote={ticketEvent.title} hashtag="#かるがも整理券">
        <FacebookIcon size={32} round />
      </FacebookShareButton>
    </Stack>
  )
}

export default ShareButtons