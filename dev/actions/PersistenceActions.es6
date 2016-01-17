export default class PersistenceActions {
  update(state) { return state }

  set(state) { return state }

  add({name, description, fsm}) { return { name, description, fsm} }

  remove({id}) { return {id} }

  clear() { return {} }

  filter(glob) { return glob }
}
