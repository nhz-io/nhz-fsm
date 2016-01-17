const isFunction = (func) => typeof func === 'function';
const capitalize = (s) => s[0].toUpperCase() + s.substr(1);
const assert = (condition, message) => {
  if(!condition) { throw new Error(message) }
  return condition;
};
const
  STATE = Symbol(),
  TABLE = Symbol(),
  STATES = Symbol(),
  EVENTS = Symbol();

const triggerEvent = function(eventName) {
  let event;
  this[EVENTS].find((e, i) => e === eventName && ((event = i) || true));
  assert(event != null, `Missing event: ${eventName}`);
  let state = [this[STATE]];
  let stateName = this[STATES][state];
  state = this[TABLE][state];
  event = assert(state[event], `Event: ${eventName} is invalid in state: ${stateName}`);

  event.find((s, i) => {
    if(s && this[STATE] !== i) {
      const nextStateName = this[STATES][i];

      const guard = this[`${stateName}-${eventName}-${nextStateName}`];
      if(guard && (!isFunction(guard) || guard())) { return false };

      const leave = this[`leave${capitalize(stateName)}`];
      if(leave && isFunction(leave) ) { leave.call(this) }

      this[STATE] = i;

      const enter = this[`enter${capitalize(nextStateName)}`]
      if(enter && isFunction(enter)) { enter.call(this) }

      return true;
    }
  });

  return this;
}

export default class StateMachine {
  constructor(json) {
    assert(json, `Missing configuration table`)
    const
      start = json.findIndex(i => !isNaN(i)),
      table = json.slice(start);

    let end = table.findIndex(i => isNaN(i));

    const
      states = json.slice(0, start),
      events = table.splice(end),
      nstates = states.length,
      nevents = events.length;

    end += start;

    this[STATE] = 0;
    this[STATES] = states;
    this[EVENTS] = events;
    this[TABLE] = Array(nstates);

    {
      let state, event;
      table.forEach((v, i) => {
        switch(true) {
          case v < start:
            if(event != null) {
              event[v] = true;
              event = null;
            }
            else {
              state = this[TABLE][v] || (this[TABLE][v] = Array(nevents));
            }
            break;
          case v >= end:
            v -= end;
            event = state[v] || (state[v] = Array(nstates));
            break;
          default:
            assert(false, `Invalid value ${v} in table at index ${i+start}`);
        }
      })
    }

    Object.defineProperties(this, {
      table     : { enumerable:true, get: () => this[TABLE].map(s => s.slice()) },
      state     : { enumerable:true, get: () => this[STATES][this[STATE]] },
    });

    events.forEach(e => Object.defineProperty(this, e, { value:triggerEvent.bind(this, e) }));
  }
}

export { StateMachine as FSM }
