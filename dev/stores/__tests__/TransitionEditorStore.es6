jest.dontMock('../TransitionEditorStore.es6');
import Alt from 'alt';
const TransitionEditorStore = require('../TransitionEditorStore.es6').default;
let alt, store, actions,callback, updateAction;

describe('TransitionEditorStore', function() {
  beforeEach(function() {
    alt = new Alt();
    alt.dispatcher.register = jest.genMockFunction();
    actions = alt.generateActions('update');
    store = alt.createStore(TransitionEditorStore, 'TransitionEditorStore', actions);
    callback = alt.dispatcher.register.mock.calls[0][0];
  });

  it('registers a callback with the dispatcher', function() {
    expect(alt.dispatcher.register.mock.calls.length).toBe(1);
  });

  it('listens for update action and sets the state', function() {
    callback({ action:actions.UPDATE, data:{ test:true } });
    expect(store.getState().state.test).toBe(true);
  });
});
