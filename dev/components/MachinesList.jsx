import React from 'react';
import Base from '../Base.jsx';
import List from 'material-ui/lib/lists/list';
import ListItem from 'material-ui/lib/lists/list-item';
import Avatar from 'material-ui/lib/avatar';
import MemoryIcon from 'material-ui/lib/svg-icons/hardware/memory';
import ClearIcon from 'material-ui/lib/svg-icons/content/clear';
import SelectableContainerEnhance './SelectableContainerEnhance';
import SelectableList from './SelectableList';

export default class MachinesList extends Base {
  constructor(props) {
    super(props);
  }

  render() {
    const { props } = this;
    return(
      <SelectableList {...props}>
        {
          Object
          .keys(props.machines)
          .map((key) => ({id:key, machine:props.machines[key]}))
          .sort((a, b) => a.machine.name > b.machine.name)
          .map((item) => {
          let date = new Date(item.machine.timestamp);
          return(
            <ListItem
              value={item.id}
              key={item.id}
              leftAvatar={<Avatar icon={<MemoryIcon />} />}
              rightIcon={
                <ClearIcon
                  onTouchTap={(e) => {
                    e.stopPropagation();
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
      </SelectableList>
    );
  }
}
