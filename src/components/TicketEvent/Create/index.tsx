import React, { useState } from "react"
import { Link as RouterLink } from "react-router-dom"
import { useHistory } from "react-router-dom"
import { EditorState, convertToRaw } from "draft-js"
import Backdrop from "@mui/material/Backdrop"
import Button from "@mui/material/Button"
import Box from "@mui/material/Box"
import Checkbox from "@mui/material/Checkbox"
import CircularProgress from "@mui/material/CircularProgress"
import FormControlLabel from "@mui/material/FormControlLabel"
import Paper from "@mui/material/Paper"
import Typography from "@mui/material/Typography"

import TicketEventInputForm from "./TicketEventInputForm"
import { useAuthContext } from "../../../context/AuthContext"
import { useSnackbarContext } from "../../../context/SnackbarContext"
import { createTicketEvent } from "../../../repository/TicketEventRepository"
import { TicketEventForm } from "../../../model/TicketEventModel"
import { commonInputString, ticketEventString } from "../../../settings/BusinessSettings"
import { validateTicketEvent } from "../../../validator/TicketEventValidator"
import { termsOfUsePath, ticketEventsPath } from "../../../settings/SystemSettings"
import { commonErrorMessage, fieldsHaveError, ticketEventCreated } from "../../../settings/FeedbackMessages"

const CreateTicketEvent = () => {
  const history = useHistory()
  const { currentUser } = useAuthContext()
  const { setSnackbarMessage } = useSnackbarContext()

  const [sending, setSending] = React.useState(false)
  const [values, setValues] = useState<TicketEventForm>({
    title: "",
    numTickets: "30",
    detail: "",
  })
  const [editorState, setEditorState] = useState<EditorState>(
    () => EditorState.createEmpty(),
  )
  const [acceptChecked, setAcceptChecked] = useState(false)

  const handleAcceptChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAcceptChecked(e.target.checked)
  }

  const handleCreate = async () => {
    const errors = validateTicketEvent(currentUser, values, editorState, acceptChecked)
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

    if (!currentUser) {
      throw new Error("unreachable")
    }

    setSending(true)

    // Editorの内容
    const contentState = editorState.getCurrentContent()
    const editorContent = JSON.stringify(convertToRaw(contentState))

    try {
      const docRef = await createTicketEvent({ ...values, detail: editorContent }, currentUser.uid)
      setSnackbarMessage(ticketEventCreated)
      history.push(`/${ticketEventsPath}/${docRef.id}`)
    } catch (e) {
      console.log("整理券の作成に失敗", e)
      setSnackbarMessage(commonErrorMessage)
      setSending(false)
    }
  }

  const errors = validateTicketEvent(currentUser, values, editorState, acceptChecked)

  return (
    <Paper sx={{ maxWidth: 600, m: "auto", p: 4 }}>
      <Typography variant="h4" component="div" gutterBottom>
        整理券の作成
      </Typography>
      <Typography variant="body2" component="div" gutterBottom>
        必要事項を記入して、「作成する」ボタンを押してください。
      </Typography>

      {!!errors.login &&
        <Typography variant="caption" component="div" gutterBottom sx={{ color: "error.main" }}>
          {errors.login}
        </Typography>
      }
      <Box sx={{ my: 2 }}>
        <TicketEventInputForm
          type="create"
          values={values}
          setValues={setValues}
          editorState={editorState}
          onEditorStateChange={setEditorState}
          errors={errors}
        />
      </Box>
      <FormControlLabel
        control={<Checkbox checked={acceptChecked} onChange={handleAcceptChange} color="secondary" />}
        label={<><RouterLink to={termsOfUsePath}>利用規約</RouterLink>に同意する</>} />
      {!!errors.accept &&
        <Typography variant="caption" component="div" gutterBottom sx={{ color: "error.main" }}>
          {errors.accept}
        </Typography>
      }
      <Button onClick={handleCreate} fullWidth color="secondary" variant="contained" size="large">
        作成する
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

export default CreateTicketEvent