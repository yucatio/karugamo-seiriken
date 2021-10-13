import React, { useState } from "react"
import { EditorState } from "draft-js"
import FormatBoldIcon from "@mui/icons-material/FormatBold"
import FormatItalicIcon from "@mui/icons-material/FormatItalic"
import FormatUnderlinedIcon from "@mui/icons-material/FormatUnderlined"
import FormatColorTextIcon from '@mui/icons-material/FormatColorText'
import FormatSizeIcon from "@mui/icons-material/FormatSize"
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown"
import Box from "@mui/material/Box"
import ToggleButton from "@mui/material/ToggleButton"
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup"
import Tooltip from "@mui/material/Tooltip"
import Popover from "@mui/material/Popover"
import Stack from "@mui/material/Stack"
import LensIcon from "@mui/icons-material/Lens"

import { colorStyles, colorTable, fontSizes, fontSizeStyles } from "./StyleMap"

type Props = {
  editorState: EditorState;
  onClickInlineStyle: (e: React.MouseEvent<HTMLSpanElement> | undefined, style: string) => void;
  onChangeGroupStyle: (e: React.MouseEvent<HTMLSpanElement> | undefined, toggleStyle: string, groupStyles: string[]) => void;
}

const FormatMenu = (props: Props) => {
  const { editorState, onClickInlineStyle, onChangeGroupStyle } = props

  const [colorAnchorEl, setColorAnchorEl] = useState<HTMLElement | null>(null)
  const [fontSizeAnchorEl, setFontSizeAnchorEl] = useState<HTMLElement | null>(null)

  const handleColorClick = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault()
    setColorAnchorEl(event.currentTarget)
  }

  const handleColorClose = () => {
    setColorAnchorEl(null)
  }

  const handleClickColor = (event: React.MouseEvent<HTMLSpanElement>, color: string) => {
    event.preventDefault()
    setColorAnchorEl(null)
    onChangeGroupStyle(event, color, colorStyles)
  }


  const handleFontSizeClick = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault()
    setFontSizeAnchorEl(event.currentTarget)
  }

  const handleFontSizeClose = () => {
    setFontSizeAnchorEl(null)
  }

  const handleClickFontSize = (event: React.MouseEvent<HTMLSpanElement>, fontSize: string) => {
    event.preventDefault()
    setFontSizeAnchorEl(null)
    onChangeGroupStyle(event, fontSize, fontSizeStyles)
  }

  const currentStyle = editorState.getCurrentInlineStyle()
  const colorOpen = Boolean(colorAnchorEl)
  const fontSizeOpen = Boolean(fontSizeAnchorEl)

  return (
    <Box
      sx={{
        mx: 1,
        mt: 1,
      }}
    >
      <ToggleButtonGroup
        aria-label="text formatting"
      >
        <ToggleButton
          value="bold"
          selected={currentStyle.has("BOLD")}
          aria-label="bold"
          onMouseDown={(e: React.MouseEvent<HTMLSpanElement> | undefined) => onClickInlineStyle(e, "BOLD")}
        >
          <Tooltip title="太字">
            <FormatBoldIcon />
          </Tooltip>
        </ToggleButton>
        <ToggleButton
          value="italic"
          selected={currentStyle.has("ITALIC")}
          aria-label="italic"
          onMouseDown={(e: React.MouseEvent<HTMLSpanElement> | undefined) => onClickInlineStyle(e, "ITALIC")}
        >
          <Tooltip title="斜体">
            <FormatItalicIcon />
          </Tooltip>
        </ToggleButton>
        <ToggleButton
          selected={currentStyle.has("UNDERLINE")}
          value="underlined"
          aria-label="underlined"
          onMouseDown={(e: React.MouseEvent<HTMLSpanElement> | undefined) => onClickInlineStyle(e, "UNDERLINE")}
        >
          <Tooltip title="下線">
            <FormatUnderlinedIcon />
          </Tooltip>
        </ToggleButton>
        <ToggleButton
          value="color"
          aria-label="color"
          onMouseDown={handleColorClick}
        >
          <Tooltip title="色">
            <FormatColorTextIcon />
          </Tooltip>
          <ArrowDropDownIcon />
        </ToggleButton>
        <ToggleButton
          value="fontSize"
          aria-label="font-size"
          onMouseDown={handleFontSizeClick}
        >
          <Tooltip title="文字サイズ">
            <FormatSizeIcon />
          </Tooltip>
          <ArrowDropDownIcon />
        </ToggleButton>
      </ToggleButtonGroup>
      <Popover
        open={colorOpen}
        anchorEl={colorAnchorEl}
        onClose={handleColorClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        disableAutoFocus={true}
        disableEnforceFocus={true}
      >
        <Stack spacing={1} sx={{ p: 2 }}>
          {colorTable.map((colorRow, index) => (
            <Stack
              key={index}
              direction="row"
              spacing={1}
            >
              {colorRow.map(colorObj => (
                <Box
                  key={colorObj.name}
                  onMouseDown={(e) => handleClickColor(e, colorObj.name)}
                  sx={{
                    color: colorObj.color, cursor: "pointer",
                  }}
                >
                  <LensIcon sx={{
                    stroke: currentStyle.has(colorObj.name) ?
                      (theme) => theme.palette.action.selected : "white",
                    strokeWidth: 4
                  }} />
                </Box>
              ))}
            </Stack>
          ))}
        </Stack>
      </Popover>
      <Popover
        anchorEl={fontSizeAnchorEl}
        open={fontSizeOpen}
        onClose={handleFontSizeClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        disableAutoFocus={true}
        disableEnforceFocus={true}
      >
        <Stack spacing={1}>
          {
            fontSizes.map(fontSizeObj => (
              <Box
                key={fontSizeObj.name}
                onMouseDown={(e) => handleClickFontSize(e, fontSizeObj.name)}
                sx={{
                  bgcolor: currentStyle.has(fontSizeObj.name) ? "action.selected" : "backgrond.paper",
                  fontSize: fontSizeObj.size,
                  cursor: "pointer"
                }}
              >
                {fontSizeObj.label}
              </Box>
            ))
          }
        </Stack>
      </Popover>
    </Box>
  )
}

export default FormatMenu
