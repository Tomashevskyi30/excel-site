
const codes = {
  A: 65,
  Z: 90
}

function createCell(_, col) {
  return `
   <div class="cell" contenteditable  data-col="${col}"></div>
  `
}
function createCol(col, idx) {
  return `
  <div class="column" data-type="resizable" data-col="${idx}">${col}
  <div class="col-resize" data-resize="col"></div>
  </div>
  `
}
function createRow(idx, content) {
  const resizer = idx ?
    '<div class="row-resize" data-resize="row"></div>' : ''
  return `
    <div class="row" data-type="resizable" data-row="${idx}">
    <div class="row-info">${idx ? idx : ''} 
        ${resizer}
    </div>
    <div class="row-data">${content}</div>
    </div>`
}
function toChar(_, idx) {
  return String.fromCharCode(codes.A+idx)
}

export function createTable(rowsCount = 15) {
  const colsCount = codes.Z - codes.A + 1
  const rows = []
  const cols = new Array(colsCount)
    .fill('')
    .map(toChar)
    .map(createCol)
    .join('')


  rows.push(createRow(null, cols))
  for (let i=1; i<rowsCount+1; i++) {
    const cells = new Array(colsCount).fill('')
      .map(createCell)
      .join('')
    rows.push(createRow(i, cells))
  }
  return rows.join('')
}
