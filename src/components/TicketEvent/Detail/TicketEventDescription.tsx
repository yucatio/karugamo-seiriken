import React from "react"
import { EditorState, convertFromRaw } from "draft-js"
import Divider from "@mui/material/Divider"
import Skeleton from "@mui/material/Skeleton"
import Typography from "@mui/material/Typography"

import ReadOnlyEditor from "../../RitchEditor/ReadOnlyEditor"
import { TicketEvent } from "../../../model/TicketEventModel"
import { ticketEventString } from "../../../settings/BusinessSettings"

type Props = {
  ticketEvent: TicketEvent;
}

const TicketEventDescription = (props: Props) => {
  const { ticketEvent } = props

  const [editorState, setEditorState] = React.useState<EditorState>(
    () => EditorState.createWithContent(
      convertFromRaw(JSON.parse(ticketEvent.detail))
    )
  )

  return (
    <>
      <Typography gutterBottom variant="h4">
        {ticketEvent.title}
      </Typography>
      <Divider sx={{ my: 0.5 }} />
      <Typography variant="h6">
        {ticketEventString.numTickets} : {ticketEvent.numTickets}枚
      </Typography>
      <Divider sx={{ my: 0.5 }} />
      <ReadOnlyEditor editorState={editorState} onChange={setEditorState} />
    </>
  )
}

export default TicketEventDescription

export const TicketEventDescriptionSkeleton = () => (
  <>
    <Typography gutterBottom variant="h4">
      <Skeleton />
    </Typography>
    <Divider />
    <Typography variant="h6">
      <Skeleton />
    </Typography>
    <Divider />
    <Typography variant="body1">
      <Skeleton />
    </Typography>
    <Typography variant="body1">
      <Skeleton />
    </Typography>
  </>
)