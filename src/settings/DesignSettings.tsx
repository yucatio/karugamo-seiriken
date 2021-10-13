import { blueGrey, brown, orange, blue, green, indigo, red, pink, grey, yellow } from "@mui/material/colors"
import { createTheme } from "@mui/material/styles"

import { CallStatus } from "../model/TicketEventModel"
import { TicketStatus } from "../model/TicketModel"

export const mainTheme = createTheme({
  palette: {
    primary: {
      main: orange[600],
      contrastText: "white"
    },
    secondary: {
      main: indigo["A400"],
    },
  },
})


export const backgroundPalette = {
  primary: {
    background: orange[50],
    backgroundShadow: orange[100],
  },
  footer: {
    background: grey[600],
  },
  white: {
    backgroundShadow: blueGrey[100],
  },
}

export const sizeSettings = {
  menuDrawer: {
    width: 300,
  },
  qrCode: {
    size: 120,
  },
}

export const callStatusBackgroundColor: { [key in CallStatus]: string } = {
  NOT_STARTED: blue[400],
  CALLING: orange[600],
  FINISHED: grey[600],
}

export const ticketStatusBackgroundColor: { [key in TicketStatus]: string } = {
  WAITING: "white",
  CALLED: blue[50],
  STATUS_GREEN: green[50],
  STATUS_YELLOW: yellow[100],
  STATUS_RED: red[100],
}

export const getTicketStatusBackground = (calledAt?: Date): string => {
  if (!calledAt) {
    return blue[400]
  }
  const now = new Date()

  if (now.getTime() - calledAt.getTime() < 3 * 60 * 1000) {
    // 3分以内
    return red[600]
  } else if (now.getTime() - calledAt.getTime() < 10 * 60 * 1000) {
    // 10分以内
    return pink[600]
  } else if (now.getTime() - calledAt.getTime() < 30 * 60 * 1000) {
    // 30分以内
    return orange[600]
  } else if (now.getTime() - calledAt.getTime() < 60 * 60 * 1000) {
    // 60分以内
    return brown[600]
  } else {
    return grey[600]
  }
}
