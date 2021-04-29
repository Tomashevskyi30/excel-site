export class Observer {
  constructor() {
    this.subscribers = {}
  }

  broadcast(event, ...args) {
    if (!Array.isArray(this.subscribers[event])) {
      return false
    }
    this.subscribers[event].forEach(subscriber=>{
      subscriber(...args)
    })
    return true
  }
  subscribe(event, fn) {
    this.subscribers[event] = this.subscribers[event] || []
    this.subscribers[event].push(fn)
    return ()=>{
      this.subscribers[event] =
        this.subscribers[event].filter(subscriber => subscriber!==fn)
    }
  }
}
