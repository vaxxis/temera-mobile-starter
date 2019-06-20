import React, { Component } from 'react'
import { StyleSheet, ScrollView } from 'react-native'
import { Screen, InfoMessage, KeyValueRow } from '@components'
import { NavigatorInstance } from '@types'
import { __, T } from '@config/i18n'

interface Props {
  navigator: NavigatorInstance
}

export default class ExampleScreen extends Component<Props> {
  openSettings = () => {
    this.props.navigator.navigateTo({
      screen: 'SettingsScreen',
    })
  }

  render() {
    return (
      <Screen title={__(T.titles.example)} {...this.props}>
        <InfoMessage text="Example Screen!" />

        <ScrollView>
          <KeyValueRow label="Label" value="value" />
          <KeyValueRow label="Open Settings" onPress={this.openSettings} />
        </ScrollView>
      </Screen>
    )
  }
}

const s = StyleSheet.create({})
