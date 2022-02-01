import React, { useRef } from "react"
import { Editor, EditorState, Modifier, RichUtils } from "draft-js"
import Box from "@mui/material/Box"
import Paper from "@mui/material/Paper"
import Typography from "@mui/material/Typography"

import FormatMenu from "./FormatMenu"
import { allStyleMap } from "./StyleMap"

import "draft-js/dist/Draft.css"

type Props = {
  editorState: EditorState;
  onChange: React.Dispatch<React.SetStateAction<EditorState>>;
}

const RichEditor = (props: Props) => {
  const { editorState, onChange } = props

  const editor = useRef<Editor>(null);

  const focusEditor = React.useCallback(() => {
    if (editor.current) {
      editor.current.focus();
    }
  }, [editor]);

  const handleClickInlineStyle = (e: React.MouseEvent<HTMLSpanElement> | undefined, inlineStyle: string) => {
    if (e) {
      e.preventDefault()
    }
    onChange(
      RichUtils.toggleInlineStyle(editorState, inlineStyle)
    )
  }

  const toggleGroupItem = (e: React.MouseEvent<HTMLSpanElement> | undefined, toggledStyle: string, groupStyles: string[]) => {
    if (e) {
      e.preventDefault()
    }

    const otherStyles = groupStyles.filter(style => style !== toggledStyle)

    const selection = editorState.getSelection()

    // toggle selected item
    let nextEditorState = RichUtils.toggleInlineStyle(editorState, toggledStyle)

    if (selection.isCollapsed()) {
      // remove other items style
      const nextStyle = otherStyles.reduce((styles, style) =>
        styles.has(style) ? styles.remove(style) : styles
        , nextEditorState.getCurrentInlineStyle())

      onChange(EditorState.setInlineStyleOverride(
        nextEditorState, nextStyle
      ))

      return
    }

    // if selection is there

    // Let's just allow one color/fontSize at a time. Turn off other active colors/fontSize.
    const nextContentState = otherStyles
      .reduce((contentState, style) =>
        Modifier.removeInlineStyle(contentState, selection, style)
      , nextEditorState.getCurrentContent())

    onChange(EditorState.push(
      nextEditorState,
      nextContentState,
      "change-inline-style"
    ))
  }

  const detailLength = editorState.getCurrentContent().getPlainText('').length

  return (
    <>
      <Paper variant="outlined">
        <FormatMenu editorState={editorState} onClickInlineStyle={handleClickInlineStyle} onChangeGroupStyle={toggleGroupItem} />
        <Box onClick={focusEditor} sx={{ p: 2 }}>
          <Editor
            editorState={editorState}
            onChange={onChange}
            ref={editor}
            customStyleMap={allStyleMap} />
        </Box>
      </Paper>
      <Typography variant="caption" component="div" gutterBottom align="right">
        {detailLength}文字
      </Typography>
    </>
  )
}

export default RichEditor