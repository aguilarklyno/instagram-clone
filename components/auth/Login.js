import React, { Component } from 'react'
import { View, Button, TextInput } from "react-native"

// v9 compat packages are API compatible with v8 code
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';


export class Login extends Component {
  constructor(props) {
    super(props);
    this.state= {
      email: "",
      password: "",
      name: "",
    }
    this.onSignUp = this.onSignUp.bind(this)
  }

  onSignUp(){
    const { email, password } = this.state;
    firebase.auth().signInWithEmailAndPassword(email, password)
    .then((result) => {
      console.log(result)
    })
    .catch((error) => {
      console.log(error)
    })
  }

  render() {
    return (
      <View>
        <TextInput
          placeholder = "email"
          onChangeText = {(email) => this.setState({ email })}
        />
        <TextInput
          placeholder = "password"
          secureTextEntry={true}
          onChangeText = {(password) => this.setState({ password })}
        />

        <Button
          onPress = {() => this.onSignUp()}
          title = "Log In"
        />
      </View>
    )
  }
}

export default Login