import React from "react"
import Chip from "@mui/material/Chip"

import { TicketEvent } from "../../../model/TicketEventModel"
import { callStatusString } from "../../../settings/BusinessSettings"

type Props = {
  ticketEvent: TicketEvent;
}

const CallStatus = (props: Props) => {
  const { ticketEvent } = props

  if (ticketEvent.callStatus === "NOT_STARTED") {
    return (<Chip label={callStatusString["NOT_STARTED"]} />)
  } else if (ticketEvent.callStatus === "CALLING") {
    return (<Chip color="warning" label={`${ticketEvent.nextCallNum - 1}番まで呼び出し済み`} />)
  } else if (ticketEvent.callStatus === "FINISHED") {
    return (<Chip variant="outlined" label={callStatusString["FINISHED"]} />)
  } else {
    throw new Error("unreachable")
  }
}

export default CallStatus