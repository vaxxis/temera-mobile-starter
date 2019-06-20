import React, { Component } from 'react'
import { StyleSheet, ScrollView } from 'react-native'
import { Screen, InfoMessage, KeyValueRow } from '@components'
import { NavigatorInstance } from '@types'
import { __, T } from '@config/i18n'
import { delay, showMessage, showError } from '@utils'

interface Props {
  navigator: NavigatorInstance
}

export default class ExampleScreen extends Component<Props> {
  screen!: Screen

  openSettings = () => {
    this.props.navigator.navigateTo({
      screen: 'SettingsScreen',
    })
  }

  showScreenOverlay = async () => {
    this.screen.showOverlay('Loading message...')
    await delay(3000)
    this.screen.hideOverlay()
  }

  render() {
    return (
      <Screen ref={r => (this.screen = r!)} title={__(T.titles.example)} {...this.props}>
        <InfoMessage text="This is an InfoMessage Component" />

        <ScrollView>
          <KeyValueRow label="Label" value="this is a key value row" />
          <KeyValueRow label="Open Settings" onPress={this.openSettings} />
          <KeyValueRow label="Show Screen overlay for 3s" onPress={this.showScreenOverlay} />
          <KeyValueRow label="Show message" onPress={() => showMessage('title', 'my message')} />
          <KeyValueRow label="Show error" onPress={() => showError('error title', 'message error')} />
        </ScrollView>
      </Screen>
    )
  }
}

const s = StyleSheet.create({})
