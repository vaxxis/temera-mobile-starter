import React, { Component } from 'react'
import { StyleSheet } from 'react-native'
import { NavigatorInstance } from '@types'
import { Screen, Button } from '@components'
import { __, T } from '@config/i18n'

interface Props {
  navigator: NavigatorInstance
}

export default class LoginScreen extends Component<Props> {
  openExample = () => {
    this.props.navigator.navigateTo({
      screen: 'ExampleScreen',
    })
  }

  render() {
    return (
      <Screen title={__(T.titles.login)} showBackButton={false} {...this.props}>
        <Button title={__(T.titles.example)} onPress={this.openExample} style={s.button} />
      </Screen>
    )
  }
}

const s = StyleSheet.create({
  button: {
    margin: 20,
  },
})
