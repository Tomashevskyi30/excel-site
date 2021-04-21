import {ExcelComponent} from '@core/ExcelComponent';

export class Header extends ExcelComponent {
  static className = 'excel__header'

  toHtml() {
    return `
    <input type="text" value="New Table" class="input"/>
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
}
