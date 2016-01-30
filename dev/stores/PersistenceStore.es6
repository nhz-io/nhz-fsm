import store from 'store';
import config from 'config';
import throttle from 'nhz-throttle';
import uuid from 'uuid';
import filter from 'filter-object';
import merge from 'merge';
import validator from 'validator';

const save = throttle((key, value) => { store.set(key, value) }, 1000);

export default class PersistenceStore {
  constructor(actions) {
    this.match = null;
    this.machines = store.get(config.stateMachinesStoreKey) || {};    

    this.bindListeners({
      handleAdd: actions.ADD,
      handleRemove: actions.REMOVE,
      handleUpdate: actions.UPDATE,
      handleSet: actions.SET,
      handleFilter: actions.FILTER,
      handleClear: actions.CLEAR,
    });

    this.on('afterEach', ({state}) => {
      save(config.stateMachinesStoreKey, state.machines)
    });
  }

  handleUpdate(machines) {
    for(let k in machines) {
      let machine = machines[k];
      if(validator.isUUID(k) && machine.name) {
        this.machines[k] = merge(true, machine, { timestamp: Date.now() })
      }
    }
  }

  handleSet(machines) { this.machines = merge(true, machines) }

  handleAdd({name, description, fsm}) {
    if(name) {
      this.machines[uuid.v4()] = { name, description, fsm, timestamp:Date.now() };
    }
  }

  handleRemove({id, uuid}) {
    if(validator.isUUID(id || uuid)) { delete(this.machines[id || uuid]) }
  }

  handleFilter({match}) { this.match = match }

  handleClear() { this.machines = {} }

  output(state) {
    if(state.match) {
      return filter(state.machines, (m) => m.name.match(state.match));
    }
    return merge(true, state.machines);
  }
}
