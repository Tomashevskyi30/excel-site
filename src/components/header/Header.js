import {ExcelComponent} from '@core/ExcelComponent';
import {$} from '@core/dom';
import {changeTableName} from '@/redux/actions';
import {defaultTableName} from '@/constants';

export class Header extends ExcelComponent {
  static className = 'excel__header'
  constructor($root, options) {
    super($root, {
      name: 'Header',
      listeners: ['input'],
      ...options
    });
  }

  toHtml() {
    const title = this.store.getState().currentTableName || defaultTableName
    return `
    <input type="text" value="${title}" class="input"/>
            <div>
                <div class="button">
                    <i class="material-icons">
                        <span class="material-icons-outlined">delete</span>
                    </i>
                </div>

                <div class="button">
                    <i class="material-icons">
                        <span class="material-icons-outlined">exit_to_app</span>
                    </i>
                </div>
        `
  }
  onInput(event) {
    const $target = $(event.target)
    this.$dispatch(changeTableName($target.text()))
  }
}
