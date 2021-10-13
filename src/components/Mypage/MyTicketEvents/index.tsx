import React, { useEffect, useState } from "react"
import { Link as RouterLink } from "react-router-dom"
import Alert from "@mui/material/Alert"
import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import Card from "@mui/material/Card"
import CardActions from "@mui/material/CardActions"
import CardContent from "@mui/material/CardContent"
import Skeleton from "@mui/material/Skeleton"
import Typography from "@mui/material/Typography"

import TicketNumbersToolTips from "./TicketNumbersTooltips"
import { useAuthContext } from "../../../context/AuthContext"
import { TicketEvent } from "../../../model/TicketEventModel"
import { getOwnTicketEvents } from "../../../repository/TicketEventRepository"
import { adminPath, ticketEventsPath } from "../../../settings/SystemSettings"
import { callStatusString, ticketExpiryDays } from "../../../settings/BusinessSettings"
import { callStatusBackgroundColor } from "../../../settings/DesignSettings"
import { loginRequiredToShowMyTicketEvents, myTicketNotFound } from "../../../settings/FeedbackMessages"

const MyTicketSets = () => {
  const { currentUser, authLoaded } = useAuthContext()
  const [loaded, setLoaded] = useState(false)
  const [ticketEvents, setTicketEvents] = useState<TicketEvent[]>([])

  useEffect(() => {
    const initialize = async () => {
      if (!authLoaded) {
        return
      }
      setLoaded(false)
      if (currentUser) {
        const dbTicketSets = await getOwnTicketEvents(currentUser.uid)
        setTicketEvents(dbTicketSets)
      }
      setLoaded(true)
    }
    initialize()
  }, [authLoaded, currentUser])

  if (!loaded) {
    return (<MyTicketSetsSkelton />)
  }

  if (!currentUser) {
    return (
      <Alert severity="info">
        {loginRequiredToShowMyTicketEvents}
      </Alert>
    )
  }

  if (ticketEvents.length === 0) {
    return (
      <Alert severity="info">
        {myTicketNotFound}
      </Alert>
    )
  }

  // copy & sort by createdAt desc
  const sorted = ticketEvents.concat().sort((e1, e2) => e2.createdAt.getTime() - e1.createdAt.getTime())

  return (
    <div>
      {sorted.map((ticketEvent) => (
        <Card key={ticketEvent.id} sx={{ my: 2 }}>
          <CardContent>
            <Typography variant="h5" component="div">
              {ticketEvent.title}
            </Typography>
          </CardContent>
          <Box sx={{ display: { xs: "block", sm: "flex" }, width: "100%" }}>
            <CardContent sx={{ flexGrow: 1 }}>
              <TicketNumbersToolTips ticketEvent={ticketEvent} />
            </CardContent>
            <CardActions>
              <Button
                component={RouterLink}
                to={`/${ticketEventsPath}/${ticketEvent.id}/${adminPath}`}
                size="large"
                variant="contained"
                color="secondary"
              >
                管理画面
              </Button>
              <Button
                component={RouterLink}
                to={`/${ticketEventsPath}/${ticketEvent.id}`}
                size="large"
                variant="contained"
                color="secondary"
              >
                整理券詳細
              </Button>
            </CardActions>
          </Box>
          <CardContent sx={{ backgroundColor: callStatusBackgroundColor[ticketEvent.callStatus], color: "white" }}>
            <Typography variant="h5" component="div" align="center">
              {callStatusString[ticketEvent.callStatus]}
            </Typography>
          </CardContent>
        </Card>
      ))}
      <Typography variant="body2" component="div" align="center">
        作成した整理券は、作成日時の約{ticketExpiryDays}日後、自動的に削除されます。
      </Typography>
    </div>
  )
}

export default MyTicketSets

const MyTicketSetsSkelton = () => (
  <Card sx={{ my: 2 }}>
    <CardContent>
      <Typography variant="h5" component="div">
        <Skeleton />
      </Typography>
      <Typography variant="body1" component="div">
        <Skeleton />
      </Typography>
      <Typography variant="h5" component="div" align="center">
        <Skeleton />
      </Typography>
    </CardContent>
  </Card>
)
