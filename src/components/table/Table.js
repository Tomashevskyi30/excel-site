import {ExcelComponent} from '@core/ExcelComponent';
import {createTable} from '@/components/table/table.template';
import {resizeHandler} from '@/components/table/table.resize';
import {isCell, matrix, shouldResize, nextSelector} from './table.functions';
import {Tableselection} from '@/components/table/Tableselection';
import {$} from '@core/dom';
import * as actions from '@/redux/actions'
import {defaultStyles} from '@/constants';
import {parse} from '@/core/parse'

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
    return createTable(20, this.store.getState())
  }
  prepare() {
    this.selection = new Tableselection()
  }

  init() {
    super.init()

    const $cell = this.$root.findSel('[data-id="0:0"]')
    this.selectCell($cell)
    this.$on('formula:input', value=>{
      this.selection.current
        .attr('data-value', value)
        .text(parse(value))
      this.updateTextInStore(value)
    })
    this.$on('formula:done', ()=>{
      this.selection.current.focus()
    })
    this.$on('toolbar:applyStyle', value =>{
      this.selection.applyStyle(value)
      this.$dispatch(actions.applyStyle({
        value,
        ids: this.selection.selectedIds
      }))
    })
  }
  selectCell($cell) {
    this.selection.select($cell)
    this.$broadcast('table:select', $cell)
    const styles = $cell.getStyles(Object.keys(defaultStyles))
    console.log(styles)
    this.$dispatch(actions.changeStyles(styles))
  }

  async resizeTable(event) {
    try {
      const data = await resizeHandler(this.$root, event)
      this.$dispatch(actions.tableResize(data))
      console.log(data)
    } catch (e) {
      console.warn('resize error', e.message )
    }
  }

  onMousedown(event) {
    if (shouldResize(event)) {
      this.resizeTable(event)
    } else if (isCell(event)) {
      const $target = $(event.target)
      if (event.shiftKey) {
        const $cells = matrix($target, this.selection.current)
          .map(id => this.$root.findSel(`[data-id="${id}"]`))
        this.selection.selectGroup($cells)
      } else {
      this.selectCell($target)
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

  updateTextInStore(value) {
    this.$dispatch(actions.changeText({
      id: this.selection.current.id(),
      value
    }))
  }
  onInput(event) {
    this.updateTextInStore($(event.target).text())
  }
}
