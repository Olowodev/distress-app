import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, SafeAreaView, Image, Button, TouchableOpacity } from 'react-native';

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <Image style={styles.image} source={require('./assets/logo.png')} />
      <StatusBar style="auto" />
      <View style={styles.buttons}>
        <TouchableOpacity style={styles.signUp}>
          <Text style={{color: '#fff', textAlign: 'center', fontSize: 24, fontWeight: '600'}}>Sign Up</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.logIn}>
          <Text style={{color: '#000', textAlign: 'center', fontSize: 24, fontWeight: '600'}}>Log In</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'flex-end',
    marginHorizontal: 35 
  },

  image: {
    position: 'absolute',
    top: '35%',
    alignSelf: 'center'
  },

  signUp: {
    padding: 18,
    backgroundColor: '#0079BE',
    borderRadius: 40
  },

  logIn: {
    padding: 18,
    backgroundColor: '#F0F0F0',
    borderRadius: 40,
    marginTop: 15,
    marginBottom: 20
  },
});
