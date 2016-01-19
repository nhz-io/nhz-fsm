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
  }

  render() {
    return(
      <Paper>
        <Toolbar>
          <ToolbarGroup>
            <ToolbarTitle></ToolbarTitle>
          </ToolbarGroup>
          <ToolbarGroup>
          </ToolbarGroup>
        </Toolbar>
      </Paper>
    );
  }
}
