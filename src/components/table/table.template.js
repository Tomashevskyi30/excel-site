
const codes = {
  A: 65,
  Z: 90
}

function createCell() {
  return `
   <div class="cell" contenteditable></div>
  `
}
function createCol(el) {
  return `
  <div class="column">${el}</div>
  `
}
function createRow(idx, content) {
  return `
    <div class="row">
    <div class="row-info">${idx ? idx : ''}</div>
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
