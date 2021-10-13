import React, { useState } from "react"
import Button from "@mui/material/Button"
import Avatar from "@mui/material/Avatar"
import IconButton from "@mui/material/IconButton"
import Menu from "@mui/material/Menu"
import MenuItem from "@mui/material/MenuItem"
import Skeleton from "@mui/material/Skeleton"
import Tooltip from "@mui/material/Tooltip"
import PersonIcon from "@mui/icons-material/Person"

import { useAuthContext } from "../../context/AuthContext"
import { loginWithGoogle, logout } from "../../repository/UserRepository"

const LoginButton = () => {
  const { currentUser, authLoaded } = useAuthContext()

  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null)

  const handleLogin = async () => {
    try {
      await loginWithGoogle()
    } catch (e) {
      console.log("login failed: ", e);
    }
  }

  const handleLogout = async () => {
    try {
      await logout()
      setAnchorEl(null);
    } catch (e) {
      console.log("logout failed: ", e);
    }
  }

  const handleIconClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  }

  const open = Boolean(anchorEl)

  if (!authLoaded) {
    return (
      <Skeleton variant="circular">
        <Avatar />
      </Skeleton>
    )
  }

  if (!currentUser) {
    return (<Button color="inherit" onClick={handleLogin}>ログイン</Button>)
  }

  return (
    <>
      <Tooltip title={<div>{currentUser.displayName}<br />{currentUser.email}</div>}>
        <IconButton onClick={handleIconClick} size="small" sx={{ ml: 2 }}>
          {currentUser.photoURL ?
            <Avatar alt={currentUser.displayName || currentUser.email || ""} src={currentUser.photoURL} />
            :
            <Avatar>
              <PersonIcon />
            </Avatar>
          }
        </IconButton>
      </Tooltip>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={handleLogout}>ログアウト</MenuItem>
      </Menu>
    </>
  )
}

export default LoginButton