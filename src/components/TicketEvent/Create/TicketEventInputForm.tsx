import React, { ChangeEvent } from "react"
import { EditorState } from "draft-js"
import Skeleton from "@mui/material/Skeleton"
import Stack from "@mui/material/Stack"
import TextField from "@mui/material/TextField"
import Typography from "@mui/material/Typography"

import RichEditor from "../../RitchEditor"
import { TicketEventForm } from "../../../model/TicketEventModel"
import { formatSettings, ticketEventString } from "../../../settings/BusinessSettings"

type Props = {
  type: "create" | "update"; 
  values: TicketEventForm;
  setValues: React.Dispatch<React.SetStateAction<TicketEventForm>>;
  editorState: EditorState;
  onEditorStateChange: React.Dispatch<React.SetStateAction<EditorState>>;
  errors: {
    [x: string]: string | undefined;
    [x: number]: string | undefined;
  };
}

const TicketEventInputForm = (props: Props) => {
  const { type, values, setValues, editorState, onEditorStateChange, errors } = props

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [e.target.name]: e.target.value })
  }

  return (
    <>
      <TextField
        label={`${ticketEventString.title} (最大${formatSettings.ticketEvent.title.max}文字)`}
        name="title"
        required
        defaultValue={values.title}
        error={!!errors.title}
        helperText={errors?.title}
        onChange={handleInputChange}
        fullWidth
        sx={{ mb: 2 }}
        InputProps={{ inputProps: { maxLength: formatSettings.ticketEvent.title.max } }}
      />
      <TextField
        disabled={type !== "create"}
        label={`${ticketEventString.numTickets} (最大${formatSettings.ticketEvent.numTickets.max}枚)`}
        type="number"
        name="numTickets"
        required
        defaultValue={values.numTickets}
        error={!!errors.numTickets}
        helperText={errors?.numTickets}
        onChange={handleInputChange}
        fullWidth
        sx={{ mb: 2 }}
        InputProps={{
          inputProps:
            { min: formatSettings.ticketEvent.numTickets.min, max: formatSettings.ticketEvent.numTickets.max }
        }}
      />
      <Typography variant="caption" component="div" gutterBottom>
        {ticketEventString["detail"]} (最大{formatSettings.ticketEvent.detail.maxPlain}文字)
      </Typography>
      {!!errors.detail &&
        <Typography variant="caption" component="div" gutterBottom sx={{ color: "error.main" }}>
          {errors.detail}
        </Typography>
      }
      <RichEditor editorState={editorState} onChange={onEditorStateChange} />
    </>
  )
}

export default TicketEventInputForm

export const TicketEventInputFormSkeleton = () => (
  <Stack spacing={2}>
    <Skeleton variant="rectangular" height={56} />
    <Skeleton variant="rectangular" height={56} />
    <Skeleton variant="rectangular" height={100} />
  </Stack>
)