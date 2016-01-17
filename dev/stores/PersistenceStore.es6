import store from 'store';
import config from 'config';
import throttle from 'nhz-throttle';
import uuid from 'uuid';
import filter from 'filter-object';
import merge from 'merge';

const save = throttle((key, value) => { store.set(key, value) }, 500);

export default class PersistenceStore {
  constructor(actions) {
    this.glob = null;
    this._state = this.state = store.get(config.stateMachinesStoreKey);
    this.bindListeners({
      handleAdd: actions.ADD,
      handleRemove: actions.REMOVE,
      handleUpdate: actions.UPDATE,
      handleSet: actions.SET,
      handleFilter: actions.FILTER,
      handleClear: actions.CLEAR,
    });
  }

  handleUpdate(state) {
    this._state = merge.recursive(true, this._state, filter(state, (v) => v.id && true));
    save(config.stateMachineStoreKey, this._state);
    this.state = this.glob ? filter(this._state, this.glob) : this._state;
  }

  handleSet(state) {
    this._state = filter(state, (v) => v.id && true));
    save(config.stateMachineStoreKey, this._state);
    this.state = this.glob ? filter(this._state, this.glob) : this._state;
  }

  handleAdd({name, description, fsm}) {
    this._state[uuid.v4()] = {name, description, fsm};
    save(config.stateMachineStoreKey, this._state);
    this.state = this.glob ? filter(this._state, this.glob) : this._state;
  }

  handleRemove({id, uuid}) {
    if(this._state[id || uuid]) {
      delete(this._state[id || uuid]);
      save(config.stateMachineStoreKey, this._state);
    }
    this.state = this.glob ? filter(this._state, this.glob) : this._state;
  }

  handleFilter(glob) {
    this.glob = glob;
    this.state = this.glob ? filter(this._state, this.glob) : this._state;
  }

  handleClear() {
    this._state = this.state = {};
    save(config.stateMachineStoreKey, this._state);
  }
}
