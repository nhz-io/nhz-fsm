export default class StateMachineActions {
  update(machine) { return machine }

  set(machine) { return machine }

  clear() { return {} }

  addState({name}) { return {name} }

  removeState({name}) { return {name} }

  addEvent({name}) { return {name} }

  removeEvent({name}) { return {name} }

  addTransition({from, event, to}) { return { from, event, to } }

  removeTransition({from, event, to}) { return { from, event, to } }
}
