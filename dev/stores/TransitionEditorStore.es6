import config from 'config';

export default class TransitionEditorStore {
  constructor(actions) {
    this.bindListeners({
      handleUpdate: actions.UPDATE,
    });
  }

  handleUpdate(state) {
    this.state = state;
  }

  output(state) {
    return state
  }
}
