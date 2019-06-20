import React, { Component } from 'react'
import { StyleSheet } from 'react-native'
import { Screen, KeyValueRow, Section } from '@components'
import { NavigatorInstance } from '@types'
import { __, T } from '@config/i18n'

interface Props {
  navigator: NavigatorInstance
}

export default class SettingsScreen extends Component<Props> {
  render() {
    return (
      <Screen title={__(T.titles.settings)} scroll grey {...this.props}>
        <Section title={'Section 1'}>
          <KeyValueRow label="Label" value="value" />
          <KeyValueRow label="Label 1" value="value 1" />
          <KeyValueRow label="Label 2" value="value 2" />
        </Section>

        <Section title={'Section 2'}>
          <KeyValueRow label="Label 1" value="value 1" />
          <KeyValueRow label="Label 2" value="value 2" />
        </Section>
      </Screen>
    )
  }
}

const s = StyleSheet.create({})
