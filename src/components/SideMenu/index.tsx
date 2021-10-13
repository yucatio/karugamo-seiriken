import React from "react"
import Drawer from "@mui/material/Drawer"

import DrawerContents from "./DrawerContents"
import { sizeSettings } from "../../settings/DesignSettings"


type Props = {
  mobileOpen: boolean;
  onDrawerToggle: VoidFunction;
}

const SideMenu = (props: Props) => {
  const { mobileOpen, onDrawerToggle } = props
  return (
    <>
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={onDrawerToggle}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
        sx={{
          display: { xs: "block", sm: "none" },
          "& .MuiDrawer-paper": { boxSizing: "border-box", width: sizeSettings.menuDrawer.width },
        }}
      >
        <DrawerContents onClick={onDrawerToggle} />
      </Drawer>
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: "none", sm: "block" },
          "& .MuiDrawer-paper": { boxSizing: "border-box", width: sizeSettings.menuDrawer.width },
        }}
        open
      >
        <DrawerContents />
      </Drawer>
    </>
  )
}

export default SideMenu