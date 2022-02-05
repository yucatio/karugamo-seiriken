import React, { FC, createContext, useState, useContext } from "react"
import Snackbar from "@mui/material/Snackbar"
import IconButton from "@mui/material/IconButton"
import CloseIcon from "@mui/icons-material/Close"

type SnackBarProps = {
  setSnackbarMessage: (alert: string) => void;
}

const SnackbarContext = createContext<SnackBarProps>({ setSnackbarMessage: (value) => { } })

export const useSnackbarContext = () => {
  return useContext(SnackbarContext)
}

export const SnackbarProvider: FC = ({ children }) => {

  const [open, setOpen] = useState(false)
  const [message, setMessage] = useState<string>("")

  const handleClose = (
    event: Event | React.SyntheticEvent<any, Event>,
    reason?: string,
  ) => {
    if (reason === "clickaway") {
      return
    }
    setOpen(false)
  }

  const setSnackbarMessage = (newMessage: string) => {
    setMessage(newMessage)
    setOpen(true)
  }

  return (
    <SnackbarContext.Provider value={{ setSnackbarMessage }}>
      {children}
      <Snackbar
        open={open}
        message={message}
        autoHideDuration={6000}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        action={
          <IconButton
            size="small"
            aria-label="close"
            color="inherit"
            onClick={handleClose}
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        }
        onClose={handleClose}
      />
    </SnackbarContext.Provider>
  )

}