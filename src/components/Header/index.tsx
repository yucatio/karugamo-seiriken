import React from "react"
import { Link as RouterLink } from "react-router-dom"
import AppBar from "@mui/material/AppBar"
import Box from "@mui/material/Box"
import IconButton from "@mui/material/IconButton"
import MenuIcon from "@mui/icons-material/Menu"
import Toolbar from "@mui/material/Toolbar"

import LoginButton from "./LoginButton"

type Props = {
  onDrawerToggle: VoidFunction;
}

const Header = (props: Props) => {
  const { onDrawerToggle } = props

  return (
    <AppBar
      position="fixed"
      sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
    >
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={onDrawerToggle}
          sx={{ mr: 2, display: { sm: "none" } }}
        >
          <MenuIcon />
        </IconButton>
        <Box component="div" sx={{ flexGrow: 1, display: "flex", alignItems: "center" }}>
          <RouterLink to="/" style={{display: "inline-flex"}}><img src={`${process.env.PUBLIC_URL}/logo.png`} alt="Logo" height="48" /></RouterLink>
        </Box>
        <LoginButton />
      </Toolbar>
    </AppBar>
  )
}

export default Header