import store from 'store';
import config from 'config';
import throttle from 'nhz-throttle';
import uuid from 'uuid';
import filter from 'filter-object';
import merge from 'merge';
import validator from 'validator';
import Generator from 'fsm-state-machine-generator';

export default class StateMachineStore {
  constructor(actions) {
    this.machine = { fsm:[] };
    this.generator = new Generator;
    this.bindListeners({
      handleUpdate: actions.UPDATE,
      handleSet: actions.SET,
      handleClear: actions.CLEAR,
      handleAdd: actions.ADD,
      handleRemove: actions.REMOVE,
    });
  }

  parse() {
    const { machine } = this;
    const { fsm } = machine;
    machine.states = fsm.slice(0, fsm.findIndex((v) => !isNaN(v)));
    machine.events = fsm.slice(machine.states.length);
    machine.events = machine.events.slice(machine.events.findIndex((v) => isNaN(v)));
    const transitions = [];
    let transition = {};
    fsm.forEach((v, i) => {
      if(!isNaN(v)) {
        if(transition.fromState) {
            if(transition.event) {
              transition.toState = fsm[v];
              transitions.push(transition);
              transition = {};
            }
            else {
              if(v < i) {
                transition.fromState = fsm[v];
              }
              else {
                transition.event = fsm[v];
              }
            }
        }
        else {
          transition.fromState = fsm[v];
        }
      }
    });
    machine.transitions = transitions;
  }

  handleUpdate(machine) {
    this.machine = merge.recursive(true, this.machine, machine)
    this.generator = new Generator(this.machine.fsm);
    this.machine.fsm = this.generator.export();
    this.parse();
  }

  handleSet(machine) {
    this.machine = merge.recursive(true, { fsm:[] }, machine)
    this.generator = new Generator(this.machine.fsm);
    this.machine.fsm = this.generator.export();
    this.parse();
  }

  handleClear(machine) {
    this.machine.fsm = [];
    this.generator = new Generator;
    this.parse();
  }

  handleAdd({fromState, event, toState}) {
    this.generator.add({fromState, event, toState})
    this.machine.fsm = this.generator.export();
    this.parse();
  }

  handleRemove({fromState, event, toState}) {
    this.generator.remove({fromState, event, toState})
    this.machine.fsm = this.generator.export();
    this.parse();
  }

  output(state) { return state.machine }

  static getMachine() { return this.getState().machine }
}
