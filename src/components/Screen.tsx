import React, { Component } from 'react'
import { Dimensions, View, ScrollView, ActivityIndicator, LayoutAnimation } from 'react-native'
import { Platform, Keyboard, StyleSheet, StyleProp, ViewStyle } from 'react-native'
import { Text } from './index'
import Navbar, { NavbarProps } from './Navbar'
import { NavigatorInstance } from '@types'

const isAndroid = Platform.OS === 'android'
const { height, width } = Dimensions.get('window')

export interface ScreenProps extends NavbarProps {
  scroll?: boolean
  hideNavbar?: boolean
  navigator?: NavigatorInstance
  grey?: boolean
  style?: StyleProp<ViewStyle>
  containerStyle?: StyleProp<ViewStyle>
  children?: Element
}

export default class Screen extends Component<ScreenProps> {
  static defaultProps: Partial<ScreenProps> = {
    scroll: false,
    showBackButton: true,
  }

  state = {
    showOverlay: false,
    overlayLoader: true,
    overlayMessage: '',
  }

  componentDidMount() {
    // Android: Keyboard doesn't auto dismiss when app change page
    // this is a control to hide the keyboard
    if (isAndroid) {
      Keyboard.dismiss()
    }
  }

  showOverlay(message = '', loader = true) {
    LayoutAnimation.easeInEaseOut()

    return this.setState({
      overlayMessage: message,
      overlayLoader: loader,
      showOverlay: true,
    })
  }

  hideOverlay() {
    return this.setState({
      showOverlay: false,
      overlayLoader: true,
      overlayMessage: '',
    })
  }

  renderOverlayHud() {
    if (!this.state.showOverlay) {
      return null
    }

    const loader = this.state.overlayLoader ? <ActivityIndicator color="#ccc" size="large" /> : null
    const message = this.state.overlayMessage ? <Text style={s.overlayMessage}>{this.state.overlayMessage}</Text> : null

    return (
      <View style={s.overlay}>
        <View style={s.overlayContent}>
          {loader}
          {message}
        </View>
      </View>
    )
  }

  // Render ScreenName on developer mode
  renderScreenName() {
    if (!__DEV__) {
      return null
    }

    const routes = this.props.navigator.getCurrentRoutes()
    const name = routes[routes.length - 1].screen

    return (
      <View style={s.devBox}>
        <Text style={s.devLabel}>{name}</Text>
      </View>
    )
  }

  renderNavbar() {
    if (this.props.hideNavbar) {
      return null
    }

    return <Navbar style={{ flex: 1 }} {...this.props} />
  }

  render() {
    const addStyles = this.props.style ? this.props.style : {}
    const greyBg = this.props.grey ? { backgroundColor: '#F6F6F6' } : null

    let content = (
      <View style={[{ flex: 1 }]}>
        <ScrollView style={[{ flex: 1 }, greyBg, addStyles]} keyboardShouldPersistTaps={'handled'}>
          <View style={[s.content, addStyles]}>{this.props.children}</View>
        </ScrollView>
      </View>
    )

    if (!this.props.scroll) {
      content = <View style={[s.content, greyBg, addStyles]}>{this.props.children}</View>
    }

    return (
      <View style={[s.app, this.props.containerStyle]}>
        {this.renderNavbar()}
        {content}
        {this.renderScreenName()}
        {this.renderOverlayHud()}
      </View>
    )
  }
}

const s = StyleSheet.create({
  app: {
    flex: 1,
    backgroundColor: 'white',
    position: 'relative',
  },
  content: {
    flex: 1,
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: width,
    height: height,
    backgroundColor: 'rgba(66, 72, 77, 0.35)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlayContent: {
    flex: 0,
    backgroundColor: 'white',
    width: 160,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    paddingVertical: 40,
    paddingBottom: 20,
    borderRadius: 10,
  },
  overlayMessage: {
    marginTop: 10,
    textAlign: 'center',
    color: '#999',
    fontSize: 15,
    fontWeight: '400',
  },

  devBox: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    left: 0,
  },
  devLabel: {
    fontSize: 12,
    color: '#37D9B5',
    textAlign: 'center',
    fontWeight: '500',
  },
})
