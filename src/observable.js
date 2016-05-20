import subscribable from './subscribable'
import { registerDep } from './tracker'

export default function observable(seed, name) {
  const sub = subscribable(name)
  return {
    _sub: sub,
    pick: () => seed,

    get value() {
      registerDep(sub)
      return seed
    },

    set value(v) {
      if(seed !== v) {
        seed = v
        sub.notify()
      }
    },

    update(proc) {
      seed = proc(seed) || seed
      sub.notify()
    }
  }
}
