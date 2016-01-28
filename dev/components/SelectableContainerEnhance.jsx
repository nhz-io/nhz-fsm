import SelectableEnhance from 'material-ui/lib/hoc/selectable-enhance';

export default class SelectableContainerEnhance extends SelectableEnhance {
  _isChildSelected(child, props) {
    let childValue = child.props.value;
    let itemValue = this.getValueLink(props).value.find(childValue);

    return (itemValue && itemValue === childValue);
  }

  getValueLink(props) {
    return props.valueLink || {
      value: props.value || [],
      requestChange: props.onChange,
    };
  }
}
