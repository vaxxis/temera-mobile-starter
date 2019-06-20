import React, { Component } from 'react'
import AppNavigator from './components/navigation/AppNavigator'

interface Props {}
export default class App extends Component<Props> {
  async componentDidMount() {}

  render() {
    const initialScreen = 'LoginScreen'

    return <AppNavigator initialScreen={initialScreen} />
  }
}
