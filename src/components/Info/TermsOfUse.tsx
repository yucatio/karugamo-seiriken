import { Link as RouterLink } from "react-router-dom"
import Paper from "@mui/material/Paper"
import Typography from "@mui/material/Typography"
import { privacyPolicyPath } from "../../settings/SystemSettings"


const TermsOfUse = () => {
  return (
    <Paper sx={{ maxWidth: 600, m: "auto", p: 4 }}>
      <Typography variant="h4" component="div" align="center" gutterBottom>
        利用規約
      </Typography>
      <Typography variant="body1" component="div" gutterBottom>
        <ol>
          <li>かるがも整理券（以下、本サービス）はデモ用に作成されたものです。実際に使用しないでください。</li>
          <li>本サービスを使用したことによるいかなる損害も当方は責任を負いません。</li>
          <li>作成した整理券は、作成後約30日後に削除されます。</li>
          <li>暴力や性的な表現、その他の公序良俗に反する表現を禁止します。万一登録された場合は作成からの経過時間にかかわらず削除いたします。</li>
          <li>登録された情報の利用範囲につきましては、<RouterLink to={privacyPolicyPath}>プライバシーポリシー</RouterLink>をご確認ください。</li>
        </ol>
      </Typography>

    </Paper>
  )
}

export default TermsOfUse