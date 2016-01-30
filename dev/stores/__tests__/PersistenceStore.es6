jest.dontMock('../PersistenceStore.es6');
import Alt from 'alt';
const PersistenceStore = require('../PersistenceStore.es6').default;
let alt, store, actions,callback, updateAction;

describe('PersistenceStore', function() {
  beforeEach(function() {
    alt = new Alt();
    alt.dispatcher.register = jest.genMockFunction();
    actions = alt.generateActions('add', 'remove', 'update', 'filter', 'set', 'clear');
    store = alt.createStore(PersistenceStore, 'PersistenceStore', actions);
    callback = alt.dispatcher.register.mock.calls[0][0];
  });

  it('registers a callback with the dispatcher', function() {
    expect(alt.dispatcher.register.mock.calls.length).toBe(1);
  });
});
