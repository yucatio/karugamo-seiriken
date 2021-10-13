import React, { useEffect, useState } from "react"
import { Link as RouterLink } from "react-router-dom"
import Box from "@mui/material/Box"
import Alert from "@mui/material/Alert"
import Typography from "@mui/material/Typography"

import TicketCards, { TicketCardsSkeleton } from "./TicketCards"
import { useAuthContext } from "../../../context/AuthContext"
import { Ticket } from "../../../model/TicketModel"
import { getOwnTickets, getTicketEvent } from "../../../repository/TicketEventRepository"
import { loginRequiredToShowMyTickets, myEventTicketNotFound } from "../../../settings/FeedbackMessages"
import { ticektStatusStringForUser, ticketExpiryDays } from "../../../settings/BusinessSettings"
import { howToUsePath } from "../../../settings/SystemSettings"

const MyTickets = () => {
  const { currentUser, authLoaded } = useAuthContext()

  const [loaded, setLoaded] = useState(false)
  const [tickets, setTickets] = useState<Ticket[]>()

  useEffect(() => {
    const initialize = async () => {
      if (!authLoaded) {
        return
      }
      setLoaded(false)
      if (currentUser) {
        const dbTickets = await getOwnTickets(currentUser.uid)
        setTickets(dbTickets)
        // get the ticketEvent
        Promise.all(dbTickets.map(async (ticket, index) => {
          if (!ticket.parentId) {
            // unreachable
            return ticket
          }
          const ticketEvent = await getTicketEvent(ticket.parentId)
          if (!ticketEvent) {
            return ticket
          }

          ticket.ticketEvent = ticketEvent

          setTickets((ticketsBefore) => {
            if (!ticketsBefore) {
              return ticketsBefore
            }
            // copy
            const newTickets = ticketsBefore.concat()
            newTickets[index] = ticket
            return newTickets
          })
          return ticket
        }))
      }
      setLoaded(true)
    }
    initialize()
  }, [authLoaded, currentUser])

  if (!loaded) {
    return (
      <Box
        sx={{
          display: { xs: "block", sm: "flex" },
          flexWrap: "wrap",
          justifyContent: "center",
        }}
      >{/* xs: mobile, sm: PC, tablet */}
        <TicketCardsSkeleton />
      </Box>
    )
  }

  if (!currentUser) {
    return (
      <Alert severity="info">
        {loginRequiredToShowMyTickets}
      </Alert>
    )
  }

  if (!tickets || tickets.length === 0) {
    return (
      <Alert severity="info">
        {myEventTicketNotFound}
      </Alert>
    )
  }

  const hasCalled = tickets && tickets.some(ticket => ticket.status !== "WAITING")

  return (
    <div>
      <Box
        sx={{
          display: { xs: "block", sm: "flex" },
          flexWrap: "wrap",
          justifyContent: "center",
        }}
      >{/* xs: mobile, sm: PC, tablet */}
        <TicketCards tickets={tickets} />
      </Box>
      {hasCalled &&
        <Typography variant="body2" component="div" align="center">
          呼び出しが行われてからの経過時間で、"{ticektStatusStringForUser.CALLED}"の背景色が変わります。
          詳しくは<RouterLink to={howToUsePath}>使いかた</RouterLink>をご覧ください。
        </Typography>
      }
      <Typography variant="body2" component="div" align="center">
        取得した整理券は、整理券の作成日時の約{ticketExpiryDays}日後、自動的に削除されます。
      </Typography>
    </div>
  )
}

export default MyTickets