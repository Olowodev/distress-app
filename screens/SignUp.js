import { Image, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons/faArrowLeft'
import { SignUpInputs } from '../data'

const SignUp = ({navigation}) => {
  return (
    <SafeAreaView>
        <View style={styles.signUp}>
            <View>
                <TouchableOpacity onPress={()=>navigation.goBack()}>
                    <FontAwesomeIcon style={{color: "#9dd0ff"}} size={28} icon={faArrowLeft} />
                </TouchableOpacity>
                <Image style={{alignSelf: "center"}} source={require("../assets/bro.png")} />
            </View>
            <View style={styles.inputCont}>
                <Text style={{color: "#005687", fontWeight: "600", fontSize: 32, lineHeight: 39}}>Sign Up</Text>
                <View style={styles.inputs}>
                    {SignUpInputs.map((input, index) => (
                        <View style={{flexDirection: "row", alignItems: "center", marginTop: 25}} key={index}>
                            <FontAwesomeIcon style={{marginRight: 10, color: "#0083ff"}} size={20} icon={input.icon} />
                            <TextInput style={{borderBottomWidth: 1, flex: 1, borderColor: "#9dd0ff", paddingBottom: 5}} placeholder={input.placeHolder} />
                        </View>
                    ))}
                </View>
            </View>
            <View style={{marginTop: 20, color: "#727227"}}>
                <Text style={{textAlign: "center", fontSize: 13, color: '#727272'}}>By signing up you agree to our <Text style={{color: "#0079be", fontSize: 13,}}>Terms &amp; Conditions</Text> and <Text style={{fontSize: 13, color: "#0079be"}}>Privacy Policy</Text></Text>
            </View>
            <View>
                <TouchableOpacity onPress={()=>navigation.navigate("SelectContacts")} style={styles.button}>
                    <Text style={{textAlign: "center", color: "#fff", fontSize: 20, fontWeight: "600"}}>Sign up</Text>
                </TouchableOpacity>
                <Text style={{textAlign: "center", color: "#727272", fontSize: 14}}>Joined us before? <Text onPress={()=>navigation.navigate("LogIn")} style={{color: "#0079be", fontSize: 14}}>Log In</Text></Text>
            </View>
        </View>
    </SafeAreaView>
    
  )
}

export default SignUp

const styles = StyleSheet.create({
    signUp: {
        marginHorizontal: 20
    },

    inputCont: {
        marginTop: 30,
    },

    button: {
        padding: 18,
        backgroundColor: '#0079BE',
        borderRadius: 40,
        marginVertical: 10
      },
})