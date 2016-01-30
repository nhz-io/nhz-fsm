import SelectableContainerEnhance from 'dev/components/SelectableContainerEnhance';
import ListItem from 'material-ui/lib/lists/list-item';
import React from 'react';
const { Component, PropTypes } = React;
import SelectableList from './SelectableList';

export default class InitialStateList extends Component {

  static propTypes = {
    states        : PropTypes.array,
    selected      : PropTypes.string,
    requestChange : PropTypes.func,
  };

  render() {
    const { props } = this;
    const { states, selected, requestChange } = props;
    return(
      <SelectableList
        {...props}
        valueLink={{
          value         : selected,
          requestChange : requestChange,
        }}
      >
        {(states || []).map((state) => {
          return(
            <ListItem value={state} key={state}>
              <h3 style={{margin:2}}>{state}</h3>
            </ListItem>
          );
        })}
      </SelectableList>
    );
  }
}
