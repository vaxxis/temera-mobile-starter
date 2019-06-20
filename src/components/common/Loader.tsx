import React, { PureComponent } from 'react'
import { ActivityIndicator, StyleSheet, View, StyleProp, ViewStyle } from 'react-native'
import Text from './Text'

interface Props {
  message?: string
  style?: StyleProp<ViewStyle>
}

export default class Loader extends PureComponent<Props> {
  render() {
    const { message } = this.props
    const renderMessage = message ? <Text style={styles.message}>{message}</Text> : null

    return (
      <View style={[styles.container, this.props.style]}>
        <ActivityIndicator color="#aaa" size="large" />
        {renderMessage}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  message: {
    marginTop: 10,
    maxWidth: 150,
    textAlign: 'center',
    color: '#888',
    fontSize: 16,
  },
})
