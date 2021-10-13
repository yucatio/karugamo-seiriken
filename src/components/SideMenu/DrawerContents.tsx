import React from "react"
import { Link as RouterLink } from "react-router-dom"
import LibraryAddIcon from "@mui/icons-material/LibraryAdd"
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks"
import Filter1Icon from "@mui/icons-material/Filter1"
import HomeIcon from '@mui/icons-material/Home'
import InfoIcon from "@mui/icons-material/Info"
import Divider from "@mui/material/Divider"
import List from "@mui/material/List"
import ListItem from "@mui/material/ListItem"
import ListItemButton from "@mui/material/ListItemButton"
import ListItemIcon from "@mui/material/ListItemIcon"
import ListItemText from "@mui/material/ListItemText"
import Toolbar from "@mui/material/Toolbar"
import { createPath, howToUsePath, mypagePath, ticketEventsPath, ticketsPath } from "../../settings/SystemSettings"


type Props = {
  onClick?: VoidFunction;
}

const DrawerContents = (props: Props) => {
  const { onClick } = props

  return (
    <div>
      <Toolbar />
      <Divider />
      <List>
        <ListItem disablePadding>
          <ListItemButton component={RouterLink} to={`/${mypagePath}/${ticketsPath}`} onClick={onClick}>
            <ListItemIcon>
              <Filter1Icon />
            </ListItemIcon>
            <ListItemText primary="取得済みの整理券" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton component={RouterLink} to={`/${mypagePath}/${ticketEventsPath}`} onClick={onClick}>
            <ListItemIcon>
              <LibraryBooksIcon />
            </ListItemIcon>
            <ListItemText primary="作成した整理券" />
          </ListItemButton>
        </ListItem>
      </List>
      <Divider />
      <List>
        <ListItem disablePadding>
          <ListItemButton component={RouterLink} to={`/${ticketEventsPath}/${createPath}`} onClick={onClick}>
            <ListItemIcon>
              <LibraryAddIcon />
            </ListItemIcon>
            <ListItemText primary="新しい整理券を作成する" />
          </ListItemButton>
        </ListItem>
      </List>
      <Divider />
      <List>
        <ListItem disablePadding>
          <ListItemButton component={RouterLink} to={howToUsePath} onClick={onClick}>
            <ListItemIcon>
              <InfoIcon />
            </ListItemIcon>
            <ListItemText primary="使いかた" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton component={RouterLink} to="/" onClick={onClick}>
            <ListItemIcon>
              <HomeIcon />
            </ListItemIcon>
            <ListItemText primary="トップ" />
          </ListItemButton>
        </ListItem>
      </List>
    </div>
  )
}

export default DrawerContents