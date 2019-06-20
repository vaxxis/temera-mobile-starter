import React, { PureComponent } from 'react'
import { Platform, TouchableOpacity, BackHandler, View, Alert, TextStyle, ViewStyle, StyleSheet } from 'react-native'
import NavigationBar from 'react-native-navbar'
import { Text, Icon } from './index'
import { __ } from '@config/i18n'
import AppStore from '@AppStore'

const navbarBgColor = '#222222'
const statusbarBgColor = '#222222'

export interface NavbarProps {
  title?: string
  navigator?: any
  showBackButton?: boolean
  showMenuButton?: boolean
  showDownButton?: boolean
  showExitButton?: boolean
  showEmailButton?: boolean
  onBackButtonPress?: () => void
  onMenuButtonPress?: () => void
  onDownButtonPress?: () => void
  onExitButtonPress?: () => void
  onEmailButtonPress?: () => void
  leftButton?: Element
  rightButton?: Element
  onBackResetToDashboard?: boolean // force navigator resetTo to "DashboardScreen"
  showAntennaConfigButton?: boolean
  onAntennaConfigButtonPress?: () => void
}

export default class Navbar extends PureComponent<NavbarProps> {
  componentDidMount() {
    // HANDLE ANDROID BACK BUTTON
    BackHandler.addEventListener('hardwareBackPress', this.onHardwareBackPress)
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.onHardwareBackPress)
  }

  onHardwareBackPress = () => {
    // TODO: move this code to AppNavigator
    // if the current screen is dashboard, ask user if he wants to exit
    if (this.props.navigator.currentScreen === 'DashboardScreen') {
      Alert.alert(__('misc.exit_app'), __('confirms.do_you_really_want_to_exit'), [
        { text: __('misc.no') },
        { text: __('misc.yes'), onPress: () => BackHandler.exitApp() },
      ])
      return true // doesn't use system default
    }
    // if we press the android back button from a menuItemScreen, go to dashboard
    if (this.props.navigator.menuScreens.find(screen => screen === this.props.navigator.currentScreen)) {
      //lo porto alla Dashboard solo se l'utente è loggato
      AppStore.user
        ? this.props.navigator.resetNavigationTo({ screen: 'DashboardScreen' })
        : this.props.navigator.resetNavigationTo({ screen: 'LoginScreen' })
      return true // doesn't use system default
    }

    // HANDLE [<-] back button
    if (this.props.showBackButton && !this.props.showDownButton) {
      if (this.props.onBackButtonPress) {
        this.props.onBackButtonPress()
      } else {
        if (this.props.onBackResetToDashboard) {
          this.props.navigator.resetNavigationTo({ screen: 'DashboardScreen' })
        } else {
          this.props.navigator.pop()
        }
      }
    }

    // HANDLE [↓] down button
    if (this.props.showDownButton) {
      if (this.props.onDownButtonPress) {
        this.props.onDownButtonPress()
      } else {
        this.props.navigator.pop()
      }
    }

    // HANDLE [X] exit button
    if (this.props.showExitButton) {
      if (this.props.onExitButtonPress) {
        this.props.onExitButtonPress()
      } else {
        this.props.navigator.resetNavigationTo({ name: 'DashboardScreen' })
      }
    }

    // If we are on the main sreen, exit the app
    if (this.props.navigator.shouldExitApp()) {
      BackHandler.exitApp()
    }

    return true // always intercept back button (no default to system)
  }

  renderBackButton() {
    const callback = this.props.onBackButtonPress
      ? this.props.onBackButtonPress
      : () => {
          if (this.props.onBackResetToDashboard) {
            this.props.navigator.resetNavigationTo({ screen: 'DashboardScreen' })
          } else {
            this.props.navigator.pop()
          }
        }

    return (
      <TouchableOpacity activeOpacity={0.4} style={s.icon} onPress={callback}>
        <Icon name="ios-arrow-back" size={24} color="#f5f5f5" />
      </TouchableOpacity>
    )
  }

  renderMenuButton(style?: ViewStyle) {
    const callback = this.props.onMenuButtonPress
      ? this.props.onMenuButtonPress
      : () => {
          this.props.navigator.openDrawer()
        }

    return (
      <TouchableOpacity activeOpacity={0.4} style={[s.icon, style]} onPress={callback}>
        <Icon name="md-menu" size={27} color="#f5f5f5" />
      </TouchableOpacity>
    )
  }

  renderDownButton() {
    const callback = this.props.onDownButtonPress
      ? this.props.onDownButtonPress
      : () => {
          this.props.navigator.pop()
        }

    return (
      <TouchableOpacity activeOpacity={0.4} style={s.icon} onPress={callback}>
        <Icon name="ios-arrow-down" size={24} color="#f5f5f5" />
      </TouchableOpacity>
    )
  }

  renderExitButton() {
    return (
      <TouchableOpacity
        activeOpacity={0.4}
        style={[s.icon, { width: 54 }]}
        onPress={() =>
          this.props.onExitButtonPress
            ? this.props.onExitButtonPress()
            : this.props.navigator.resetNavigationTo({ name: 'DashboardScreen' })
        }
      >
        <Icon name="md-close" size={24} color="#f5f5f5" />
      </TouchableOpacity>
    )
  }

  renderAntennaConfigButton() {
    return (
      <TouchableOpacity
        activeOpacity={0.4}
        style={[s.icon, { width: 50 }]}
        onPress={() => this.props.onAntennaConfigButtonPress && this.props.onAntennaConfigButtonPress()}
      >
        {/* <Image source={require('../../assets/images/icon-settings-white.png')} style={{width: 47, height: 47}} /> */}
        <Icon name="md-wifi" size={27} color="#f5f5f5" />
      </TouchableOpacity>
    )
  }

  renderEmailButton() {
    return (
      <TouchableOpacity
        activeOpacity={0.4}
        style={[s.icon, { width: 54 }]}
        onPress={() => this.props.onEmailButtonPress && this.props.onEmailButtonPress()}
      >
        <Icon name="ios-mail" size={24} color="#f5f5f5" />
      </TouchableOpacity>
    )
  }

  render() {
    let moreProps: Partial<NavbarProps> = {}

    if (this.props.showBackButton) {
      moreProps.leftButton = this.renderBackButton()
    }

    if (this.props.showMenuButton) {
      moreProps.leftButton = this.renderMenuButton()
    }

    // handle menu & back button together
    if (this.props.showMenuButton && this.props.showBackButton) {
      const comps = (
        <View style={{ flexDirection: 'row' }}>
          {this.renderBackButton()}
          {this.renderMenuButton({ width: 40, alignItems: 'flex-start' })}
        </View>
      )
      moreProps.leftButton = comps
    }

    if (this.props.showDownButton) {
      moreProps.leftButton = this.renderDownButton()
    }

    if (this.props.showExitButton) {
      moreProps.rightButton = this.renderExitButton()
    }

    if (this.props.showEmailButton) {
      moreProps.rightButton = this.renderEmailButton()
    }

    if (this.props.showAntennaConfigButton) {
      moreProps.rightButton = this.renderAntennaConfigButton()
    }

    if (this.props.leftButton) {
      moreProps.leftButton = this.props.leftButton
    }

    if (this.props.rightButton) {
      moreProps.rightButton = this.props.rightButton
    }

    const titleStyle: TextStyle = {
      flex: 1,
      fontSize: 17,
      fontWeight: '600',
      color: 'white',
      marginBottom: 5,
      ...Platform.select({
        android: {
          position: 'absolute',
          top: -26,
        },
      }),
    }
    const renderTitle = <Text style={titleStyle}>{this.props.title}</Text>

    return (
      <NavigationBar
        tintColor={navbarBgColor}
        statusBar={{ style: 'light-content', tintColor: statusbarBgColor }}
        title={renderTitle}
        {...moreProps}
      />
    )
  }
}

const s = StyleSheet.create({
  icon: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 44,
    width: 48,
  },
})
