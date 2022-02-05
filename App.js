/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
} from 'react-native';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

const Section = ({children, title}) => {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <View style={styles.sectionContainer}>
      <Text
        style={[
          styles.sectionTitle,
          {
            color: isDarkMode ? Colors.white : Colors.black,
          },
        ]}>
        {title}
      </Text>
      <Text
        style={[
          styles.sectionDescription,
          {
            color: isDarkMode ? Colors.light : Colors.dark,
          },
        ]}>
        {children}
      </Text>
    </View>
  );
};

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    flex:1,
    justifyContent:'center',
    alignItems:'center',
    
  };
  const googleSignIn = async () => {
    try {
      // let isSignedIn = await AsyncStorage.getItem('google_signin');

      // if (isSignedIn && isSignedIn == '1') {
      //   await GoogleSignin.revokeAccess();
      //   await GoogleSignin.signOut();
      //   await AsyncStorage.setItem('google_signin', '0');
      // }
      await GoogleSignin.configure({
        scopes: ['profile', 'email'],
        webClientId:
          '991585293270-mms02n6fofq3cvh1pfr31kog23mj1b53.apps.googleusercontent.com',
        //'540359121758-mvc1sikbrltfr0qofhkrq62f0db6tusm.apps.googleusercontent.com',
        offlineAccess: true,
      });


      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      console.log('userInfo',userInfo)
      //await AsyncStorage.setItem('google_signin', '1');
      const body = {
        email: userInfo.user.email,
        google_id: userInfo.user.id,
        type: 'google',
      };

      //dispatch(actions.loginUserRequest(body));
      // await GoogleSignin.revokeAccess();
      // await GoogleSignin.signOut();
     // await AsyncStorage.setItem('google_signin', '0');
    } catch (error) {
      alert(error)
      // if (error.code === statusCodes.SIGN_IN_CANCELLED) {
      //   console.log("google_login:1 ", error);
      //   // user cancelled the login flow
      // } else if (error.code === statusCodes.IN_PROGRESS) {
      //   console.log("google_login:2 ", error);
      //   // operation (e.g. sign in) is in progress already
      // } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
      //   console.log("google_login:3 ", error);
      //   // play services not available or outdated
      // } else {
      //   console.log("google_login:4 ", error.code);
      //   // some other error happened
      // }
    }
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
        <TouchableOpacity 
              onPress={()=>{
                    googleSignIn()
              }}
          style={{width:'50%',height:80,backgroundColor:'red',borderRadius:15,elevation:5,justifyContent:'center',alignItems:'center'}}>
            <Text style={{color:"#fff",fontSize:20,}}>Google Login</Text>
        </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
