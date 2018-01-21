import { AsyncStorage } from 'react-native';

class Localdb {
  save(user) {
    const name = user.card.name
    const number = user.card.number
    const cvc = user.card.cvc
    const exp_month = user.card.exp_month
    const exp_year = user.card.exp_year

    AsyncStorage.setItem('name', name)
    AsyncStorage.setItem('number', number)
    AsyncStorage.setItem('cvc', cvc)
    AsyncStorage.setItem('exp_month', exp_month)
    AsyncStorage.setItem('exp_year', exp_year)
  }

  async getUser() {
    try {
      const data = {
        name: await AsyncStorage.getItem('name'),
        number: await AsyncStorage.getItem('number'),
        cvc: await AsyncStorage.getItem('cvc'),
        exp_month: await AsyncStorage.getItem('exp_month'),
        exp_year: await AsyncStorage.getItem('exp_year'),
      }

      return data
    }

    catch(err) {
      return err
    }
  }

}

export default Localdb
