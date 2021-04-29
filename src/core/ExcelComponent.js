import {DomListener} from '@core/DomListener';

export class ExcelComponent extends DomListener {
  constructor($root, options = {}) {
    super($root, options.listeners)
    this.name = options.name || ''
    this.observer = options.observer
    this.unsubscribers = []
    this.prepare()
  }
  // tune our component to init
  prepare() {

  }
  // returns component template
  toHtml() {
    return ''
  }

  // notify listeners about event
  $broadcast(event, ...args) {
    this.observer.broadcast(event, ...args)
  }
  // subscribe on event
  $on(event, fn) {
    const unsub = this.observer.subscribe(event, fn)
    this.unsubscribers.push(unsub)
  }
  // initialize component
  // add DOM listeners
  init() {
    this.initDOMListeners()
  }
  // remove component
  // remove DOM listeners
  destroy() {
    this.removeDOMListeners()
    this.unsubscribers.forEach(unsub => unsub())
  }
}
