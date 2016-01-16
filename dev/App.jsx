import React from 'react';
import Base from './Base.jsx';

import RaisedButton from 'material-ui/lib/raised-button';
import Dialog from 'material-ui/lib/dialog';
import ThemeManager from 'material-ui/lib/styles/theme-manager';
import LightRawTheme from 'material-ui/lib/styles/raw-themes/light-raw-theme';
import Colors from 'material-ui/lib/styles/colors';
import FlatButton from 'material-ui/lib/flat-button';
import Paper from 'material-ui/lib/paper';
import Toolbar from 'material-ui/lib/toolbar/toolbar';
import ToolbarGroup from 'material-ui/lib/toolbar/toolbar-group';
import ToolbarSeparator from 'material-ui/lib/toolbar/toolbar-separator';
import ToolbarTitle from 'material-ui/lib/toolbar/toolbar-title';
import AppBar from 'material-ui/lib/app-bar';
import TextField from 'material-ui/lib/text-field';

import List from 'material-ui/lib/lists/list';
import ListItem from 'material-ui/lib/lists/list-item';
import ActionGrade from 'material-ui/lib/svg-icons/action/grade';
import ActionInfo from 'material-ui/lib/svg-icons/action/info';
import ContentInbox from 'material-ui/lib/svg-icons/content/inbox';
import ContentDrafts from 'material-ui/lib/svg-icons/content/drafts';
import ContentSend from 'material-ui/lib/svg-icons/content/send';
import Divider from 'material-ui/lib/divider';
import Badge from 'material-ui/lib/badge';

const { PropTypes } = React;

const hasOwnProp = (obj, key) => ({}).hasOwnProperty.call(obj, key);

const containerStyle = {
  textAlign: 'center',
  paddingTop: 200,
};

export default class Main extends Base {
  static childContextTypes = { muiTheme: PropTypes.object };

  getChildContext() { return { muiTheme: this.state.muiTheme } }

  constructor(props) {
    super(props);
    this.state = {
      muiTheme: ThemeManager.getMuiTheme(LightRawTheme),
      appTitle: 'State Machine Editor',
      initialStateTitle: 'Initial State',
      eventTitle: 'Event',
      finalStateTitle: 'Final State',
      filterHintText: 'Filter',
    };
    this.bindHandlers(/^_handle[A-Z]/, Main.prototype);
  }

  componentWillMount() {
    let newMuiTheme = ThemeManager.modifyRawThemePalette(this.state.muiTheme, {
      accent1Color: Colors.deepOrange500
    });

    this.setState({muiTheme: newMuiTheme});
  }

  _handleRequestClose() { this.setState({open: false}) }

  _handleTouchTap() { this.setState({open: true}) }

  render() {
    const {state} = this;
    const cardWidth = '70%';
    return(
      <div className='app-container'>
        <AppBar title={state.appTitle} zDepth={1}/>
        <Paper zDepth={1}>
          <Toolbar>
            <ToolbarGroup>
              <ToolbarTitle text={state.initialStateTitle} />
            </ToolbarGroup>
          </Toolbar>
          <TextField hintText={state.filterHintText}/>
          <List>
            <ListItem primaryText='init' />
            <ListItem primaryText='start' />
            <ListItem primaryText='foo' />
            <ListItem primaryText='bar' />
          </List>
        </Paper>
        <Paper zDepth={1}>
          <Toolbar>
            <ToolbarGroup>
              <ToolbarTitle text={state.eventTitle} />
            </ToolbarGroup>
          </Toolbar>
          <TextField hintText={state.filterHintText}/>
          <Paper style={{height:200, margin: 8}} />
        </Paper>
        <Paper zDepth={1}>
          <Toolbar>
            <ToolbarGroup>
              <ToolbarTitle text={state.finalStateTitle} />
            </ToolbarGroup>
          </Toolbar>
          <TextField hintText={state.filterHintText}/>
        </Paper>
      </div>
    )
  }
}
