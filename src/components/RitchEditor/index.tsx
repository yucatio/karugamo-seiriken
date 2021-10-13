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

  const toggleColor = (e: React.MouseEvent<HTMLSpanElement> | undefined, toggledStyle: string, groupStyles: string[]) => {
    if (e) {
      e.preventDefault()
    }
    const selection = editorState.getSelection();

    // Let's just allow one color/fontSize at a time. Turn off all active colors/fontSize.
    const nextContentState = groupStyles
      .reduce((contentState, name) => {
        return Modifier.removeInlineStyle(contentState, selection, name)
      }, editorState.getCurrentContent())

    let nextEditorState: EditorState = EditorState.push(
      editorState,
      nextContentState,
      "change-inline-style"
    )

    const currentStyle = editorState.getCurrentInlineStyle()
    const nextStyle = nextEditorState.getCurrentInlineStyle()

    // Unset style override for current color/fontSize.
    if (selection.isCollapsed()) {
      nextEditorState = currentStyle.reduce((state, style) => {
        if (!state) {
          // unreachable
          return nextEditorState
        }
        if (!style) {
          return state
        }
        if (groupStyles.includes(style)) {
          return RichUtils.toggleInlineStyle(state, style)
        }
        if (!nextStyle.has(style)) {
          return RichUtils.toggleInlineStyle(state, style)
        }
        return state
      }, nextEditorState)

      nextEditorState = nextStyle.reduce((state, style) => {
        if (!state) {
          // unreachable
          return nextEditorState
        }
        if (!style) {
          return state
        }
        if (!currentStyle.has(style)) {
          return RichUtils.toggleInlineStyle(state, style)
        }
        return state
      }, nextEditorState)
    }

    // If the color/fontSize is being toggled on, apply it.
    if (!currentStyle.has(toggledStyle)) {
      nextEditorState = RichUtils.toggleInlineStyle(
        nextEditorState,
        toggledStyle
      );
    }

    onChange(nextEditorState)
  }

  const detailLength = editorState.getCurrentContent().getPlainText('').length

  return (
    <>
      <Paper variant="outlined">
        <FormatMenu editorState={editorState} onClickInlineStyle={handleClickInlineStyle} onChangeGroupStyle={toggleColor} />
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