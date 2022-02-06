import { Link as RouterLink } from "react-router-dom"
import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import Card from "@mui/material/Card"
import CardActions from "@mui/material/CardActions"
import CardContent from "@mui/material/CardContent"
import Typography from "@mui/material/Typography"
import CurrencyYenIcon from "@mui/icons-material/CurrencyYen"
import InfoIcon from "@mui/icons-material/Info"
import LensIcon from "@mui/icons-material/Lens"
import PersonIcon from "@mui/icons-material/Person"
import SmartphoneIcon from "@mui/icons-material/Smartphone"

import { backgroundPalette } from "../../settings/DesignSettings"
import { createPath, howToUsePath, ticketEventsPath } from "../../settings/SystemSettings"
import Divider from "@mui/material/Divider"

const TopPage = () => {
  return (
    <>
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
      <Box
        sx={{
          my: 4,
          display: { xs: "block", sm: "flex" },
          justifyContent: "center",
          alignItems: "center",
        }}
      >{/* xs: mobile, sm: PC, tablet */}
        <Card sx={{ width: { xs: "100%", sm: 275 }, m: 2, borderRadius: 4, alignSelf: "stretch " }}>{/* xs: mobile, sm: PC, tablet */}
          <CardContent>
            <Typography variant="body1" component="div" align="center" sx={{ color: backgroundPalette.primary.backgroundShadow }}>
              <LensIcon />
            </Typography>
          </CardContent>
          <CardContent>
            <Typography variant="h2" component="div" align="center">
              <CurrencyYenIcon sx={{ fontSize: 64 }} />
            </Typography>
          </CardContent>
          <CardContent>
            <Typography variant="body1" component="div" align="center">
              混雑回避のために整理券を使いたい。でもお金はかけたくない。
            </Typography>
          </CardContent>
          <CardContent>
            <Typography variant="body1" color="secondary" component="div" align="center" gutterBottom>
              <InfoIcon fontSize="large" />
            </Typography>
            <Typography variant="body1" component="div" align="center">
              かるがも整理券は無料です。
            </Typography>
          </CardContent>
        </Card>
        <Card sx={{ width: { xs: "100%", sm: 275 }, m: 2, borderRadius: 4, alignSelf: "stretch " }}>{/* xs: mobile, sm: PC, tablet */}
          <CardContent>
            <Typography variant="body1" component="div" align="center" sx={{ color: backgroundPalette.primary.backgroundShadow }}>
              <LensIcon />
            </Typography>
          </CardContent>
          <CardContent>
            <Typography variant="h2" component="div" align="center">
              <PersonIcon sx={{ fontSize: 64 }} />
            </Typography>
          </CardContent>
          <CardContent>
            <Typography variant="body1" component="div" align="center">
              整理券を配るときに混雑しては本末転倒。発行もWebでしたい。
            </Typography>
          </CardContent>
          <CardContent>
            <Typography variant="body1" color="secondary" component="div" align="center" gutterBottom>
              <InfoIcon fontSize="large" />
            </Typography>
            <Typography variant="body1" component="div" align="center">
              かるがも整理券はWeb完結型の整理券です。
            </Typography>
          </CardContent>
        </Card>
        <Card sx={{ width: { xs: "100%", sm: 275 }, m: 2, borderRadius: 4, alignSelf: "stretch " }}>{/* xs: mobile, sm: PC, tablet */}
          <CardContent>
            <Typography variant="body1" component="div" align="center" sx={{ color: backgroundPalette.primary.backgroundShadow }}>
              <LensIcon />
            </Typography>
          </CardContent>
          <CardContent>
            <Typography variant="h2" component="div" align="center">
              <SmartphoneIcon sx={{ fontSize: 64 }} />
            </Typography>
          </CardContent>
          <CardContent>
            <Typography variant="body1" component="div" align="center">
              スマホで見やすい画面がいい。
            </Typography>
          </CardContent>
          <CardContent>
            <Typography variant="body1" color="secondary" component="div" align="center" gutterBottom>
              <InfoIcon fontSize="large" />
            </Typography>
            <Typography variant="body1" component="div" align="center">
              かるがも整理券はPCスマホとも対応しています。
            </Typography>
          </CardContent>
        </Card>
      </Box>
      <Box sx={{ my: 4 }}>
        <Typography variant="h5" component="div" align="center" gutterBottom>
          スマホ対応で見やすい整理券取得画面
        </Typography>
        <Box
          sx={{
            display: { xs: "block", sm: "flex" },
            justifyContent: "center",
            alignItems: "center"
          }}
        >{/* xs: mobile, sm: PC, tablet */}
          <Box sx={{ border: 1, borderColor: "grey.500" }}>
            <img src={`${process.env.PUBLIC_URL}/top/get_ticket_01.png`} alt="get_ticket_01" width="350" />
          </Box>
        </Box>
      </Box>
      <Box sx={{ my: 2 }}>
        <Typography variant="h5" component="div" align="center" gutterBottom>
          使いやすい呼び出し画面
        </Typography>
        <Box
          sx={{
            display: { xs: "block", sm: "flex" },
            justifyContent: "center",
            alignItems: "center"
          }}
        >{/* xs: mobile, sm: PC, tablet */}
          <Box sx={{ border: 1, borderColor: "grey.500" }}>
            <img src={`${process.env.PUBLIC_URL}/top/admin_01.png`} alt="admin_01" width="350" />
          </Box>
        </Box>
      </Box>
      <Box sx={{ my: 4 }}>
        <Typography variant="h5" component="div" align="center" gutterBottom>
          かるがも整理券を使ってみる
        </Typography>
        <Box sx={{ width: { xs: "100%", sm: 275 }, mx: "auto" }}>
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
    </>
  )
}

export default TopPage