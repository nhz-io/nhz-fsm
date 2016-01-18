import React from 'react';
import Base from './Base.jsx';
import List from 'material-ui/lib/lists/list';
import ListItem from 'material-ui/lib/lists/list-item';
import Avatar from 'material-ui/lib/avatar';
import MemoryIcon from 'material-ui/lib/svg-icons/hardware/memory';
import ClearIcon from 'material-ui/lib/svg-icons/content/clear';

export default class MachinesList extends Base {
  constructor(props) {
    super(props);
  }

  render() {
    const { props } = this;
    return(
      <List {...props}>
        {
          Object
            .keys(props.machines)
            .map((key) => ({id:key, machine:props.machines[key]}))
            .sort((a, b) => a.machine.name > b.machine.name)
            .map((item) => {
              let date = new Date(item.machine.timestamp);
              return(
                <ListItem
                  key={item.id}
                  leftAvatar={<Avatar icon={<MemoryIcon />} />}
                  rightIcon={
                    <ClearIcon
                      onClick={() => {
                        props.onDeleteAction && props.onDeleteAction(item);
                      }}
                      onTouchTap={() => {
                        props.onDeleteAction && props.onDeleteAction(item);
                      }}
                    />
                  }
                  primaryText={item.machine.name}
                  secondaryText={`${date.toLocaleDateString()} ${date.toLocaleTimeString()}`}
                />
              );
            })
        }
      </List>
    );
  }
}
