import { Editor, EditorState } from "draft-js"

import "draft-js/dist/Draft.css"
import { allStyleMap } from "./StyleMap"

type Props = {
  editorState: EditorState;
  onChange: React.Dispatch<React.SetStateAction<EditorState>>;
}

const ReadOnlyEditor = (props: Props) => {
  const { editorState, onChange } = props

  return (
    <Editor
      editorState={editorState}
      onChange={onChange}
      customStyleMap={allStyleMap}
      readOnly />
  )
}

export default ReadOnlyEditor