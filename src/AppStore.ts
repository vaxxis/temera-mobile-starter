import { changeLanguage } from '@config/i18n'
import Storage from '@utils/Storage'
import config from '@config/config'

class AppStore {
  user?: any = undefined // current logged user (if logged)
  accessToken?: string = undefined // access token to make any authenticated API calls
  selectedLanguage = config.LANGUAGES[0] // default: english

  async loadInitialData() {
    // retreview API access token && set for next API calls
    this.accessToken = await this.getAccessToken()

    // retrevie the saved language & change it in i18n
    const lang = await this.getSelectedLanguage()
    lang && changeLanguage(lang.shortCode)
  }

  async saveSelectedLanguage(language) {
    this.selectedLanguage = language
    return await Storage.save('@AppStore:selectedLanguage', language)
  }

  async getSelectedLanguage() {
    this.selectedLanguage = await Storage.load('@AppStore:selectedLanguage', this.selectedLanguage)
    return this.selectedLanguage
  }

  async setUser(user) {
    this.user = user
  }

  async logoutUser() {
    this.user = undefined
    this.accessToken = undefined
    await Storage.remove('@AppStore:accessToken')
  }

  async saveAccessToken(accessToken) {
    this.accessToken = accessToken
    Storage.save('@AppStore:accessToken', accessToken)
  }

  async getAccessToken() {
    this.accessToken = await Storage.load('@AppStore:accessToken', undefined)
    return this.accessToken
  }

  // WARNING! deletes all AsyncStorage data
  async clearAsyncStorage() {
    await Storage.purgeAllData()
  }
}

export default new AppStore()
