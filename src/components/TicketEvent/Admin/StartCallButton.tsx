import React, { useState } from "react"
import Button from "@mui/material/Button"
import Dialog from "@mui/material/Dialog"
import DialogActions from "@mui/material/DialogActions"
import DialogContent from "@mui/material/DialogContent"
import DialogContentText from "@mui/material/DialogContentText"
import DialogTitle from "@mui/material/DialogTitle"
import Typography from "@mui/material/Typography"
import { unableToStartCalling } from "../../../settings/FeedbackMessages"

type Props = {
  enableToStart: boolean;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

const StartCallButton = (props: Props) => {
  const { enableToStart, onClick } = props

  const [dialogOpen, setDialogOpen] = useState(false)

  const handleDialogOpen = () => {
    setDialogOpen(true)
  }

  const handleDialogClose = () => {
    setDialogOpen(false)
  }

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    setDialogOpen(false)
    onClick(e)
  }

  return (
    <>
      <Button disabled={!enableToStart} onClick={handleDialogOpen} fullWidth variant="contained" size="large" sx={{ py: 4 }}>
        呼び出しを開始する
      </Button>
      <Typography variant="body2" gutterBottom>
        {enableToStart ? "" : unableToStartCalling}
      </Typography>
      <Dialog
        open={dialogOpen}
        onClose={handleDialogClose}
        aria-labelledby="dialog-title"
        aria-describedby="dialog-description"
      >
        <DialogTitle id="dialog-title">
          呼び出しを開始しますか？
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="dialog-description">
            呼び出し開始と同時に1番の番号を呼び出します。<br />
            ユーザにメールやプッシュ通知は送られません。<br />
            この操作は元に戻せません。
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClick}>開始する</Button>
          <Button onClick={handleDialogClose} autoFocus>
            キャンセル
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default StartCallButton