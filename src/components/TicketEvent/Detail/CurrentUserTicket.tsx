import React from "react"
import Paper from "@mui/material/Paper"
import Typography from "@mui/material/Typography"
import LensIcon from "@mui/icons-material/Lens"

import { Ticket } from "../../../model/TicketModel"
import { backgroundPalette } from "../../../settings/DesignSettings"

type Props = {
  ticket: Ticket;
}

const CurrentUserTicket = (props: Props) => {
  const { ticket } = props

  return (
    <Paper elevation={3} sx={{ mb: 2, p: 1 }}>
      <Typography variant="body1" component="div" align="center" sx={{ color: backgroundPalette.white.backgroundShadow }}>
        <LensIcon />
      </Typography>
      <Typography variant="h2" align="center">
        {Number(ticket.id)}
      </Typography>
      <Typography gutterBottom variant="body1" align="center">
        番の整理券をお持ちです
      </Typography>
    </Paper>
  )
}

export default CurrentUserTicket

