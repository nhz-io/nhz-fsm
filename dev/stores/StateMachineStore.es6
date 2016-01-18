import store from 'store';
import config from 'config';
import throttle from 'nhz-throttle';
import uuid from 'uuid';
import filter from 'filter-object';
import merge from 'merge';
import validator from 'validator';
import Generator from 'src/Generator.es6';

export default class StateMachineStore {
  constructor(actions) {
    this.machine = { fsm:[] };
    this.generator = new Generator;
    this.bindListeners({
      handleUpdate: actions.UPDATE,
      handleSet: actions.SET,
      handleClear: actions.CLEAR,
      handleAdd: actions.ADD,
      handleRemove: actions.REMOVE
    });
  }

  handleUpdate(machine) {
    this.machine = merge.recursive(true, this.machine, machine)
  }

  handleSet(machine) {
    this.machine = merge.recursive(true, { fsm:[] }, machine)
  }

  handleClear(machine) {
    this.machine.fsm = [];
    this.generator = new Generator;
  }

  handleAdd({fromState, event, toState}) {
    this.generator.add({fromState, event, toState})
  }

  handleRemove({fromState, event, toState}) {
    this.generator.remove(fromState, event, toState})
  }

  output(state) { return state.machine }

  getStates() {
    const fsm = this.generator.export();
    return fsm.slice(0, fsm.findIndex((i) => !isNaN(i)));
  }

  getEvents() {
    const fsm = this.generator.export();
    return fsm
            .slice(fsm.findIndex((i) => !isNaN(i)))
            .slice(fsm.findIndex((i) => isNaN(i)));
  }

  getMachine() { return merge(true, this.machine) }

}
