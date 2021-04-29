import {ExcelComponent} from '@core/ExcelComponent';
import {$} from '@core/dom';

export class Formula extends ExcelComponent {
  static className = 'excel__formula'
  constructor($root, options) {
    super($root, {
      name: 'Formula',
      listeners: ['input', 'keydown'],
      ...options
    })
  }
  toHtml() {
    return `
     <div class="info">fx</div>
       <div id="formula" 
       class="input" 
       contenteditable="true" 
       spellcheck="false"></div>`
  }
  init() {
    super.init()

    this.$formula = this.$root.findSel('#formula')
    this.$on('table:select', $cell =>{
      this.$formula.text($cell.text())
    })

    this.$on('table:input', $cell=>{
      this.$formula.text($cell.text())
    })
  }
  onInput(event) {
    this.$broadcast('formula:input', $(event.target).text())
  }
  onKeydown(event) {
    const keys = ['Enter', 'Tab']
    if (keys.includes(event.key)) {
      event.preventDefault()
      this.$broadcast('formula:done')
    }
  }
}

