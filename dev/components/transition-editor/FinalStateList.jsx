import ListItem from 'material-ui/lib/lists/list-item';
import React from 'react';
const { Component, PropTypes } = React;
import SelectableList from 'dev/components/SelectableList';

export default class FinalStateList extends Component {

  static propTypes = {
    states        : PropTypes.array,
    selected      : PropTypes.string,
    mask          : PropTypes.array,
    requestChange : PropTypes.func,
  };

  render() {
    const { props } = this;
    const { states, selected, requestChange, mask } = props;
    return(
      <SelectableList
        {...props}
        valueLink={{
          value         : selected,
          mask          : mask,
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
