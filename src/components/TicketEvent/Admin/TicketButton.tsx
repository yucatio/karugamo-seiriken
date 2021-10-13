import React, { useState } from "react"
import Button from "@mui/material/Button"
import Menu from "@mui/material/Menu"
import MenuItem from "@mui/material/MenuItem"

import { ticektStatusStringForAdmin } from "../../../settings/BusinessSettings"
import { TicketStatus } from "../../../model/TicketModel"

type Props = {
  ticketId: string;
  status: string;
  onMoveTicketClick: (ticketId: string, status: TicketStatus) => void;
}

const TicketButton = (props: Props) => {
  const { ticketId, status, onMoveTicketClick } = props

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleMoveTicketClick = (ticketId: string, status: TicketStatus) => {
    setAnchorEl(null)
    onMoveTicketClick(ticketId, status)
  }

  const open = Boolean(anchorEl)

  return (
    <>
      <Button
        onClick={handleClick}
        variant="contained" color="secondary" sx={{ width: "50px", height: "50px", m: 1 }}
      >
        {ticketId}
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        {status !== "CALLED" &&
          <MenuItem onClick={() => handleMoveTicketClick(ticketId, "CALLED")}>
            {ticektStatusStringForAdmin["CALLED"]} に移動
          </MenuItem>
        }
        {status !== "STATUS_GREEN" &&
          <MenuItem onClick={() => handleMoveTicketClick(ticketId, "STATUS_GREEN")}>
            {ticektStatusStringForAdmin["STATUS_GREEN"]} に移動
          </MenuItem>
        }
        {status !== "STATUS_YELLOW" &&
          <MenuItem onClick={() => handleMoveTicketClick(ticketId, "STATUS_YELLOW")}>
            {ticektStatusStringForAdmin["STATUS_YELLOW"]} に移動
          </MenuItem>
        }
        {status !== "STATUS_RED" &&
          <MenuItem onClick={() => handleMoveTicketClick(ticketId, "STATUS_RED")}>
            {ticektStatusStringForAdmin["STATUS_RED"]} に移動
          </MenuItem>
        }
      </Menu>
    </>
  )
}

export default TicketButton