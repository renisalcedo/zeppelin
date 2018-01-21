import { AsyncStorage } from 'react-native';

class Localdb {
  save(user) {
    const name = user.card.name
    const postalCode = user.postalCode
    const token = user.token

    AsyncStorage.setItem('name', name)
    AsyncStorage.setItem('postalCode', postalCode)
    AsyncStorage.setItem('token', token)
  }

  async getUser() {
    try {
      const data = {
        name: await AsyncStorage.getItem('name'),
        postalCode: await AsyncStorage.getItem('postalCode'),
        token: await AsyncStorage.getItem('token'),
      }

      return data
    }

    catch(err) {
      return err
    }
  }

}

export default Localdb
