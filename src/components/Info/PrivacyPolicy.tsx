import Paper from "@mui/material/Paper"
import Typography from "@mui/material/Typography"


const TermsOfUse = () => {
  return (
    <Paper sx={{ maxWidth: 600, m: "auto", p: 4 }}>
      <Typography variant="h4" component="div" align="center" gutterBottom>
        プライバシーポリシー
      </Typography>
      <Typography variant="h6" component="div">
        個人情報を収集・利用する目的
      </Typography>
      <Typography variant="body1" component="div">
        かるがも整理券（以下、本サービス）が個人情報を収集・利用する目的は，以下のとおりです。
      </Typography>
      <Typography variant="body1" component="div">
        <ol>
          <li>本サービスの提供・運営のため</li>
          <li>ユーザーからのお問い合わせに回答するため（本人確認を行うことを含む）</li>
          <li>ユーザーが利用中のサービスの新機能，更新情報，キャンペーン等の案内のメールを送付するため</li>
          <li>メンテナンス，重要なお知らせなど必要に応じたご連絡のため</li>
          <li>利用規約に違反したユーザーや，不正・不当な目的でサービスを利用しようとするユーザーの特定をし，ご利用をお断りするため</li>
          <li>ユーザーにご自身の登録情報の閲覧や変更，削除，ご利用状況の閲覧を行っていただくため</li>
          <li>広告を表示するため</li>
          <li>アクセスの解析を行うため</li>
          <li>上記の利用目的に付随する目的</li>
        </ol>
      </Typography>
      <Typography variant="h6" component="div">
        利用目的の変更
      </Typography>
      <Typography variant="body1" component="div">
        <ol>
          <li>当サービスは，利用目的が変更前と関連性を有すると合理的に認められる場合に限り，個人情報の利用目的を変更するものとします。</li>
          <li>利用目的の変更を行った場合には，変更後の目的について，当方所定の方法により，ユーザーに通知し，または本サービス上に公表するものとします。</li>
        </ol>
      </Typography>
      <Typography variant="h6" component="div">
        個人情報の第三者提供
      </Typography>
      <Typography variant="body1" component="div">
        <ol>
          <li>当方は，次に掲げる場合を除いて，あらかじめユーザーの同意を得ることなく，第三者に個人情報を提供することはありません。ただし，個人情報保護法その他の法令で認められる場合を除きます。
            <ol>
              <li>人の生命，身体または財産の保護のために必要がある場合であって，本人の同意を得ることが困難であるとき</li>
              <li>公衆衛生の向上または児童の健全な育成の推進のために特に必要がある場合であって，本人の同意を得ることが困難であるとき</li>
              <li>国の機関もしくは地方公共団体またはその委託を受けた者が法令の定める事務を遂行することに対して協力する必要がある場合であって，本人の同意を得ることにより当該事務の遂行に支障を及ぼすおそれがあるとき</li>
            </ol>
          </li>
          <li>前項の定めにかかわらず，次に掲げる場合には，当該情報の提供先は第三者に該当しないものとします。
            <ol>
              <li>当方が利用目的の達成に必要な範囲内において個人情報の取扱いの全部または一部を委託する場合</li>
              <li>合併その他の事由による事業の承継に伴って個人情報が提供される場合</li>
              <li>個人情報を特定の者との間で共同して利用する場合であって，その旨並びに共同して利用される個人情報の項目，共同して利用する者の範囲，利用する者の利用目的および当該個人情報の管理について責任を有する者の氏名または名称について，あらかじめ本人に通知し，または本人が容易に知り得る状態に置いた場合</li>
            </ol>
          </li>
        </ol>
      </Typography>
      <Typography variant="h6" component="div">
        プライバシーポリシーの変更
      </Typography>
      <Typography variant="body1" component="div">
        <ol>
          <li>本ポリシーの内容は，法令その他本ポリシーに別段の定めのある事項を除いて，ユーザーに通知することなく，変更することができるものとします。</li>
          <li>当方が別途定める場合を除いて，変更後のプライバシーポリシーは，本ウェブサイトに掲載したときから効力を生じるものとします。</li>
        </ol>
      </Typography>

    </Paper>
  )
}

export default TermsOfUse