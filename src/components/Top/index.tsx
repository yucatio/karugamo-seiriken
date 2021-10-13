import { Link as RouterLink } from "react-router-dom"
import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import Card from "@mui/material/Card"
import CardActions from "@mui/material/CardActions"
import CardContent from "@mui/material/CardContent"
import Typography from "@mui/material/Typography"
import LensIcon from "@mui/icons-material/Lens"

import { backgroundPalette } from "../../settings/DesignSettings"
import { createPath, howToUsePath, ticketEventsPath } from "../../settings/SystemSettings"
import Divider from "@mui/material/Divider"

const TopPage = () => {
  return (
    <Box
      sx={{
        display: { xs: "block", sm: "flex" },
        justifyContent: "center",
        alignItems: "center"
      }}
    >{/* xs: mobile, sm: PC, tablet */}
      <Card sx={{ width: { xs: "100%", sm: 275 }, borderRadius: 4 }}>{/* xs: mobile, sm: PC, tablet */}
        <CardContent>
          <Typography variant="body1" component="div" align="center" sx={{ color: backgroundPalette.primary.backgroundShadow }}>
            <LensIcon />
          </Typography>
        </CardContent>
        <CardContent>
          <Typography variant="h5" component="div" align="center" gutterBottom>
            整理券の発行を
          </Typography>
          <Typography variant="h5" component="div" align="center" gutterBottom>
            誰でも
          </Typography>
          <Typography variant="h5" component="div" align="center" gutterBottom>
            Web上で
          </Typography>
        </CardContent>
        <CardContent sx={{ bgcolor: "primary.main", color: "white" }}>
          <Typography variant="h4" component="div" align="center">
            かるがも整理券
          </Typography>
        </CardContent>
        <CardActions sx={{ display: "flex", justifyContent: "flex-end" }}>
          <Button
            size="small"
            color="secondary"
            component={RouterLink}
            to={howToUsePath}
          >
            使い方
          </Button>
        </CardActions>
      </Card>
      <Divider orientation="vertical" flexItem sx={{ mx: 2, display: { xs: "none", sm: "block" } }} />
      <Divider orientation="horizontal" flexItem sx={{ my: 2, display: { xs: "block", sm: "none" } }} />
      <Box sx={{ width: { xs: "100%", sm: 275 } }}>
        <Button
          component={RouterLink}
          to={`/${ticketEventsPath}/${createPath}`}
          fullWidth
          variant="contained"
          size="large"
        >
          整理券の作成
        </Button>
        <Typography variant="caption" component="div" gutterBottom>
          グーグルアカウントでのログインが必要です
        </Typography>
      </Box>
    </Box>
  )
}

export default TopPage