import { AsyncStorage } from 'react-native';

class MapDB {
  save(flights) {
    AsyncStorage.setItem('flights', flights)
  }

  async getFlights() {
    try {
      const data = {
        flights: await AsyncStorage.getItem('flights'),
      }
      return data
    }

    catch(err) {
      return err
    }
  }

}

export default MapDB
