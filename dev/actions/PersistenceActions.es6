export default class PersistenceActions {
  update(machines) { return machines }

  set(machines) { return machines }

  add({name, description, fsm}) { return { name, description, fsm } }

  remove({id, uuid}) { return { id, uuid } }

  clear() { return {} }

  filter({match}) { return { match } }
}
