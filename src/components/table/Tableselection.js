export class Tableselection {
  static className ='selected'
  constructor() {
    this.group = []
    this.current = null
  }
  select($el) {
    this.clear()
    this.group.push($el)
    this.current = $el
    $el.focus().addClass(Tableselection.className)
    console.log($el)
  }
  clear() {
  this.group.forEach($cell => $cell.removeClass(Tableselection.className))
  this.group = []
  }

  get selectedIds() {
    return this.group.map($el=>$el.id())
  }
  selectGroup($group=[]) {
    this.clear()

    this.group = $group
    this.group.forEach($el=>$el.addClass(Tableselection.className))
  }
  applyStyle(style) {
    this.group.forEach($el=>$el.css(style))
  }
}
