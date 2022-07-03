import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View, Image, TextInput } from 'react-native'
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome'
import {faArrowLeft} from '@fortawesome/free-solid-svg-icons'
import { LogInInputs } from '../data'
import React from 'react'

const LogIn = ({navigation}) => {
  return (
    <SafeAreaView>
        <View style={styles.logIn}>
            <View>
                <TouchableOpacity onPress={()=>navigation.goBack()}>
                    <FontAwesomeIcon style={{color: "#9dd0ff"}} size={32} icon={faArrowLeft} />
                </TouchableOpacity>
                <Image style={{alignSelf: "center"}} source={require("../assets/pana.png")} />
            </View>
            <View style={styles.inputCont}>
                <Text style={{color: "#005687", fontWeight: "600", fontSize: 32, lineHeight: 39}}>Log In</Text>
                <View style={styles.inputs}>
                    {LogInInputs.map((input, index) => (
                        <View style={{flexDirection: "row", alignItems: "center", marginTop: 50}} key={index}>
                            <FontAwesomeIcon style={{marginRight: 10, color: "#0083ff"}} size={20} icon={input.icon} />
                            <TextInput style={{borderBottomWidth: 1, flex: 1, borderColor: "#9dd0ff", paddingBottom: 10}} placeholder={input.placeHolder} />
                        </View>
                    ))}
                </View>
            </View>
            <View>
                <TouchableOpacity onPress={()=>navigation.navigate("Home")} style={styles.button}>
                    <Text style={{textAlign: "center", color: "#fff", fontSize: 20, fontWeight: "600"}}>Log In</Text>
                </TouchableOpacity>
                <Text style={{textAlign: "center", color: "#727272", fontSize: 14}}>New to DISTRESS? <Text onPress={()=>navigation.navigate("SignUp")} style={{color: "#0079be", fontSize: 14}}>Sign Up</Text></Text>
            </View>
        </View>
    </SafeAreaView>
    
  )
}

export default LogIn

const styles = StyleSheet.create({
    button: {
        padding: 18,
        backgroundColor: '#0079BE',
        borderRadius: 40,
        marginVertical: 10,
        marginTop: 50
    },

    inputCont: {
        marginTop: 50,
    },

    logIn: {
        marginHorizontal: 20
    },
})