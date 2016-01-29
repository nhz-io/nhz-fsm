import React from 'react';
import getMuiTheme from 'material-ui/lib/styles/getMuiTheme';
import StylePropable from 'material-ui/lib/mixins/style-propable';
import ColorManipulator from 'material-ui/lib/utils/color-manipulator';
import SelectableEnhance from 'material-ui/lib/hoc/selectable-enhance';

export default function SelectableContainerEnhance(Component) {
  const composed = React.createClass({

    displayName: `Selectable${Component.displayName}`,

    propTypes: {
      children: React.PropTypes.node,
      selectedItemStyle: React.PropTypes.object,
      maskedItemStyle: React.PropTypes.object,
      valueLink: React.PropTypes.shape({
        value: React.PropTypes.any,
        values: React.PropTypes.array,
        mask: React.PropTypes.array,
        requestChange: React.PropTypes.func,
      }).isRequired,
    },

    contextTypes: {
      muiTheme: React.PropTypes.object,
    },

    childContextTypes: {
      muiTheme: React.PropTypes.object,
    },

    mixins: [
      StylePropable,
    ],

    getInitialState() {
      return {
        muiTheme: this.context.muiTheme || getMuiTheme(),
      };
    },

    getChildContext() {
      return {
        muiTheme: this.state.muiTheme,
      };
    },

    componentWillReceiveProps(nextProps, nextContext) {
      let newMuiTheme = nextContext.muiTheme ? nextContext.muiTheme : this.state.muiTheme;
      this.setState({muiTheme: newMuiTheme});
    },

    getValueLink(props) {
      return props.valueLink || {
        value: props.value,
        values: props.values,
        requestChange: props.onChange,
        mask: props.mask,
      };
    },

    _extendChild(child, styles, selectedItemStyle) {
      if (child && child.type && child.type.displayName === 'ListItem') {
        let selected = this._isChildSelected(child, this.props);
        let selectedChildrenStyles = {};
        if (selected) {
          selectedChildrenStyles = this.mergeStyles(styles, selectedItemStyle);
        }

        let mergedChildrenStyles = this.mergeStyles(child.props.style || {}, selectedChildrenStyles);

        this._keyIndex += 1;

        return React.cloneElement(child, {
          onTouchTap: (e) => {
            this._handleItemTouchTap(e, child);
            if (child.props.onTouchTap) {
              child.props.onTouchTap(e);
            }
          },
          key: this._keyIndex,
          style: mergedChildrenStyles,
          nestedItems: child.props.nestedItems.map((child) => this._extendChild(child, styles, selectedItemStyle)),
        });
      } else {
        return child;
      }
    },

    _isChildSelected(child, props) {
      const childValue = child.props.value;
      const { values, value } = this.getValueLink(props);
      const isSelected = values && values.length && values.contains(childValue)

      return isSelected || (value && value === childValue);
    },

    _isChildMasked(child, props) {
      const { value } = child.props;
      const mask = this.getValueLink(props).mask || [];

      return mask.includes(value);
    },

    _handleItemTouchTap(e, item) {
      const itemValue = item.props;
      const { value, values, requestChange } = this.getValueLink(this.props);

      if((values && values.length) || (itemValue !== value)) {
        requestChange(e, itemValue);
      }
    },

    render() {
      const {children, selectedItemStyle} = this.props;
      this._keyIndex = 0;
      let styles = {};

      if (!selectedItemStyle) {
        let textColor = this.state.muiTheme.rawTheme.palette.textColor;
        let selectedColor = ColorManipulator.fade(textColor, 0.2);
        styles = {
          backgroundColor: selectedColor,
        };
      }

      let newChildren = React.Children.map(children, (child) => this._extendChild(child, styles, selectedItemStyle));

      return (
        <Component {...this.props} {...this.state}>
          {newChildren}
        </Component>
      );
    },
  });

  return composed;
};

export default SelectableContainerEnhance;
