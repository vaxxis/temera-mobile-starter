import React, { PureComponent } from 'react'
import { View, StyleSheet, StyleProp, ViewStyle } from 'react-native'
import { Text } from '../index'

interface Props {
  title?: string
  children?: Element
  style?: StyleProp<ViewStyle>
}

export default class Section extends PureComponent<Props> {
  render() {
    const { title, style, children } = this.props

    return (
      <View style={[s.container, style]}>
        {title && (
          <View style={s.row}>
            <Text style={s.text}>{title.toUpperCase()}</Text>
          </View>
        )}

        {children && ( // render children component
          <View>
            <View style={s.border} />
            {children}
          </View>
        )}
      </View>
    )
  }
}

const s = StyleSheet.create({
  container: {
    marginTop: 20,
  },
  row: {
    marginBottom: 6,
    marginHorizontal: 18,
  },
  text: {
    fontSize: 13,
    color: '#6D6D72',
    fontWeight: '400',
  },
  border: {
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: '#C8C7CC',
  },
})
