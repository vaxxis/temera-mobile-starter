import React, { PureComponent } from 'react'
import IonIcon from 'react-native-vector-icons/Ionicons'
import { StyleProp, ViewStyle } from 'react-native'

interface Props {
  name: string
  size?: number
  color?: string
  style?: StyleProp<ViewStyle>
}

export default class Icon extends PureComponent<Props> {
  static defaultProps = {
    name: 'ios-baseball-outline',
    color: 'red',
    size: 28,
  }

  render() {
    return <IonIcon {...this.props} />
  }
}
