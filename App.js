import { StatusBar } from "expo-status-bar";
import React, { Component } from "react";

import { View, Text } from "react-native";

// v9 compat packages are API compatible with v8 code
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDezqY2qvY3Bpc3DJjlZLKjkB9e4m-hQ1E",
  authDomain: "instagram-dev-da1a7.firebaseapp.com",
  projectId: "instagram-dev-da1a7",
  storageBucket: "instagram-dev-da1a7.appspot.com",
  messagingSenderId: "780422316955",
  appId: "1:780422316955:web:dd95a3867acb095e28573e",
  measurementId: "G-LR4XPRE1W5"
};

if(firebase.apps.length === 0){
  firebase.initializeApp(firebaseConfig)
}

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import LandingScreen from "./components/auth/Landing"
import RegisterScreen from "./components/auth/Register"
import LoginScreen from "./components/auth/Login"



const Stack = createStackNavigator();
export class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: false,
    }
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged((user) => {
      if(!user) {
        this.setState({
          loggedIn: false,
          loaded: true,
        })
      }else {
        this.setState({
          loggedIn: true,
          loaded: true,
        })
      }
    })
  }

  render() {
    const { loggedIn, loaded } = this.state;
    if(!loaded){
      return(
        <View style={{ flex: 1, justifyContent: "center" }}>
          <Text>Loggin</Text>
        </View>
      )
    }
    if(!loggedIn) {
    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Landing">
          <Stack.Screen name="Landing" component={LandingScreen} options={{ headerShown: true}}/>
          <Stack.Screen name="Register" component={RegisterScreen} options={{ headerShown: true}}/>
          <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: true}}/>
        </Stack.Navigator>
      </NavigationContainer>
    );
    }

    return(
      <View style={{ flex: 1, justifyContent: "center" }}>
        <Text>User is logged in</Text>
      </View>
    )
  }
}

export default App