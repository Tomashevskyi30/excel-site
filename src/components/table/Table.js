import {ExcelComponent} from '@core/ExcelComponent';
import {createTable} from '@/components/table/table.template';
import {resizeHandler} from '@/components/table/table.resize';
import {isCell, matrix, shouldResize, nextSelector} from './table.functions';
import {Tableselection} from '@/components/table/Tableselection';
import {$} from '@core/dom';

export class Table extends ExcelComponent {
  static className = 'excel__table'


  constructor($root, options) {
    super($root, {
      name: 'Table',
      listeners: ['mousedown', 'keydown', 'input'],
      ...options
    });
  }

  toHtml() {
    return createTable(20)
  }
  prepare() {
    this.selection = new Tableselection()
  }

  init() {
    super.init()

    const $cell = this.$root.findSel('[data-id="0:0"]')
    this.selectCell($cell)
    this.$on('formula:input', text=>{
      this.selection.current.text(text)
    })
    this.$on('formula:done', ()=>{
      this.selection.current.focus()
    })
  }
  selectCell($cell) {
    this.selection.select($cell)
    this.$broadcast('table:select', $cell)
  }

  onMousedown(event) {
    if (shouldResize(event)) {
      resizeHandler(this.$root, event)
    } else if (isCell(event)) {
      const $target = $(event.target)
      if (event.shiftKey) {
        const $cells = matrix($target, this.selection.current)
          .map(id => this.$root.findSel(`[data-id="${id}"]`))
        this.selection.selectGroup($cells)
      } else {
      this.selection.select($target)
      }
    }
  }
  onKeydown(event) {
    const keys = [
      'Enter',
      'Tab',
      'ArrowUp',
      'ArrowDown',
      'ArrowRight',
      'ArrowLeft'
    ]
    const {key} = event
    if (keys.includes(key) && !event.shiftKey) {
      event.preventDefault()
      const id = this.selection.current.id(true)
      const $next =this.$root.findSel(nextSelector(key, id))
      this.selectCell($next)
    }
  }
  onInput(event) {
    this.$broadcast('table:input', $(event.target))
  }
}
