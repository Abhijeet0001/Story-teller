import * as React from "react"; 
import { View,Text, AsyncStorage } from "react-native";
import { NavigationContainer } from "@react-navigation/native"; 
import DrawerNavigator from "../navigation/DrawerNavigator"; 
import firebase from 'firebase'
import AppLoading from "expo-app-loading";
import * as Font from "expo-font";

let customFonts = {
  "Bubblegum-Sans": require("../assets/fonts/BubblegumSans-Regular.ttf")
};
export default class LoginScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          fontsLoaded: false
        };
      }
      async _loadFontsAsync() {
        await Font.loadAsync(customFonts);
        this.setState({ fontsLoaded: true });
      }
    
      componentDidMount() {
        this._loadFontsAsync();
      }
    
    isUserEqual=(googleUser, firebaseUser)=> {
        if (firebaseUser) {
          var providerData = firebaseUser.providerData;
          for (var i = 0; i < providerData.length; i++) {
            if (providerData[i].providerId === firebase.auth.GoogleAuthProvider.PROVIDER_ID &&
                providerData[i].uid === googleUser.getBasicProfile().getId()) {
              // We don't need to reauth the Firebase connection.
              return true;
            }
          }
        }
        return false;
      }
     onSignIn=(googleUser)=> {
        console.log('Google Auth Response', googleUser);
        // We need to register an Observer on Firebase Auth to make sure auth is initialized.
        var unsubscribe = firebase.auth().onAuthStateChanged((firebaseUser) => {
          unsubscribe();
          // Check if we are already signed-in Firebase with the correct user.
          if (!isUserEqual(googleUser, firebaseUser)) {
            // Build Firebase credential with the Google ID token.
            var credential = firebase.auth.GoogleAuthProvider.credential(
                googleUser.getAuthResponse().id_token,googleUser.accessToken);
      
            // Sign in with credential from the Google user.
            firebase.auth().signInWithCredential(credential)
            .then(function (result) {
                 if (result.additionalUserInfo.isNewUser) 
                 { firebase .database() 
                    .ref("/users/" + result.user.uid) 
                    .set({ gmail: result.user.email, profile_picture: result.additionalUserInfo.profile.picture, 
                        locale: result.additionalUserInfo.profile.locale, first_name: result.additionalUserInfo.profile.given_name,
                         last_name: result.additionalUserInfo.profile.family_name, current_theme: "dark" }) 
                         .then(function (snapshot) { }); } })
            .catch((error) => {
              // Handle Errors here.
              var errorCode = error.code;
              var errorMessage = error.message;
              // The email of the user's account used.
              var email = error.email;
              // The firebase.auth.AuthCredential type that was used.
              var credential = error.credential;
              // ...
            });
          } else {
            console.log('User already signed-in Firebase.');
          }
        });
      }
      
    signInWithGoogleAsync = async()=>{
      try{const result = await Google.logInAsync({
          behaviour:"web",
          androidClienId:"153601728634-reasbrka41p6g0tujjr21rudifqs2npd.apps.googleusercontent.com",
          iosClientId:"153601728634-e6u4oqe9vpa1ne3k2nr464s9c3d47smk.apps.googleusercontent.com",
          scopes:["profile","email"]
      })
    if(result.type==="success"){
       this.onSignIn(result)
        return result.accessToken
    }
else{
    return{cancelled:true}
}}
    
      catch(e){
          console.log(e.message)
          return{error:true}
      }
    }
    render(){
        if (!this.state.fontsLoaded) { 
            return <AppLoading />; } 
            else { 
                return ( <View style={styles.container}> 
                <SafeAreaView style={styles.droidSafeArea} /> <View style={styles.appTitle}>
                     <Image source={require("../assets/logo.png")} style={styles.appIcon} ></Image>
                      <Text style={styles.appTitleText}>{`Storytelling\nApp`}</Text> 
                      </View> 
                      </View> ); } }}