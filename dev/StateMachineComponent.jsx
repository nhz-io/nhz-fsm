import React from 'react';
import Base from './Base.jsx';
import Paper from 'material-ui/lib/paper';
import Toolbar from 'material-ui/lib/toolbar/toolbar';
import ToolbarGroup from 'material-ui/lib/toolbar/toolbar-group';
import ToolbarSeparator from 'material-ui/lib/toolbar/toolbar-separator';
import ToolbarTitle from 'material-ui/lib/toolbar/toolbar-title';
import MemoryIcon from 'material-ui/lib/svg-icons/hardware/memory';
import Tabs from 'material-ui/lib/tabs/tabs';
import Tab from 'material-ui/lib/tabs/tab';
import InitialStateList from './components/InitialStateList.jsx';


export default class StateMachineComponent extends Base {
  constructor(props) {
    super(props);
    this.state = props.store ? props.store.getState() : {};
    this.bindHandlers(/^_handle[A-Z]/, StateMachineComponent.prototype);
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
    const { props } = this;
    return(
      <Paper className={props.className}>
        <Toolbar float='left'>
          <ToolbarGroup float='left' firstChild={true}>
            <MemoryIcon color="rgba(0,0,0,0.2)" style={{width:40, height:40, margin:8}} />
          </ToolbarGroup>
          <ToolbarGroup>
            <ToolbarTitle text={props.title} />
          </ToolbarGroup>
          <ToolbarGroup>
          </ToolbarGroup>
        </Toolbar>
        <Tabs style={{margin:5}}>
          <Tab label="Transitions">
            <div className='columns-container'>
              <Paper><InitialStateList state='foo' states={['foo', 'bar', 'bot', 'net']} requestChange={(a,b) => console.log("FOOBAR", a, b)}/></Paper>
              <Paper>B</Paper>
              <Paper>C</Paper>
            </div>
          </Tab>
          <Tab label="State Chart">

          </Tab>
          <Tab label="Diagram" />
          <Tab label="Tools" />
        </Tabs>
      </Paper>
    );
  }
}
