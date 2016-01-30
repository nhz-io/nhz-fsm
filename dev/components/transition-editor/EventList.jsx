import SelectableContainerEnhance from 'dev/components/SelectableContainerEnhance';
import ListItem from 'material-ui/lib/lists/list-item';
import React from 'react';
const { Component, PropTypes } = React;
import SelectableList from 'dev/components/SelectableList';

export default class EventList extends Component {

  static propTypes = {
    events        : PropTypes.array,
    selected      : PropTypes.string,
    mask          : PropTypes.array,
    requestChange : PropTypes.func,
  };

  render() {
    const { props } = this;
    const { events, selected, requestChange, mask } = props;
    return(
      <SelectableList
        {...props}
        valueLink={{
          value         : selected,
          mask          : mask,
          requestChange : requestChange,
        }}
      >
        {(events || []).map((event) => {
          return(
            <ListItem value={event} key={event}>
              <h3 style={{margin:2}}>{event}</h3>
            </ListItem>
          );
        })}
      </SelectableList>
    );
  }
}
