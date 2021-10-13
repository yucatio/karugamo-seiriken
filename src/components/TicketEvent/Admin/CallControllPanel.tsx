import React, { useState } from "react"
import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import Divider from "@mui/material/Divider"
import Menu from "@mui/material/Menu"
import MenuItem from "@mui/material/MenuItem"
import Paper from "@mui/material/Paper"
import Typography from "@mui/material/Typography"

import TicketButton from "./TicketButton"
import { TicketEvent } from "../../../model/TicketEventModel"
import { Ticket, TicketStatus } from "../../../model/TicketModel"
import { ticketStatusBackgroundColor } from "../../../settings/DesignSettings"
import { ticektStatusStringForAdmin } from "../../../settings/BusinessSettings"


type Props = {
  ticketEvent: TicketEvent;
  tickets: Ticket[];
  onCallNextClick: () => void;
  onReloadClicked: (e: React.MouseEvent<HTMLButtonElement>) => void;
  onMoveTicketClick: (ticketId: string, status: TicketStatus) => void;
}

const CallControllPanel = (props: Props) => {
  const { ticketEvent, tickets, onCallNextClick, onReloadClicked, onMoveTicketClick } = props
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const showCallNext = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  }
  const handleCallNextClose = () => {
    setAnchorEl(null);
  }

  const handleCallNextClick = () => {
    setAnchorEl(null);
    onCallNextClick()
  }

  const open = Boolean(anchorEl);

  // copy & sort
  const sorted = tickets.concat().sort((t1, t2) => t2.updatedAt.getTime() - t1.updatedAt.getTime())
  const called = sorted.filter(t => t.status === "CALLED")
  const green = sorted.filter(t => t.status === "STATUS_GREEN")
  const yellow = sorted.filter(t => t.status === "STATUS_YELLOW")
  const red = sorted.filter(t => t.status === "STATUS_RED")

  return (
    <Box sx={{ p: 2 }}>
      {ticketEvent.nextCallNum <= ticketEvent.nextTicketNum - 1 ?
        <Button onClick={showCallNext} variant="contained" color="secondary" sx={{ width: "100px", height: "100px", fontSize: "24px" }}>
          {ticketEvent.nextCallNum}
        </Button>
        :
        <Box sx={{ height: "100px" }}>
          {ticketEvent.nextCallNum > ticketEvent.numTickets ?
            "呼び出しは終了しました。"
            :
            <>すべての番号を呼び出し済みです。<Button variant="contained" onClick={onReloadClicked}>更新</Button></>
          }
        </Box>
      }
      <Menu
        id="call-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleCallNextClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem onClick={handleCallNextClick}>呼び出す</MenuItem>
      </Menu>
      <Paper sx={{ p: 2, my: 2, backgroundColor: ticketStatusBackgroundColor["CALLED"] }}>
        <Typography gutterBottom variant="h5" component="div" align="center">
          {ticektStatusStringForAdmin["CALLED"]}
        </Typography>
        <Divider />
        <Box sx={{ minHeight: "75px", maxHeight: "250px", overflow: "scroll" }}>
          {called.map((ticket) =>
            <TicketButton key={ticket.id} ticketId={ticket.id} status={ticket.status} onMoveTicketClick={onMoveTicketClick} />
          )}
        </Box>
      </Paper>
      <Box sx={{ display: { xs: "block", sm: "flex" } }}>
        <Paper sx={{ p: 2, my: 2, backgroundColor: ticketStatusBackgroundColor["STATUS_GREEN"], flexBasis: "50%" }}>
          <Typography gutterBottom variant="h5" component="div" align="center">
            {ticektStatusStringForAdmin["STATUS_GREEN"]}
          </Typography>
          <Divider />
          <Box sx={{ minHeight: "75px", maxHeight: "250px", overflow: "scroll" }}>
            {green.map((ticket) =>
              <TicketButton key={ticket.id} ticketId={ticket.id} status={ticket.status} onMoveTicketClick={onMoveTicketClick} />
            )}
          </Box>
        </Paper>
        <Paper sx={{ p: 2, my: 2, backgroundColor: ticketStatusBackgroundColor["STATUS_YELLOW"], flexBasis: "25%" }}>
          <Typography gutterBottom variant="h5" component="div" align="center">
            {ticektStatusStringForAdmin["STATUS_YELLOW"]}
          </Typography>
          <Divider />
          <Box sx={{ minHeight: "75px", maxHeight: "250px", overflow: "scroll" }}>
            {yellow.map((ticket) =>
              <TicketButton key={ticket.id} ticketId={ticket.id} status={ticket.status} onMoveTicketClick={onMoveTicketClick} />
            )
            }
          </Box>
        </Paper>
        <Paper sx={{ p: 2, my: 2, backgroundColor: ticketStatusBackgroundColor["STATUS_RED"], flexBasis: "25%" }}>
          <Typography gutterBottom variant="h5" component="div" align="center">
            {ticektStatusStringForAdmin["STATUS_RED"]}
          </Typography>
          <Divider />
          <Box sx={{ minHeight: "75px", maxHeight: "250px", overflow: "scroll" }}>
            {red.map((ticket) =>
              <TicketButton key={ticket.id} ticketId={ticket.id} status={ticket.status} onMoveTicketClick={onMoveTicketClick} />
            )}
          </Box>
        </Paper>
      </Box>
    </Box>
  )
}

export default CallControllPanel