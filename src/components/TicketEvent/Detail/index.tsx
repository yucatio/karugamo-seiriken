import React, { useEffect, useState } from "react"
import { Link as RouterLink, useParams } from "react-router-dom"
import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import Divider from "@mui/material/Divider"
import Paper from "@mui/material/Paper"

import Backdrop from "@mui/material/Backdrop"
import CallStatus from "./CallStatus"
import CircularProgress from "@mui/material/CircularProgress"
import CurrentUserTicket from "./CurrentUserTicket"
import GetTicketButton, { GetTicketButtonSkelton } from "./GetTicketButton"
import TicketEventDescription, { TicketEventDescriptionSkeleton } from "./TicketEventDescription"
import ShareButtons from "./ShareButtons"
import PageUrlAndQRCode from "./PageUrlAndQRCode"
import { useAuthContext } from "../../../context/AuthContext"
import { useSnackbarContext } from "../../../context/SnackbarContext"
import { TicketEvent } from "../../../model/TicketEventModel"
import { Ticket } from "../../../model/TicketModel"
import { getCurrentUserTicket, getTicket, getTicketEvent, issueTicket } from "../../../repository/TicketEventRepository"
import { commonErrorMessage, eventTicketNotFound, ticketIssued, ticketIssueFailed } from "../../../settings/FeedbackMessages"
import { IllegalStateError } from "../../../error/IllegalStateError"
import { adminPath, editPath, ticketEventsPath } from "../../../settings/SystemSettings"

const TicketEventDetail = () => {
  const { ticketEventId } = useParams<{ ticketEventId: string }>();

  const { currentUser } = useAuthContext()
  const { setSnackbarMessage } = useSnackbarContext()

  const [loaded, setLoaded] = useState(false)
  const [ticketLoaded, setTicketLoaded] = useState(false)
  const [ticketEvent, setTicketEvent] = useState<TicketEvent>()
  const [currentUserTicket, setCurrentUserTicket] = useState<Ticket>()
  const [backDropOpen, setBackDropOpen] = React.useState(false);

  useEffect(() => {
    const initializeTicketSet = async () => {
      setLoaded(false)
      const dbTicketEvent = await getTicketEvent(ticketEventId)
      setTicketEvent(dbTicketEvent)
      setLoaded(true)
    }
    initializeTicketSet()
  }, [ticketEventId])

  useEffect(() => {
    const initializeCurrentUserTicket = async () => {
      setTicketLoaded(false)
      if (currentUser) {
        const dbTicket = await getCurrentUserTicket(ticketEventId, currentUser.uid)
        setCurrentUserTicket(dbTicket)
      } else {
        setCurrentUserTicket(undefined)
      }
      setTicketLoaded(true)
    }
    initializeCurrentUserTicket()
  }, [ticketEventId, currentUser])

  const handleIssueTicket = async () => {
    if (!currentUser || !ticketEvent) {
      throw new Error("unreachable")
    }

    setBackDropOpen(true)

    try {
      const ticketRef = await issueTicket(ticketEventId, currentUser.uid)
      const newTicket = await getTicket(ticketEventId, ticketRef.id)
      setCurrentUserTicket(newTicket)
      setSnackbarMessage(ticketIssued)
    } catch (e) {
      console.log("error on issue ticket", e)
      if (e instanceof IllegalStateError) {
        // reload
        const dbTicketEvent = await getTicketEvent(ticketEventId)
        setTicketEvent(dbTicketEvent)
        const dbTicket = await getCurrentUserTicket(ticketEventId, currentUser.uid)
        setCurrentUserTicket(dbTicket)

        setSnackbarMessage(ticketIssueFailed)
      } else {
        setSnackbarMessage(commonErrorMessage)
      }
    }

    setBackDropOpen(false)
  }

  if (!loaded) {
    return (
      <Paper sx={{ p: 2, display: { xs: "block", sm: "flex" } }}>
        <Box sx={{ flexBasis: "70%", p: 1 }}>
          <TicketEventDescriptionSkeleton />
        </Box>
        <Box sx={{ flexBasis: "30%", p: 1 }}>
          <GetTicketButtonSkelton />
        </Box>
      </Paper>
    )
  }

  if (!ticketEvent) {
    return (
      <Paper sx={{ p: 2, display: { xs: "block", sm: "flex", minHeight: 150 } }}>
        {eventTicketNotFound}
      </Paper>
    )
  }

  const ownEvent = (ticketEvent.owner === currentUser?.uid)

  return (
    <Paper sx={{ p: 2, display: { xs: "block", sm: "flex" } }}>
      <Box sx={{ flexBasis: "70%", p: 1 }}>
        <TicketEventDescription ticketEvent={ticketEvent} />
        {ownEvent &&
          <>
            <Button
              component={RouterLink}
              to={`/${ticketEventsPath}/${ticketEventId}/${editPath}`}
              fullWidth
              color="secondary"
              sx={{ my: 1 }}
            >
              編集する
            </Button>
            <Button
              component={RouterLink}
              to={`/${ticketEventsPath}/${ticketEventId}/${adminPath}`}
              fullWidth
              color="secondary"
              sx={{ my: 1 }}
            >
              管理画面
            </Button>
          </>
        }

      </Box>
      <Box sx={{ flexBasis: "30%", p: 1 }}>
        {currentUserTicket ?
          <CurrentUserTicket ticket={currentUserTicket} />
          :
          <GetTicketButton
            currentUser={currentUser}
            ticketEvent={ticketEvent}
            loaded={ticketLoaded}
            onClick={handleIssueTicket}
          />
        }
        <CallStatus ticketEvent={ticketEvent} />
        <Divider sx={{ my: 1 }} />
        <ShareButtons ticketEvent={ticketEvent} />
        <Divider sx={{ my: 1 }} />
        <PageUrlAndQRCode ticketEvent={ticketEvent} />
      </Box>
      <Backdrop
        sx={{ color: "white", zIndex: (theme) => theme.zIndex.modal + 1 }}
        open={backDropOpen}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </Paper>
  )
}

export default TicketEventDetail