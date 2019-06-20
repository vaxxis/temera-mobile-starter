import { Alert } from 'react-native'
import { __, T } from '@config/i18n'
import ActionSheet from 'react-native-bottomsheet'

export const showError = (title: string, message?: string, onButtonPress?: () => void, buttonText = undefined) => {
  Alert.alert(title, message, [{ text: buttonText, onPress: onButtonPress }])
}

export const showMessage = (
  title: string,
  message?: string,
  onButtonPress?: () => void,
  buttonText = __(T.misc.ok)
) => {
  Alert.alert(title, message, [{ text: buttonText, onPress: onButtonPress }])
}

export const askConfirmation = (
  title: string,
  message: string = '',
  onConfirm: () => void,
  onCancel?: () => void,
  options: any = { cancelText: undefined, confirmText: undefined }
) => {
  Alert.alert(title, message, [
    { text: options.cancelText || __(T.misc.cancel), onPress: onCancel },
    { text: options.confirmText || __(T.misc.confirm), onPress: onConfirm },
  ])
}

export const chooseOptionAlert = (title, message = '', buttons = []) => {
  Alert.alert(title, message, buttons)
}

interface Action {
  id: number | string
  text: string
}

export const showActionSheetWithOptions = (items: Action[], title?: string, message?: string): Promise<Action> => {
  return new Promise((resolve, reject) => {
    ActionSheet.showBottomSheetWithOptions(
      {
        title: title,
        message: message,
        options: [...items.map(itm => itm.text), __(T.misc.cancel)],
        cancelButtonIndex: items.length,
      },
      buttonIndex => {
        if (buttonIndex === items.length) {
          reject()
        } else {
          const item = items.find((_, i) => i === buttonIndex)
          resolve(item)
        }
      }
    )
  })
}
