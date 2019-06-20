import React, { PureComponent } from 'react'
import { StyleSheet, Text as TextCore, TextProps, StyleProp, TextStyle } from 'react-native'

interface Props extends TextProps {
  size?: number
  thin?: boolean
  light?: boolean
  bold?: boolean
  heavy?: boolean
  center?: boolean
  white?: boolean
  upper?: boolean
  numberOfLines?: number
  style?: StyleProp<TextStyle>
}

export default class Text extends PureComponent<Props> {
  render() {
    const { size, bold, heavy, thin, light, upper, white, center, style, numberOfLines } = this.props

    let headings: StyleProp<TextStyle> = {}
    let moreProps: TextProps = {
      numberOfLines,
    }

    if (size) {
      headings = { fontSize: size }
    }

    if (bold) {
      headings = { fontWeight: 'bold' }
    }

    if (heavy) {
      headings = { fontWeight: '900' }
    }

    if (thin) {
      headings = { fontWeight: '200' }
    }

    if (light) {
      headings = { fontWeight: '300' }
    }

    if (center) {
      headings.textAlign = 'center'
    }

    if (white) {
      headings.color = 'white'
    }

    const content =
      upper === true && typeof this.props.children === 'string'
        ? this.props.children.toUpperCase()
        : this.props.children

    return (
      <TextCore style={[s.text, headings, style]} {...moreProps}>
        {content}
      </TextCore>
    )
  }
}

const s = StyleSheet.create({
  text: {
    fontSize: 16,
    color: '#333333',
    fontWeight: '300',
    backgroundColor: 'transparent',
  },
})
