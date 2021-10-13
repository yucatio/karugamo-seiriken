import Accordion from "@mui/material/Accordion"
import AccordionSummary from "@mui/material/AccordionSummary"
import AccordionDetails from "@mui/material/AccordionDetails"
import Typography from "@mui/material/Typography"
import ExpandMoreIcon from "@mui/icons-material/ExpandMore"

const HowToUse = () => {

  return (
    <div>
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>ログイン</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <ol>
            <li>
              各種操作にはグーグルアカウントでのログインが必要です。右上のログインボタンからログインしてください。<br />
              <img src={`${process.env.PUBLIC_URL}/how-to-use/login_01.png`} alt="login_01" width="350" />
            </li>
          </ol>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>整理券の取得</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <ol>
            <li>
              整理券を取得するには「整理券を取得する」ボタンをクリックしてから、「取得する」ボタンをクリックしてください。<br />
              <img src={`${process.env.PUBLIC_URL}/how-to-use/get_ticket_01.png`} alt="get_ticket_01" width="350" /><br/>
              <img src={`${process.env.PUBLIC_URL}/how-to-use/get_ticket_02.png`} alt="get_ticket_02" width="350" />
            </li>
            <li>
              取得した整理券の番号が表示されます。<br />
              <img src={`${process.env.PUBLIC_URL}/how-to-use/get_ticket_03.png`} alt="get_ticket_03" width="350" />
            </li>
          </ol>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>取得した整理券の確認</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <ol>
            <li>
              取得した整理券を確認するには、メニューの「取得済みの整理券」をクリックしてください。<br />
              <img src={`${process.env.PUBLIC_URL}/how-to-use/my_tickets_01.png`} alt="my_tickets_01" width="350" />
            </li>
            <li>
              呼び出し状況が確認できます。(呼び出し時にはメールやプッシュ通知は送られません。)<br />
              <img src={`${process.env.PUBLIC_URL}/how-to-use/my_tickets_02.png`} alt="my_tickets_02" width="350" />
            </li>
            <li>
              呼び出し済みの場合は、呼び出しが行われてからの経過時間で背景色が変わります。<br />
              ～3分<br />
              <img src={`${process.env.PUBLIC_URL}/how-to-use/called_color_01.png`} alt="called_color_01" width="218" /><br />
              ～10分<br />
              <img src={`${process.env.PUBLIC_URL}/how-to-use/called_color_02.png`} alt="called_color_02" width="218" /><br />
              ～30分<br />
              <img src={`${process.env.PUBLIC_URL}/how-to-use/called_color_03.png`} alt="called_color_03" width="218" /><br />
              ～60分<br />
              <img src={`${process.env.PUBLIC_URL}/how-to-use/called_color_04.png`} alt="called_color_04" width="218" /><br />
              60分～<br />
              <img src={`${process.env.PUBLIC_URL}/how-to-use/called_color_05.png`} alt="called_color_05" width="218" />
            </li>
          </ol>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>整理券の作成</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <ol>
            <li>
              整理券を作成するには、メニューの「新しい整理券を作成する」をクリックしてください。<br />
              <img src={`${process.env.PUBLIC_URL}/how-to-use/new_ticket_event_01.png`} alt="new_ticket_events_01" width="350" />
            </li>
            <li>
              必要事項を入力して「作成する」ボタンをクリックしてください。整理券枚数は後から変更できないので気を付けてください。<br />
              <img src={`${process.env.PUBLIC_URL}/how-to-use/new_ticket_event_02.png`} alt="new_ticket_events_02" width="350" />
            </li>
          </ol>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>作成した整理券の確認と整理券の編集</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <ol>
            <li>
              作成した整理券を確認するには、メニューの「作成した整理券」をクリックしてください。<br />
              <img src={`${process.env.PUBLIC_URL}/how-to-use/my_ticket_events_01.png`} alt="my_ticket_events_01" width="350" />
            </li>
            <li>
              「整理券詳細」ボタンをクリックします。<br />
              <img src={`${process.env.PUBLIC_URL}/how-to-use/ticket_event_detail_02.png`} alt="ticket_event_detail_02" width="350" />
            </li>
            <li>
              「編集する」ボタンをクリックします。<br />
              <img src={`${process.env.PUBLIC_URL}/how-to-use/ticket_event_detail_03.png`} alt="ticket_event_detail_03" width="350" />
            </li>
            <li>
              編集が完了したら、「更新する」ボタンをクリックします。整理券枚数は変更できません。<br />
              <img src={`${process.env.PUBLIC_URL}/how-to-use/ticket_event_edit_04.png`} alt="ticket_event_edit_04" width="350" />
            </li>
          </ol>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>呼び出しの開始と整理券の管理</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <ol>
            <li>
              メニューの「作成した整理券」をクリックしてください。<br />
              <img src={`${process.env.PUBLIC_URL}/how-to-use/my_ticket_events_01.png`} alt="my_ticket_events_01" width="350" />
            </li>
            <li>
              呼び出し開始する整理券の「管理画面」ボタンをクリックします。<br />
              <img src={`${process.env.PUBLIC_URL}/how-to-use/admin_02.png`} alt="admin_02" width="350" />
            </li>
            <li>
              「呼び出しを開始する」ボタンを押します。確認ダイアログが表示されるので「開始する」ボタンを押します。<br />
              <img src={`${process.env.PUBLIC_URL}/how-to-use/admin_03.png`} alt="admin_03" width="350" /><br />
              <img src={`${process.env.PUBLIC_URL}/how-to-use/admin_04.png`} alt="admin_04" width="350" />
            </li>
            <li>
              次の番号を呼び出すときには番号をクリック後、「呼び出す」をクリックします。（呼び出しても番号の持ち主にはメールやプッシュ通知は送られません）<br />
              <img src={`${process.env.PUBLIC_URL}/how-to-use/admin_05.png`} alt="admin_05" width="350" />
            </li>
            <li>
              呼び出した番号は「処理済み」「ステータス　黄色」「ステータス　赤」へ移動できます。番号をクリックして移動先を選択してください。<br />
              <img src={`${process.env.PUBLIC_URL}/how-to-use/admin_06.png`} alt="admin_06" width="350" />
            </li>
          </ol>
        </AccordionDetails>
      </Accordion>

    </div>
  )
}

export default HowToUse