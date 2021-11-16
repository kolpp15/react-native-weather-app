import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Alert } from 'react-native';
import Loading from './Loading';
import * as Location from "expo-location";

export default class extends React.Component {
  
  getLocation = async() => {
    try {
      await Location.requestPermissionsAsync();
      const location = await Location.getCurrentPositionAsync();
      console.log('this is the location>>', location);
    } catch (error) {
      Alert.alert("Can't find you.", "So sad!");
    }
  }
  
  componentDidMount() {
    this.getLocation();
  }

  render() {
    return <Loading />;
  }
}
