import React from 'react';
import Base from './Base.jsx';
import Paper from 'material-ui/lib/paper';
import Toolbar from 'material-ui/lib/toolbar/toolbar';
import ToolbarGroup from 'material-ui/lib/toolbar/toolbar-group';
import ToolbarSeparator from 'material-ui/lib/toolbar/toolbar-separator';
import ToolbarTitle from 'material-ui/lib/toolbar/toolbar-title';

export default class StateMachineComponent extends Base {
  constructor(props) {
    super(props);
    this.state = props.store.getState();
    this.bindHandlers(/^_handle[A-Z]/, StateMachineComponent.prototype);
  }

  componentDidMount() {
    const { props } = this;
    props.store.listen(this._handleStoreChange);
  }

  componentWillUnmount() {
    const { props } = this;
    props.store.unlisten(this._handleStoreChange);
  }

  _handleStoreChange(state) { this.setState(state) }

  render() {
    const { props } = this;
    const { store, actions, state } = props;
    return(
      <Paper>
        <Toolbar>
          <ToolbarGroup>
            <ToolbarTitle>{props.title}</ToolbarTitle>
          </ToolbarGroup>
          <ToolbarGroup>
          </ToolbarGroup>
        </Toolbar>
      </Paper>
    );
  }
}
