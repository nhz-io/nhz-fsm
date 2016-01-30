jest.dontMock('../TransitionEditorStore.es6');
jest.dontMock('alt-transition-editor-actions');

import Alt from 'alt';
import AltTestingUtils from 'alt/utils/AltTestingUtils';

const TransitionEditorActions = require('alt-transition-editor-actions').default;
const TransitionEditorStore = require('../TransitionEditorStore').default;

let alt, actions, callback, wrappedStore, unwrappedStore;

beforeEach(function(){
  alt = new Alt();
  alt.dispatcher = { register: jest.genMockFunction() };
  actions = alt.createActions(TransitionEditorActions);
  wrappedStore = alt.CreateStore(TransitionEditorStore, 'TransitionEditorStore', actions);
  unwrappedStore = wrappedStore.TransitionEditorStore;
  callback = alt.dispatcher.register.mock.calls[0][0];
});

describe('TransitionEditorStore', function() {
  it('listens for update action', function() {
    alt.dispatcher.dispatch(actions.UPDATE, {test:true});
    expect(wrappedPetStore.getState().test).toBe(true);
  });
});
