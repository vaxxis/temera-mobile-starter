import React, { PureComponent } from 'react'
import { StyleSheet, View, TouchableHighlight, TouchableOpacity, StyleProp, ViewStyle } from 'react-native'
import Text from './Text'
import Icon from './Icon'

const SMALL_DEVICE = require('react-native').Dimensions.get('window').width <= 325

export interface KeyValueRowProps {
  label?: string | Element
  value?: string | Element
  onPress?: () => void
  labelStyle?: StyleProp<ViewStyle> | object
  valueStyle?: StyleProp<ViewStyle> | object
  hidePressArrow?: boolean
  style?: StyleProp<ViewStyle>
  upArrow?: boolean
  newLine?: boolean
  showDelete?: boolean
  onDeletePress?: () => void
  topBorder?: boolean
}

export default class KeyValueRow extends PureComponent<KeyValueRowProps> {
  render() {
    const { label, value, valueStyle, labelStyle, style, newLine } = this.props
    const labelIsText = typeof label === 'string' || typeof label === 'number'
    const valueIsText = typeof value === 'string' || typeof value === 'number'

    // LABEL(KEY) Element
    let renderKeyLabel: Element | null = labelIsText ? (
      <Text style={[s.itemKey, s.vpad, labelStyle]}>{label}</Text>
    ) : (
      <View style={s.labelComponentValue}>{label}</View>
    )

    if (!label) {
      renderKeyLabel = null
    }

    const numCharsToCheck = SMALL_DEVICE ? 30 : 40
    const goNewLine = (valueIsText && value.length + label.length > numCharsToCheck) || newLine

    // if the "value" is a string and the length is > 50, print it under the label
    const longValueItemStyle = goNewLine ? s.longValueItemStyle : null
    const longValueValueTextStyle = goNewLine ? s.longValueValueTextStyle : null
    const renderTextValue = valueIsText ? (
      <Text style={[s.itemValue, valueStyle, longValueValueTextStyle]}>{value}</Text>
    ) : null

    // If the "value" is a component render it directly
    const renderComponentValue = !valueIsText ? <View style={s.componentValue}>{value}</View> : null

    // if there is an "onPress", show a right arrow
    const renderArrow =
      this.props.onPress && !this.props.hidePressArrow ? (
        this.props.upArrow ? (
          <Icon name="ios-arrow-up" size={22} color="#C7C7CC" style={s.arrow} />
        ) : (
          <Icon name="ios-arrow-forward" size={22} color="#C7C7CC" style={s.arrow} />
        )
      ) : null

    const deleteButton =
      this.props.showDelete && this.props.onDeletePress ? <Icon name="ios-close-circle" size={24} color="#bbb" /> : null

    const removeRightPadding = this.props.showDelete && this.props.onDeletePress ? { paddingRight: 0 } : null

    const topBorderStyle = this.props.topBorder
      ? { borderTopWidth: StyleSheet.hairlineWidth, borderTopColor: '#C8C7CC' }
      : null

    return (
      <TouchableHighlight
        // if no onPress method is passed, act as a View
        disabled={this.props.onPress ? false : true}
        underlayColor={'rgba(0, 0, 0, 0.08)'}
        onPress={this.props.onPress}
        style={s.touchable}
      >
        <View style={[s.wrapper, style]}>
          <View style={[s.itemRow, longValueItemStyle, topBorderStyle, removeRightPadding]}>
            {renderKeyLabel}
            {renderTextValue}
            {renderComponentValue}
          </View>

          {renderArrow && !deleteButton && <View style={s.rightSide}>{renderArrow}</View>}

          {deleteButton && (
            <TouchableOpacity style={s.deleteButton} activeOpacity={0.5} onPress={this.props.onDeletePress}>
              {deleteButton}
            </TouchableOpacity>
          )}
        </View>
      </TouchableHighlight>
    )
  }
}

const s = StyleSheet.create({
  touchable: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'white',
  },
  wrapper: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#C8C7CC',
  },
  vpad: {
    paddingVertical: !SMALL_DEVICE ? 18 : 14,
  },
  itemRow: {
    flex: 1,
    paddingHorizontal: 18,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  rightSide: {
    paddingRight: 15,
  },
  deleteButton: {
    padding: 13,
    paddingLeft: 14,
    paddingTop: 16,
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  itemKey: {
    fontSize: 15,
    color: '#353535',
    fontWeight: '700',
  },
  itemValue: {
    flex: 1,
    fontSize: 15,
    color: '#353535',
    fontWeight: '300',
    textAlign: 'right',
  },
  longValueItemStyle: {
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  longValueValueTextStyle: {
    textAlign: 'left',
    marginTop: -15,
    paddingBottom: 18,
  },
  labelComponentValue: {
    flex: 0,
    flexDirection: 'row',
    alignItems: 'center',
  },
  componentValue: {
    flex: 0,
    flexDirection: 'row',
    alignItems: 'center',
  },
  arrow: {
    flex: 0,
  },
})
