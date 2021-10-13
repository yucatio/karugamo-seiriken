import React from "react"
import { Link as RouterLink } from "react-router-dom"
import formatDistanceToNow from "date-fns/formatDistanceToNow"
import { ja } from "date-fns/locale"
import LensIcon from "@mui/icons-material/Lens"
import Button from "@mui/material/Button"
import Card from "@mui/material/Card"
import CardActions from "@mui/material/CardActions"
import CardContent from "@mui/material/CardContent"
import Skeleton from "@mui/material/Skeleton"
import Typography from "@mui/material/Typography"

import { Ticket } from "../../../model/TicketModel"
import { backgroundPalette, getTicketStatusBackground } from "../../../settings/DesignSettings"
import { callStatusString, ticektStatusStringForUser } from "../../../settings/BusinessSettings"
import { ticketEventsPath } from "../../../settings/SystemSettings"

type Props = {
  tickets: Ticket[];
}

const TicketCards = (props: Props) => {
  const { tickets } = props

  // copy & sort by createdAt desc
  const sorted = tickets.concat().sort((t1, t2) => t2.createdAt.getTime() - t1.createdAt.getTime())

  return (
    <>
      {sorted.map((ticket, index) => (
        <Card key={index} sx={{ width: { xs: "100%", sm: 275 }, m: 2, borderRadius: 4, alignSelf: "flex-start" }}>{/* xs: mobile, sm: PC, tablet */}
          <CardContent>
            <Typography variant="body1" component="div" align="center" sx={{ color: backgroundPalette.primary.backgroundShadow }}>
              <LensIcon />
            </Typography>
          </CardContent>
          <CardContent>
            <Typography variant="h2" component="div" align="center">
              {ticket.id}
            </Typography>
          </CardContent>
          <CardContent sx={{ bgcolor: getTicketStatusBackground(ticket.calledAt), color: "white" }}>
            <Typography variant="h4" component="div" align="center">
              {ticektStatusStringForUser[ticket.status]}
            </Typography>
            {!!ticket.calledAt &&
              <Typography variant="subtitle1" component="div" align="center">
                {formatDistanceToNow(ticket.calledAt, { addSuffix: true, locale: ja })}
              </Typography>
            }
          </CardContent>
          <CardContent>
            <Typography variant="h6" component="div" align="center" gutterBottom>
              {ticket.ticketEvent ? ticket.ticketEvent.title : <Skeleton />}
            </Typography>
            {!ticket.ticketEvent &&
              <Typography variant="subtitle2" component="div" align="center"><Skeleton /></Typography>}
            {ticket.ticketEvent && ticket.ticketEvent.callStatus === "NOT_STARTED" &&
              <Typography variant="subtitle2" component="div" align="center">
                {callStatusString["NOT_STARTED"]}
              </Typography>
            }
            {ticket.ticketEvent && ticket.ticketEvent.callStatus === "CALLING" && ticket.status === "WAITING" &&
              <Typography variant="body1" component="div" align="center" color="primary">
                {ticket.ticketEvent.nextCallNum - 1}番まで呼び出し済み
              </Typography>
            }
          </CardContent>
          <CardActions sx={{ display: "flex", justifyContent: "flex-end" }}>
            <Button
              size="small"
              color="secondary"
              component={RouterLink}
              to={`/${ticketEventsPath}/${ticket.parentId}`}
            >
              イベント詳細を表示
            </Button>
          </CardActions>
        </Card>
      ))}
    </>
  )
}

export default TicketCards

export const TicketCardsSkeleton = () => (
  <Card sx={{ width: { xs: "100%", sm: 275 }, m: 2, borderRadius: 4, alignSelf: "flex-start" }}>{/* xs: mobile, sm: PC, tablet */}
    <CardContent>
      <Typography variant="body1" component="div" align="center" sx={{ color: backgroundPalette.white.backgroundShadow }}>
        <LensIcon />
      </Typography>
    </CardContent>
    <CardContent>
      <Typography variant="h2" component="div" align="center">
        <Skeleton />
      </Typography>
      <Skeleton variant="rectangular" height={40} />
      <Typography variant="h6" component="div" align="center">
        <Skeleton />
      </Typography>
      <Typography variant="subtitle2" component="div" align="center">
        <Skeleton />
      </Typography>
    </CardContent>
  </Card>
)