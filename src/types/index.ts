import { ScreenName } from '@screens/SCREENS'

export interface NavigatorRoute {
  screen: ScreenName
  [prop: string]: any
}

/**
 * Describes the navigator actions for ../AppNavigator.tsx
 */
export interface NavigatorInstance {
  /**
   * Navigates to the specified screen (push screen to stack)
   */
  navigateTo(route: NavigatorRoute): void

  /**
   * Navigates to previous screen
   */
  pop(): void

  /**
   * Navigates to previous N screens
   */
  popN(steps: number): void

  /**
   * Reset the current navigation stack to the specified screen
   */
  resetNavigationTo(route: NavigatorRoute): void

  /**
   * Will emmit an event before the screen will change
   */
  onScreenWillChange(listenerId: string, callback): void

  /**
   * Will emmit an event after the screen did change
   */
  onScreenDidChange(listenerId: string, callback): void

  /**
   * remove "will" and "did" change listeners
   */
  removeListenerById(listenerId): void

  /**
   * get current screen
   */
  currentScreen: string
}
