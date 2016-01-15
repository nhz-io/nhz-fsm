export default class Generator {
  constructor(json) {
    this.table = {};
    this.import(json);
  }

  setTransition(fromState, event, toState, value) {
    const {table} = this;

    fromState = table[fromState] ? table[fromState] : table[fromState] = {};
    event = fromState[event] ? fromState[event] : fromState[event] = {};
    event[toState] = value;
    if(!table[toState]) { table[toState] = {} };

    return this;
  }

  add(fromState, event, toState) {
    return this.setTransition(fromState, event, toState, true);
  }

  remove(fromState, event, toState) {
    return this.setTransition(fromState, event, toState, false);
  }

  import(json) {
    if(json && json.length) {
      let state, event;
      let start = json.findIndex(i => !isNaN(i));
      let end = json.slice(start).findIndex(i => isNaN(i)) + start;
      let i = start;

      console.lo

      while(i < end) {
        if(json[i] != null) {
          if(state != null) {
            if(event) {
              this.add(json[state], json[event], json[json[i]]);
              event = null;
            }
            else if(json[i] < start) {
              state = json[i];
            }
            else if(json[i] >= end) {
              event = json[i];
            }
            else {
              throw new Error(`Invalid event: ${json[i]} at index: ${i}`)
            }
          }
          else if(json[i] < start) {

            state = json[i];
          }
          else {
            throw new Error(`Invalid state: ${json[i]} at index: ${i}`)
          }
          i++;
        }
        else {
          throw new Error(`Invalid value: ${json[i]} at index: ${i}`)
        }
      }
    }
    return this;
  }

  export() {
    const {table} = this;
    let
      states = Object.keys(table),
      stateRemap = {},
      eventRemap = {},
      events = {},
      transitions = [],
      json = [];

    const
      stateId = (state) => () => stateRemap[state],
      eventId = (event) => () => eventRemap[event];

    states.forEach((state, i) => {
      stateRemap[state] = i;
      state = table[state];
      let keys = Object.keys(state);
      if(keys.length) {
        let transition = [i];
        keys.forEach((key) => {
          let states = state[key];
          let keys = Object.keys(states);
          if(keys.length) {
            let event = key;
            keys.forEach((key) => {
              if(states[key]) {
                events[event] = true;
                transition.push(eventId(event), stateId(key));
              }
            });
          };
        });
        transitions.push(...transition);
      };
    });

    events = Object.keys(events);
    let offset = events.length + transitions.length;
    events.forEach((event, i) => eventRemap[event] = i + offset);
    json.push(...states);
    json.push(...transitions);
    json.push(...events);
    return json.map(i => typeof i === 'function' ? i() : i);
  }

  toJSON() { return this.export() }
}
