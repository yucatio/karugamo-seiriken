import React from "react"
import { BrowserRouter, Route, Switch } from "react-router-dom"
import Box from "@mui/material/Box"
import CssBaseline from "@mui/material/CssBaseline"
import Toolbar from "@mui/material/Toolbar"
import { ThemeProvider } from "@mui/material/styles"

import Top from "./components/Top"
import Header from "./components/Header"
import SideMenu from "./components/SideMenu"
import CreateTicketEvent from "./components/TicketEvent/Create"
import UpdateTicketEvent from "./components/TicketEvent/Update"
import TicketEventAdmin from "./components/TicketEvent/Admin"
import TicketEventDetail from "./components/TicketEvent/Detail"
import MyTickets from "./components/Mypage/MyTickets"
import MyTicketEvents from "./components/Mypage/MyTicketEvents"
import HowToUse from "./components/Info/HowToUse"
import PrivacyPolicy from "./components/Info/PrivacyPolicy"
import TermsOfUse from "./components/Info/TermsOfUse"
import Footer from "./components/Footer"
import PageNotFound from "./components/Common/PageNotFound"
import { AuthProvider } from "./context/AuthContext"
import { SnackbarProvider } from "./context/SnackbarContext"
import { mainTheme, backgroundPalette, sizeSettings } from "./settings/DesignSettings"
import { adminPath, createPath, editPath, howToUsePath, mypagePath, privacyPolicyPath, termsOfUsePath, ticketEventsPath, ticketsPath } from "./settings/SystemSettings"

function App() {
  const [mobileOpen, setMobileOpen] = React.useState(false)
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen)
  }

  return (
    <ThemeProvider theme={mainTheme}>
      <AuthProvider>
        <SnackbarProvider>
          <BrowserRouter>
            <CssBaseline />
            <Header onDrawerToggle={handleDrawerToggle} />
            <Box sx={{ display: "flex" }}>
              <Box
                component="nav"
                sx={{ width: { sm: sizeSettings.menuDrawer.width }, flexShrink: { sm: 0 } }}
              >
                <SideMenu mobileOpen={mobileOpen} onDrawerToggle={handleDrawerToggle} />
              </Box>
              <Box component="main" sx={{ flexGrow: 1 }}>
                <Toolbar />
                <Box sx={{ minHeight: 400, bgcolor: backgroundPalette.primary.background, px: 3, pt: 3, pb: 5 }}>
                  <Switch>
                    <Route exact path="/" component={Top} />
                    <Route exact path={`/${ticketEventsPath}/${createPath}`} component={CreateTicketEvent} />
                    <Route exact path={`/${ticketEventsPath}/:ticketEventId/${editPath}`} component={UpdateTicketEvent} />
                    <Route exact path={`/${ticketEventsPath}/:ticketEventId/${adminPath}`} component={TicketEventAdmin} />
                    <Route exact path={`/${ticketEventsPath}/:ticketEventId`} component={TicketEventDetail} />
                    <Route exact path={`/${mypagePath}/${ticketEventsPath}`} component={MyTicketEvents} />
                    <Route exact path={`/${mypagePath}/${ticketsPath}`} component={MyTickets} />
                    <Route exact path={termsOfUsePath} component={TermsOfUse} />
                    <Route exact path={howToUsePath} component={HowToUse} />
                    <Route exact path={privacyPolicyPath} component={PrivacyPolicy} />
                    <Route component={PageNotFound} />
                  </Switch>
                </Box>
                <Footer />
              </Box>
            </Box>
          </BrowserRouter>
        </SnackbarProvider>
      </AuthProvider>
    </ThemeProvider>
  )
}

export default App;
