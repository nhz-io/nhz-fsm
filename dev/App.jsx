import React from 'react';
import Base from './Base.jsx';
import config from 'config';

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
import IconButton from 'material-ui/lib/icon-button';


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
      muiTheme                 : ThemeManager.getMuiTheme(LightRawTheme),
      appTitle                 : 'State Machine Editor',
      initialStateTitle        : 'Initial State',
      eventTitle               : 'Event',
      finalStateTitle          : 'Final State',
      filterHintText           : 'Filter',
    };
    this.bindHandlers(/^_handle[A-Z]/, Main.prototype);
  }

  componentWillMount() {
    let newMuiTheme = ThemeManager.modifyRawThemePalette(this.state.muiTheme, {
      primary1Color: Colors.blueGrey500,
      primary2Color: Colors.blueGrey700,
      primary3Color: Colors.lightBlack,
      accent1Color: Colors.pinkA200,
      accent2Color: Colors.grey100,
      accent3Color: Colors.grey500,
      textColor: Colors.darkBlack,
      alternateTextColor: Colors.white,
      canvasColor: Colors.white,
      borderColor: Colors.grey300,
      pickerHeaderColor: Colors.cyan500,
      accent1Color: Colors.deepOrange500,
    });
    newMuiTheme = ThemeManager.modifyRawThemeFontFamily(newMuiTheme, {
      fontFamily: 'Raleway, sans-serif',
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
        <AppBar
          zDepth={1}
          showMenuIconButton={false}
          title={[
            <span key='repo-name'>{config.repoName}</span>,
            <IconButton
              style={{padding:0}}
              iconStyle={{color:'rgba(255,255,255,0.9)', position:'relative', top:'2px'}}
              onClick={this._handleAppBarGithubButtonClick}
              onTouchTap={this._handleAppBarGithubButtonClick}
              key='icon-button'
            >
              <i className="mega-octicon octicon-mark-github" key='icon'/>
            </IconButton>,
            <span key='app-title'>{config.appTitle}</span>,
          ]}
        />
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

  _handleAppBarGithubButtonClick() {
    document.location = config.githubUrl;
  }
}
