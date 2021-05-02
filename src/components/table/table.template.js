import {toInlineStyles} from '@core/utils';
import {defaultStyles} from '@/constants';
import {parse} from '@core/parse';

const codes = {
  A: 65,
  Z: 90
}

const DEFAULT_WIDTH = 120
const DEFAULT_HEIGHT = 24

function getWidth(state, idx) {
  return (state[idx] || DEFAULT_WIDTH) + 'px'
}
function getHeight(state, idx) {
  return (state[idx] || DEFAULT_HEIGHT) + 'px'
}

function createCell(state, row) {
  return function(_, col) {
    const id = `${row}:${col}`
    const width = getWidth(state.colState, col)
    const data = state.dataState[id]
    const styles = toInlineStyles({
      ...defaultStyles,
      ...state.stylesState[id]
    })
    return `
   <div 
   class="cell" 
   contenteditable  
   data-col="${col}" 
   data-type="cell"
   data-id="${id}"
   data-value="${data || ''}"
   style="${styles}; width:${width}"
   >
   ${parse(data) || ''}
   </div>
  `
  }
}

function createCol({col, idx, width}) {
  return `
  <div 
  class="column" 
  data-type="resizable" 
  data-col="${idx}" 
  style="width: ${width}" 
  >
  ${col}
  <div class="col-resize" data-resize="col"></div>
  </div>
  `
}

function createRow(idx, content, state) {
  const resizer = idx ?
    '<div class="row-resize" data-resize="row"></div>' : ''
  const height = getHeight(state, idx)
  return `
    <div class="row"
     data-type="resizable"
      data-row="${idx}"
      style="height:${height}"
      >
    <div class="row-info">${idx ? idx : ''} 
        ${resizer}
    </div>
    <div class="row-data">${content}</div>
    </div>`
}

function toChar(_, idx) {
  return String.fromCharCode(codes.A+idx)
}

function withWidthFrom(state) {
  return function(col, idx) {
    return {
      col, idx, width: getWidth(state.colState, idx)
    }
  }
}

export function createTable(rowsCount = 15, state = {}) {
  const colsCount = codes.Z - codes.A + 1
  const rows = []
  const cols = new Array(colsCount)
    .fill('')
    .map(toChar)
    .map(withWidthFrom(state))
    .map(createCol)
    .join('')


  rows.push(createRow(null, cols, {}))
  for (let row=0; row<rowsCount; row++) {
    const cells = new Array(colsCount).fill('')
      .map(createCell(state, row))
      .join('')
    rows.push(createRow(row+1, cells, state.rowState))
  }
  return rows.join('')
}
