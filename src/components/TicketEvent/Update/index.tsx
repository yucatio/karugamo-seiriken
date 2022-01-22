import React, { useEffect, useState } from "react"
import { useHistory, useParams } from "react-router-dom"
import { EditorState, convertToRaw, convertFromRaw } from "draft-js"
import Alert from "@mui/material/Alert"
import Backdrop from "@mui/material/Backdrop"
import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import CircularProgress from "@mui/material/CircularProgress"
import Paper from "@mui/material/Paper"
import Typography from "@mui/material/Typography"

import TicketEventInputForm, { TicketEventInputFormSkeleton } from "../Create/TicketEventInputForm"
import { useAuthContext } from "../../../context/AuthContext"
import { useSnackbarContext } from "../../../context/SnackbarContext"
import { TicketEvent, TicketEventForm } from "../../../model/TicketEventModel"
import { getTicketEvent, updateTicketEvent } from "../../../repository/TicketEventRepository"
import { validateTicketEvent } from "../../../validator/TicketEventValidator"
import { commonErrorMessage, eventTicketNotFound, fieldsHaveError, loginRequiedToUpdateTicketEvent, notUserOwnEvent, updatedMessage } from "../../../settings/FeedbackMessages"
import { ticketEventsPath } from "../../../settings/SystemSettings"
import { commonInputString, ticketEventString } from "../../../settings/BusinessSettings"

const UpdateTicketEvent = () => {
  const { ticketEventId } = useParams<{ ticketEventId: string }>()
  const history = useHistory()
  const { currentUser, authLoaded } = useAuthContext()
  const { setSnackbarMessage } = useSnackbarContext()

  const [loaded, setLoaded] = useState(false)
  const [ticketEvent, setTicketEvent] = useState<TicketEvent>()
  const [values, setValues] = useState<TicketEventForm>({
    title: "",
    numTickets: "",
    detail: "",
  })
  const [editorState, setEditorState] = useState<EditorState>(
    () => EditorState.createEmpty(),
  )
  const [sending, setSending] = React.useState(false)

  useEffect(() => {
    const initialize = async () => {
      if (!authLoaded) {
        return
      }
      setLoaded(false)
      if (currentUser) {
        const dbTicketEvent = await getTicketEvent(ticketEventId)
        setTicketEvent(dbTicketEvent)

        if (dbTicketEvent) {
          setValues({
            title: dbTicketEvent.title,
            numTickets: String(dbTicketEvent.numTickets),
            detail: dbTicketEvent.detail,
          })
          setEditorState(EditorState.createWithContent(
            convertFromRaw(JSON.parse(dbTicketEvent.detail))
          ))
        }
      }
      setLoaded(true)
    }
    initialize()
  }, [ticketEventId, currentUser, authLoaded])

  const handleUpdate = async () => {
    const errors = validateTicketEvent(currentUser, values, editorState, true)
    // 表示名(日本語名)のオブジェクト
    const inputStr: { [key: string]: string } = { ...commonInputString, ...ticketEventString }
    // エラーがあった項目の表示名(日本語)
    const errorKeysStr = Object.entries(errors)
      .filter(([name, error]) => error)
      .map(([name, error]) => inputStr[name])

    if (errorKeysStr.length > 0) {
      setSnackbarMessage(fieldsHaveError(errorKeysStr))
      return
    }

    setSending(true)
    // Editorの内容
    const contentState = editorState.getCurrentContent()
    const editorContent = JSON.stringify(convertToRaw(contentState))

    try {
      await updateTicketEvent(ticketEventId, { ...values, detail: editorContent })

      setSnackbarMessage(updatedMessage)
      history.push(`/${ticketEventsPath}/${ticketEventId}`)
    } catch (e) {
      console.log("整理券の更新でエラー", e)

      setSnackbarMessage(commonErrorMessage)
      setSending(false)
    }
  }

  if (!loaded) {
    // TODO
    return (<UpdateTicketEventSkeleton />)
  }

  if (!currentUser) {
    return (
      <Alert severity="warning">
        {loginRequiedToUpdateTicketEvent}
      </Alert>
    )
  }

  if (!ticketEvent) {
    return (
      <Alert severity="info">
        {eventTicketNotFound}
      </Alert>
    )
  }

  if (currentUser.uid !== ticketEvent.owner) {
    return (
      <Alert severity="warning">
        {notUserOwnEvent}
      </Alert>
    )
  }

  const errors = validateTicketEvent(currentUser, values, editorState, true)

  return (
    <Paper sx={{ maxWidth: 600, m: "auto", p: 4 }}>
      <Typography variant="h4" component="div" gutterBottom>
        整理券の編集
      </Typography>
      <Box sx={{ my: 2 }}>
        <TicketEventInputForm
          type="update"
          values={values}
          setValues={setValues}
          editorState={editorState}
          onEditorStateChange={setEditorState}
          errors={errors}
        />
      </Box>
      <Button onClick={handleUpdate} fullWidth color="secondary" variant="contained" size="large">
        更新する
      </Button>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.modal + 1 }}
        open={sending}
      >
        <CircularProgress color="inherit" />
      </Backdrop>

    </Paper>
  )
}

export default UpdateTicketEvent

const UpdateTicketEventSkeleton = () => (
  <Paper sx={{ maxWidth: 600, m: "auto", p: 4 }}>
    <Typography variant="h4" component="div" gutterBottom>
      整理券の編集
    </Typography>
    <TicketEventInputFormSkeleton />
  </Paper>
)
