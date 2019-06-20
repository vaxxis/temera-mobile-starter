import React, { PureComponent } from 'react'
import { View, StyleSheet, ViewStyle, StyleProp, Dimensions } from 'react-native'
import { Text } from './index'

const SMALL_DEVICE = Dimensions.get('window').width <= 325

interface Props {
  text: string
  style?: StyleProp<ViewStyle>
}

export default class InfoMessage extends PureComponent<Props> {
  render() {
    const { text, style } = this.props

    return (
      <View style={[s.container, style]}>
        <Text style={s.text}>{text}</Text>
      </View>
    )
  }
}

const s = StyleSheet.create({
  container: {
    padding: !SMALL_DEVICE ? 32 : 26,
    paddingVertical: !SMALL_DEVICE ? 32 : 20,
    backgroundColor: '#f6f6f6',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  text: {
    fontSize: 16,
    color: '#525252',
    textAlign: 'center',
  },
})
