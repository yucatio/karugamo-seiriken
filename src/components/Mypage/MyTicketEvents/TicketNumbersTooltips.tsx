import React from "react"
import Chip from "@mui/material/Chip"
import Tooltip from "@mui/material/Tooltip"
import Stack from "@mui/material/Stack"
import AccessibilityNewIcon from "@mui/icons-material/AccessibilityNew"
import Filter1Icon from "@mui/icons-material/Filter1"
import VolumeUpIcon from "@mui/icons-material/VolumeUp"

import { TicketEvent } from "../../../model/TicketEventModel"
import { callNumString, ticketEventString, ticketNumString } from "../../../settings/BusinessSettings"

type Props = {
  ticketEvent: TicketEvent
}

const TicketNumbersToolTips = (props: Props) => {
  const { ticketEvent } = props

  return (
    <Stack direction="row" spacing={1}>
      <Tooltip title={callNumString}>
        <Chip icon={<VolumeUpIcon />} label={ticketEvent.nextCallNum - 1} variant="outlined" />
      </Tooltip>
      <Tooltip title={ticketNumString}>
        <Chip icon={<AccessibilityNewIcon />} label={ticketEvent.nextTicketNum - 1} variant="outlined" />
      </Tooltip>
      <Tooltip title={ticketEventString["numTickets"]}>
        <Chip icon={<Filter1Icon />} label={ticketEvent.numTickets} variant="outlined" />
      </Tooltip>
    </Stack>
  )
}

export default TicketNumbersToolTips