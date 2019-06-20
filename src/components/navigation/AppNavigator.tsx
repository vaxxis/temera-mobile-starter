import React, { Component } from 'react'
import { Navigator } from 'react-native-deprecated-custom-components'
import { Platform } from 'react-native'
import Screens from '@screens'
const isAndroid = Platform.OS === 'android'

interface Props {
  initialScreen: string
}

export default class AppNavigator extends Component<Props> {
  currentScreenName = null

  routeStack = [] // current route stack

  accessTokenExpiredListener: any

  currentScreenId?: number = undefined
  onScreenDidChangeListeners: any[] = []
  onScreenWillChangeListeners: any[] = []

  navigator: any

  shouldExitApp = () => this.routeStack.length === 1

  navigateTo = obj => {
    this.navigator.push({
      ...obj,
      screenId: `${obj.screen}-${new Date().getTime()}`,
    })
  }

  resetNavigationTo = obj => {
    this.navigator.resetTo({
      ...obj,
      screenId: `${obj.screen}-${new Date().getTime()}`,
    })
  }

  // We render the component dinamicaly based on the route name.
  // to configure a new Screen, view the "Screen" Object
  renderScene(route, navigator) {
    this.currentScreenName = route.screen
    const CustomScreen = Screens[route.screen]

    // navigator aditional props
    navigator.shouldExitApp = this.shouldExitApp
    navigator.onScreenWillChange = this.onScreenWillChange
    navigator.onScreenDidChange = this.onScreenDidChange
    navigator.removeListenerById = this.removeListenerById
    navigator.currentScreen = this.currentScreenName
    navigator.navigateTo = this.navigateTo
    navigator.resetNavigationTo = this.resetNavigationTo
    this.routeStack = navigator.getCurrentRoutes()

    return <CustomScreen {...route} navigator={navigator} />
  }

  /**
   * Configure navigation Transition
   *
   * Availabla transitions
   * ---------------------
   * FloatFromBottom
   * PushFromRight
   * FloatFromRight
   * FloatFromLeft
   * FloatFromBottomAndroid
   * FadeAndroid
   * HorizontalSwipeJump
   * HorizontalSwipeJumpFromRight
   * VerticalUpSwipeJump
   * VerticalDownSwipeJump
   * FloatFromRight
   *
   * @param {*} route
   */
  configureScene(route) {
    // on android just do FloatFromBottomAndroid
    const transition = isAndroid
      ? Navigator.SceneConfigs.FloatFromBottomAndroid
      : route.transition
      ? Navigator.SceneConfigs[route.transition]
      : Navigator.SceneConfigs.FloatFromRight

    return transition
  }

  onScreenWillChange = (listenerId, callback) => {
    this.onScreenWillChangeListeners.push({ id: listenerId, callback })
  }

  onScreenDidChange = (listenerId, callback) => {
    this.onScreenDidChangeListeners.push({ id: listenerId, callback })
  }

  handleScreenWillChange = destinationRoute => {
    if (this.currentScreenId) {
      const listener = this.onScreenWillChangeListeners.find(l => l.id === this.currentScreenId)
      if (listener) {
        listener.callback(destinationRoute)
      }
    }
  }

  handleScreenDidChange = route => {
    this.currentScreenId = route.screenId || null
    if (route.screenId) {
      const listener = this.onScreenDidChangeListeners.find(l => l.id === route.screenId)
      if (listener) {
        listener.callback(route)
      }
    }
  }

  removeListenerById = listenerId => {
    this.onScreenWillChangeListeners = this.onScreenWillChangeListeners.filter(l => l.id !== listenerId)
    this.onScreenDidChangeListeners = this.onScreenDidChangeListeners.filter(l => l.id !== listenerId)
  }

  render() {
    return (
      <Navigator
        ref={r => (this.navigator = r)}
        onWillFocus={this.handleScreenWillChange}
        onDidFocus={this.handleScreenDidChange}
        initialRoute={{ screen: this.props.initialScreen }}
        renderScene={(route, navigator) => this.renderScene(route, navigator)}
        configureScene={this.configureScene}
      />
    )
  }
}
