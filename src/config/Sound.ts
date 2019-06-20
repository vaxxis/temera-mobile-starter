import Sound from 'react-native-sound'

const tap = new Sound('tap.m4a', Sound.MAIN_BUNDLE, error => {
  error && console.warn('failed to load sound', error)
})

const next = new Sound('next.m4a', Sound.MAIN_BUNDLE, error => {
  error && console.warn('failed to load sound', error)
})

const scan = new Sound('scan.m4a', Sound.MAIN_BUNDLE, error => {
  error && console.warn('failed to load sound', error)
})

const error = new Sound('error.m4a', Sound.MAIN_BUNDLE, error => {
  error && console.warn('failed to load sound', error)
})

const success = new Sound('success.m4a', Sound.MAIN_BUNDLE, error => {
  error && console.warn('failed to load sound', error)
})

const confirmation = new Sound('confirmation.m4a', Sound.MAIN_BUNDLE, error => {
  error && console.warn('failed to load sound', error)
})

export default {
  tap: (onFinish?) => tap.play(onFinish),
  next: (onFinish?) => next.play(onFinish),
  scan: (onFinish?) => scan.play(onFinish),
  error: (onFinish?) => error.play(onFinish),
  success: (onFinish?) => success.play(onFinish),
  confirmation: (onFinish?) => confirmation.play(onFinish),
}
