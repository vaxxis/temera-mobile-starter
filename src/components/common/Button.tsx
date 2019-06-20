import React, { Component } from 'react'
import { StyleSheet, TouchableOpacity, ActivityIndicator, StyleProp, TextStyle, ViewStyle } from 'react-native'
import Text from './Text'

const SMALL_DEVICE = require('react-native').Dimensions.get('window').width <= 325

interface Props {
  title: string
  onPress: () => void
  loading?: boolean
  disabled?: boolean
  numberOfLines?: number
  secondary?: boolean // secondary button style
  link?: boolean // link button style
  textStyle?: StyleProp<TextStyle> // style for text title
  style?: StyleProp<ViewStyle>
  children?: Element
}

export default class Button extends Component<Props> {
  render() {
    const { title, secondary, link, numberOfLines, loading, disabled, onPress } = this.props
    const { textStyle, children, style } = this.props

    let buttonTitle = title ? String(title).toUpperCase() : children

    let containerStyle: ViewStyle = {}
    let buttonTextStyle: TextStyle = {}

    if (secondary) {
      containerStyle = { backgroundColor: '#D1D1D1' }
      buttonTextStyle = {}
    }

    if (link) {
      buttonTitle = title || children
      containerStyle = { backgroundColor: 'transparent', marginTop: 0 }
      buttonTextStyle = { fontWeight: 'bold', textDecorationLine: 'underline' }
    }

    const lines = numberOfLines || 1

    const content = loading ? (
      <ActivityIndicator size="small" color="black" />
    ) : (
      <Text style={[s.text, textStyle, buttonTextStyle]} numberOfLines={lines}>
        {buttonTitle}
      </Text>
    )

    const disabledStyle = loading || disabled ? { opacity: 0.8 } : null

    return (
      <TouchableOpacity
        onPress={onPress}
        activeOpacity={0.85}
        disabled={loading || disabled}
        style={[s.button, style, containerStyle, disabledStyle]}
      >
        {content}
      </TouchableOpacity>
    )
  }
}

const s = StyleSheet.create({
  button: {
    marginTop: 20,
    backgroundColor: '#222',
    padding: !SMALL_DEVICE ? 20 : 16,
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 16,
    fontWeight: '300',
    textAlign: 'center',
    color: 'white',
  },
})
