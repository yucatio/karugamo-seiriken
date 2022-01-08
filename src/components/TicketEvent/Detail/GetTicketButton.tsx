import React from "react"
import { User } from "firebase/auth"
import Button from "@mui/material/Button"
import Dialog from "@mui/material/Dialog"
import DialogActions from "@mui/material/DialogActions"
import DialogContent from "@mui/material/DialogContent"
import DialogContentText from "@mui/material/DialogContentText"
import DialogTitle from "@mui/material/DialogTitle"
import Skeleton from "@mui/material/Skeleton"
import Typography from "@mui/material/Typography"

import { TicketEvent } from "../../../model/TicketEventModel"

type Props = {
  loaded?: boolean;
  currentUser: User | undefined | null;
  ticketEvent: TicketEvent;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

const GetTicketButton = (props: Props) => {
  const { loaded = false, currentUser, ticketEvent, onClick } = props

  const [dialogOpen, setDialogOpen] = React.useState(false)

  const handleDialogOpen = () => {
    setDialogOpen(true)
  }

  const handleDialogClose = () => {
    setDialogOpen(false)
  }

  if (ticketEvent.nextTicketNum > ticketEvent.numTickets || ticketEvent.callStatus === "FINISHED") {
    return (
      <>
        <Button fullWidth disabled variant="contained" size="large" sx={{ py: 4 }}>整理券を取得する</Button>
        <Typography variant="subtitle2" gutterBottom>
          配布は終了しました。
        </Typography>
      </>
    )
  }

  if (!loaded) {
    return (
      <GetTicketButtonSkelton />
    )
  }

  if (!currentUser) {
    return (
      <>
        <Button fullWidth disabled variant="contained" size="large" sx={{ py: 4 }}>整理券を取得する</Button>
        <Typography variant="subtitle2" gutterBottom>
          整理券を取得するにはログインしてください。<br />
          {ticketEvent.nextTicketNum}番以降の整理券が発行されます。
        </Typography>
      </>
    )
  }

  return (
    <>
      <Button onClick={handleDialogOpen} fullWidth variant="contained" size="large" sx={{ py: 4 }}>
        整理券を取得する
      </Button>
      <Typography variant="subtitle2" gutterBottom>
        {ticketEvent.nextTicketNum}番以降の整理券が発行されます。
      </Typography>
      <Dialog
        open={dialogOpen}
        onClose={handleDialogClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          整理券を取得します
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            取得するボタンを押して下さい
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClick}>取得する</Button>
          <Button onClick={handleDialogClose} autoFocus>
            キャンセル
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )

}

export default GetTicketButton

export const GetTicketButtonSkelton = () => (
  <>
    <Skeleton variant="rectangular" height="90px" />
    <Typography variant="subtitle2" gutterBottom>
      <Skeleton />
    </Typography>
  </>
)
