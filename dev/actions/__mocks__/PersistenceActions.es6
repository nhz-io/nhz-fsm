module.exports = class PersistenceActions {
  constructor() {
    this.generateActions('update', 'set', 'add', 'remove', 'clear', 'filter')
  }
}
