export default class StateMachineActions {
  update(machine) { return machine }

  set(machine) { return machine }

  clear() { return {} }

  add({fromState, event, toState}) {
    return { fromState, event, toState }
  }

  remove({fromState, event, toState}) {
    return { fromState, event, toState }
  }
}
