module.exports = class StateMachineActions {
  constructor() {
    this.generateActions('update', 'set', 'clear', 'add', 'remove')
  }
}
