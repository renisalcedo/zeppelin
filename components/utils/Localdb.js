import Storage from 'react-native-storage';
import { AsyncStorage } from 'react-native';
import React, {Component} from 'react'

function  loadUser(dbstorage) {
  console.log(dbstorage)

    storage.load({
    key: 'loginState',

    // autoSync(default true) means if data not found or expired,
    // then invoke the corresponding sync method
    autoSync: true,

    // syncInBackground(default true) means if data expired,
    // return the outdated data first while invoke the sync method.
    // It can be set to false to always return data provided by sync method when expired.(Of course it's slower)
    syncInBackground: true,

    // you can pass extra params to sync method
    // see sync example below for example
    syncParams: {
      extraFetchOptions: {
      // blahblah
      },

      someFlag: true,
    },

    }).then(ret => {
      // found data go to then()
      console.log(ret.userid);
      data = ret
    }).catch(err => {
      // any exception including data not found 
      // goes to catch()
      console.warn(err.message);
      switch (err.name) {
        case 'NotFoundError':
          console.log(err.name)
        break;
        case 'ExpiredError':
          console.log(err.name)
        break;
      }
    })
  }

module.exports = loadUser()
