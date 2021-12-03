// import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Alert } from 'react-native';
import Loading from './Loading';
import Weather from './Weather';
import * as Location from "expo-location";
import axios from 'axios';

const API_KEY = "a2480605260152e9706f632b3ae57156";

export default class extends React.Component {
  state = {
    isLoading: true
  };

  getWeather = async(latitude, longitude) => {
    const { 
      data: {
        main: {temp},
        weather
      },
    } = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`
    )
    // console.log('data>', data)
    this.setState({ 
      isLoading: false, 
      condition: weather[0].main, 
      temp 
    });
  }

  getLocation = async () => {
    try {
      await Location.requestForegroundPermissionsAsync();
      const { coords
        // coords: { latitude, longitude }
      } = await Location.getCurrentPositionAsync();
      this.getWeather(coords.latitude, coords.longitude)
      this.setState({ isLoading: false });
      console.log('location>>', coords.latitude, coords.longitude);
    } catch (error) {
      Alert.alert("Can't find you.", "So sad");
    }
  };
  componentDidMount() {
    this.getLocation();
  }
  render() {
    const { isLoading, temp, condition } = this.state;
    return isLoading ? <Loading /> : <Weather temp={Math.round(temp)} condition={condition}/>;
  }
}
