import i18n from 'react-native-i18n'

import en from './translations/en'

i18n.fallbacks = true
i18n.translations = {
  en,
}

////////////////////////////////////////////////////
// HACK: use languages auto-completion
////////////////////////////////////////////////////
let TRANSLATION_MAP = en

// replace object values with keys
Object.keys(en).forEach((catKey, idx) => {
  const subCat = {}
  Object.keys(en[catKey]).forEach(key => {
    subCat[key] = catKey + '.' + key
  })

  if (idx === 0) {
    TRANSLATION_MAP = {}
  }

  TRANSLATION_MAP[catKey] = subCat
})
export { TRANSLATION_MAP as T }
////////////////////////////////////////////////////

export const __ = (...args) => i18n.t(...args)

export const changeLanguage = locale => {
  i18n.locale = locale
}

export default i18n
