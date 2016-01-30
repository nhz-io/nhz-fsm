jest.dontMock('../TransitionEditorActions.es6');
import Alt from 'alt';
const Actions = require('../TransitionEditorActions.es6').default;
var alt, actions, dispatch, register, dispatcher;

describe('TransitionEditorActions', function() {
  beforeEach(function(){
    alt = new Alt();
    alt.dispatcher.dispatch = jest.genMockFunction();
    actions = alt.createActions(Actions);
  });

  it('should dispatch update with state', function() {

  });
})
