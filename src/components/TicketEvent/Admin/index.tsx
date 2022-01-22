import React, { useEffect, useState } from "react"
import { Link as RouterLink, useParams } from "react-router-dom"
import Alert from "@mui/material/Alert"
import Backdrop from "@mui/material/Backdrop"
import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import CircularProgress from "@mui/material/CircularProgress"
import Divider from "@mui/material/Divider"
import Paper from "@mui/material/Paper"
import Skeleton from "@mui/material/Skeleton"
import Typography from "@mui/material/Typography"

import CallControllPanel from "./CallControllPanel"
import PageUrlAndQRCode from "../Detail/PageUrlAndQRCode"
import ShareButtons from "../Detail/ShareButtons"
import StartCallButton from "./StartCallButton"
import TicketNumbersToolTips from "../../Mypage/MyTicketEvents/TicketNumbersTooltips"
import TicketEventDescription, { TicketEventDescriptionSkeleton } from "../Detail/TicketEventDescription"
import { useAuthContext } from "../../../context/AuthContext"
import { useSnackbarContext } from "../../../context/SnackbarContext"
import { TicketEvent } from "../../../model/TicketEventModel"
import { Ticket, TicketStatus } from "../../../model/TicketModel"
import { callTicket, changeStatus, getTicketCollection, getTicketEvent, startCalling } from "../../../repository/TicketEventRepository"
import { callStatusBackgroundColor } from "../../../settings/DesignSettings"
import { callStatusString } from "../../../settings/BusinessSettings"
import { callStarted, commonErrorMessage, eventTicketNotFound, loginRequiredToShowAdmin, notUserOwnEvent, numberCalled } from "../../../settings/FeedbackMessages"
import { IllegalStateError } from "../../../error/IllegalStateError"
import { editPath, ticketEventsPath } from "../../../settings/SystemSettings"

const TicketEventAdmin = () => {
  const { ticketEventId } = useParams<{ ticketEventId: string }>()
  const { currentUser, authLoaded } = useAuthContext()
  const { setSnackbarMessage } = useSnackbarContext()

  const [loaded, setLoaded] = useState(false)
  const [ticketEvent, setTicketEvent] = useState<TicketEvent>()
  const [tickets, setTickets] = useState<Ticket[]>([])
  const [sending, setSending] = React.useState(false)


  useEffect(() => {
    const initialize = async () => {
      if (!authLoaded) {
        return
      }
      setLoaded(false)
      if (currentUser) {
        await handleReload()
      }
      setLoaded(true)
    }
    initialize()
  }, [ticketEventId, currentUser, authLoaded])

  const handleReload = async () => {
    const dbTicketEvent = await getTicketEvent(ticketEventId)
    setTicketEvent(dbTicketEvent)

    if (!dbTicketEvent) {
      setTickets([])
      return
    }

    const dbTickets = await getTicketCollection(ticketEventId)
    setTickets(dbTickets)
  }

  const handleStartCalling = async () => {
    setSending(true)
    try {
      await startCalling(ticketEventId)
      setSnackbarMessage(callStarted)
    } catch (e) {
      console.log("呼び出し開始時にエラーが発生", e)
      if (e instanceof IllegalStateError) {
        setSnackbarMessage("すでに開始されています。")
      } else {
        setSnackbarMessage(commonErrorMessage)
      }
    }

    await handleReload()

    setSending(false)
  }

  const handleCallNext = async () => {
    setSending(true)
    try {
      if (!ticketEvent) {
        throw new Error("unreachable")
      }
      await callTicket(ticketEventId, ticketEvent.nextCallNum)

      setSnackbarMessage(numberCalled(ticketEvent.nextCallNum))
    } catch (e) {
      console.log("error on call ticket", e)
      if (e instanceof IllegalStateError) {
        setSnackbarMessage("すでに呼び出されています。")
      } else {
        setSnackbarMessage(commonErrorMessage)
      }
    }

    await handleReload()

    setSending(false)
  }

  const handleMoveTicket = async (ticketId: string, status: TicketStatus) => {
    setSending(true)

    try {
      await changeStatus(ticketEventId, ticketId, status)
      // ticketIdで探して更新
      setTickets((before) => {
        // copy
        const newTickets = before.concat()
        const index = newTickets.findIndex(t => t.id === ticketId)
        newTickets[index] = { ...newTickets[index], status: status, updatedAt: new Date() }
        return newTickets
      })
    } catch (e) {
      console.log("ステータス変更でエラー", e)
      setSnackbarMessage(commonErrorMessage)
    }
    setSending(false)
  }

  if (!loaded) {
    return (<TicketEventAdminSkeleton />)
  }

  if (!currentUser) {
    return (
      <Alert severity="warning">
        {loginRequiredToShowAdmin}
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

  return (
    <Paper>
      <Box sx={{ bgcolor: callStatusBackgroundColor[ticketEvent.callStatus], color: "white" }}>
        <Typography variant="h4" component="div" align="center">
          {callStatusString[ticketEvent.callStatus]}
        </Typography>
      </Box>
      {(ticketEvent.callStatus === "CALLING" || ticketEvent.callStatus === "FINISHED") &&
        <CallControllPanel
          ticketEvent={ticketEvent}
          tickets={tickets}
          onCallNextClick={handleCallNext}
          onReloadClicked={handleReload}
          onMoveTicketClick={handleMoveTicket} />}
      <Box sx={{ p: 2, display: { xs: "block", sm: "flex" } }}>
        <Box sx={{ flexBasis: "70%", p: 1 }}>
          <TicketEventDescription ticketEvent={ticketEvent} />
          <Button
            component={RouterLink}
            to={`/${ticketEventsPath}/${ticketEventId}/${editPath}`}
            fullWidth
            color="secondary"
            sx={{ my: 1 }}
          >
            編集する
          </Button>
        </Box>
        <Box sx={{ flexBasis: "30%", p: 1 }}>
          {ticketEvent.callStatus === "NOT_STARTED" &&
            <StartCallButton enableToStart={ticketEvent.nextTicketNum > 1} onClick={handleStartCalling} />
          }
          <TicketNumbersToolTips ticketEvent={ticketEvent} />
          <Divider sx={{ my: 1 }} />
          <ShareButtons ticketEvent={ticketEvent} />
          <Divider sx={{ my: 1 }} />
          <PageUrlAndQRCode ticketEvent={ticketEvent} />
        </Box>
      </Box>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.modal + 1 }}
        open={sending}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </Paper>
  )
}

export default TicketEventAdmin

const TicketEventAdminSkeleton = () => (
  <Paper>
    <Typography variant="h4" component="div" align="center">
      <Skeleton />
    </Typography>
    <Box sx={{ p: 2, display: { xs: "block", sm: "flex" } }}>
      <Box sx={{ flexBasis: "70%", p: 1 }}>
        <TicketEventDescriptionSkeleton />
      </Box>
      <Box sx={{ flexBasis: "30%", p: 1 }}>
        <Typography variant="body1" component="div" align="center">
          <Skeleton />
        </Typography>
        <Typography variant="body1" component="div" align="center">
          <Skeleton />
        </Typography>
      </Box>
    </Box>
  </Paper>
)