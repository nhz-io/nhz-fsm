import SelectableEnhance from 'material-ui/lib/hoc/selectable-enhance';

export default class SelectableContainerEnhance extends SelectableEnhance {
  getValueLink(props) {
    return props.valueLink || {
      value: props.value || [],
      requestChange: props.onChange,
    };
  }
}
