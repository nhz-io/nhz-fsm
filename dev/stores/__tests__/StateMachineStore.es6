jest.dontMock('../StateMachineStore.es6');
import Alt from 'alt';
const StateMachineStore = require('../StateMachineStore.es6').default;
let alt, store, actions,callback, updateAction;

describe('StateMachineStore', function() {
  beforeEach(function() {
    alt = new Alt();
    alt.dispatcher.register = jest.genMockFunction();
    actions = alt.generateActions('update', 'set', 'clear', 'add', 'remove');
    store = alt.createStore(StateMachineStore, 'StateMachineStore', actions);
    callback = alt.dispatcher.register.mock.calls[0][0];
  });

  it('registers a callback with the dispatcher', function() {
    expect(alt.dispatcher.register.mock.calls.length).toBe(1);
  });
});
