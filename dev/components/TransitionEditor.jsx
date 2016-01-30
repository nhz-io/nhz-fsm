import React from 'react';
import Base from './Base.jsx';
import Paper from 'material-ui/lib/paper';
import InitialStateList from 'dev/components/transition-editor/InitialStateList.jsx';
import EventList from 'dev/components/transition-editor/EventList.jsx';
import FinalStateList from 'dev/components/transition-editor/FinalStateList.jsx';
import Toolbar from 'material-ui/lib/toolbar/toolbar';
import ToolbarGroup from 'material-ui/lib/toolbar/toolbar-group';
import ToolbarSeparator from 'material-ui/lib/toolbar/toolbar-separator';
import ToolbarTitle from 'material-ui/lib/toolbar/toolbar-title';

export default class TransitionEditor extends Base {
  static propTypes = {
      store: PropTypes.object,
      actions: PropTypes.object,
  };

  constructor(props) {
    super(props);
    this.state = props.store ? props.store.getState() : {};
    this.bindHandlers(/^_handle[A-Z]/, TransitionEditor.prototype);
  }

  componentDidMount() {
    const { store } = this.props;
    store && store.listen(this._handleStoreChange);
  }

  componentWillUnmount() {
    const { store } = this.props;
    store && store.unlisten(this._handleStoreChange);
  }

  _handleStoreChange(state) { this.setState(state) }

  render() {
    const { props, state } = this;
    return(
      <Paper {...props}>
        <Paper>
          <Toolbar>
            <ToolbarGroup float="right">
              <ToolbarTitle text="Initial State" />
            </ToolbarGroup>
          </Toolbar>
          <InitialStateList
            selected={state.selectedInitialState}
            states={state.initialStates}
            requestChange={this._handleInitialStateListChange}
          />
        </Paper>
        <Paper>
          <EventList
            selected={state.selectedEvent}
            events={state.events}
            mask={state.eventMask}
            requestChange={this._handleEventListChange}
          />
        </Paper>
        <Paper>
          <FinalStateList
            selected={state.selectedFinalState}
            states={state.finalStates}
            mask={state.finalStatesMask}
            requestChange={this._handleFinalStateListChange}
          />
        </Paper>
      </Paper>
    );
  }

  _handleInitialStateListChange(e, state) {

  }

  _handleEventListChange(e, event) {

  }

  _handleFinalStateListChange(e, state) {

  }
}
