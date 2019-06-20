import { AsyncStorage } from 'react-native'

class Storage {
  async save(key: string, data: any): Promise<void> {
    return AsyncStorage.setItem(key, JSON.stringify(data))
  }

  async load(key: string, defaultValue: any = undefined): Promise<any | undefined> {
    const data = await AsyncStorage.getItem(key)
    return data ? JSON.parse(data) : defaultValue
  }

  async remove(key: string): Promise<void> {
    return AsyncStorage.removeItem(key)
  }

  async purgeAllData(): Promise<void> {
    return AsyncStorage.clear()
  }
}

export default new Storage()
