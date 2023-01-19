import React, { Component } from 'react'
import { View, Button, TextInput } from "react-native"

// v9 compat packages are API compatible with v8 code
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

export class Register extends Component {
  constructor(props) {
    super(props);
    this.state= {
      email: " ",
      password: " ",
      name: " ",
    }
    this.onSignUp = this.onSignUp.bind(this) // onSignUpをcluss Componet の外と接続する。
  }

  onSignUp(){
    const { email, password, name } = this.state;
    firebase.auth().createUserWithEmailAndPassword(email, password)
      .then((result) => {
        firebase.firestore().collection("users")
        .doc(firebase.auth().currentUser.uid)
        .set({
          userName: name,
          email: email
        })
        console.log(result)
      })
      .catch((error) => {
        console.log(error)
      })
  }
  // onSignUp関数：受け取った「email, password」を使ってcreateUserWithEmailAndPasswordでforebaseに登録する。

  render() {
    return (
      <View>
        <TextInput
          placeholder = "name"
          onChangeText = {(name) => this.setState({ name })}
        />
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
          title = "Sign Up"
        />
      </View>
    )
  }
}

export default Register