import { Link as RouterLink } from "react-router-dom"
import Link from "@mui/material/Link"
import List from "@mui/material/List"
import ListItem from "@mui/material/ListItem"
import ListItemButton from "@mui/material/ListItemButton"
import ListItemText from "@mui/material/ListItemText"
import Stack from "@mui/material/Stack"

import { backgroundPalette } from "../../settings/DesignSettings"
import { privacyPolicyPath, termsOfUsePath } from "../../settings/SystemSettings"

const Footer = () => (
  <Stack
    direction={{ xs: "column", sm: "row" }}
    spacing={{ xs: 1, sm: 2 }}
    sx={{ backgroundColor: backgroundPalette.footer.background, color: "white", px: 3 }}
  >
    <List>
      <ListItem disablePadding>
        <ListItemButton component={RouterLink} to={termsOfUsePath}>
          <ListItemText primary="利用規約" />
        </ListItemButton>
      </ListItem>
      <ListItem disablePadding>
        <ListItemButton component={RouterLink} to={privacyPolicyPath}>
          <ListItemText primary="プライバシーポリシー" />
        </ListItemButton>
      </ListItem>
    </List>
    <List>
      <ListItem disablePadding>
        <ListItemButton component={Link} href="https://github.com/yucatio/karugamo-seiriken">
          <ListItemText primary="GitHub" />
        </ListItemButton>
      </ListItem>
    </List>  </Stack>
)

export default Footer