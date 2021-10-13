import { amber, blue, blueGrey, brown, cyan, deepOrange, deepPurple, green,  grey, indigo, lightBlue, lightGreen, lime, orange, pink, purple, red, teal, yellow } from '@mui/material/colors'
import { sliceByNumber } from '../../util/ArrayUtil'

export const colors: {name: string, color: string}[] = [
  {name: "black", color: "black"},
  {name: "red", color: red[500]},
  {name: "pink", color: pink[500]},
  {name: "purple", color: purple[500]},
  {name: "deepPurple", color: deepPurple[500]},
  {name: "indigo", color: indigo[500]},
  {name: "blue", color: blue[500]},
  {name: "lightBlue", color: lightBlue[500]},
  {name: "cyan", color: cyan[500]},
  {name: "teal", color: teal[500]},
  {name: "green", color: green[500]},
  {name: "lightGreen", color: lightGreen[500]},
  {name: "lime", color: lime[500]},
  {name: "yellow", color: yellow[500]},
  {name: "amber", color: amber[500]},
  {name: "orange", color: orange[500]},
  {name: "deepOrange", color: deepOrange[500]},
  {name: "brown", color: brown[500]},
  {name: "grey", color: grey[500]},
  {name: "blueGrey", color: blueGrey[500]},
]

export const colorStyles: string[] = colors.map(colorObj => colorObj.name)

export const colorTable = sliceByNumber(colors, 4)

export const colorStyleMap = colors.reduce((accum: {[ key: string ]: { color: string}}, colorObj) => {
  accum[colorObj.name] = { color: colorObj.color }
  return accum
}, {})

export const fontSizes : {label: string, name:string, size: string}[] = [
  {label: "大1", name: "xxLarge", size: "xx-large"},
  {label: "大2", name: "xLarge", size: "x-large"},
  {label: "通常", name: "medium", size: "medium"},
]

export const fontSizeStyles: string[] = fontSizes.map(fontSizeObj => fontSizeObj.name)

export const fontSizeStyleMap = fontSizes.reduce((accum: {[ key: string ]: { fontSize: string}}, fontSizeObj) => {
  accum[fontSizeObj.name] = { fontSize: fontSizeObj.size }
  return accum
}, {})


export const allStyleMap = {...colorStyleMap, ...fontSizeStyleMap}