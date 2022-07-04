import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View, Image, TextInput, Keyboard, ActivityIndicator } from 'react-native'
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome'
import {faArrowLeft} from '@fortawesome/free-solid-svg-icons'
import { LogInInputs } from '../data'
import React,{useEffect, useState} from 'react'
import { useSelector } from 'react-redux';
import { useDispatch } from "react-redux";
import { login } from "../redux/apiCalls";




const LogIn = ({navigation}) => {

    const dispatch = useDispatch();


  const isLoading = useSelector((state) => state.user.isFetching === null ? null : state.user.isFetching);

  const [shown, setShown] = useState(false);
  const [values, setValues] = useState({
    fullname: '',
    location: '',
    email: '',
    password: '',
    confirmPassword: '',
    phoneNumber: ''
});


    useEffect(() => {
        const showSubscription = Keyboard.addListener("keyboardDidShow", () => {
          setShown(true);
        });
        const hideSubscription = Keyboard.addListener("keyboardDidHide", () => {
          setShown(false);
        });
    
        return () => {
          showSubscription.remove();
          hideSubscription.remove();
        };
      }, []);


    

    
    const handleSubmit = (e) => {
        login(dispatch,{...values})
    };

    

  return (
    <SafeAreaView>
        <View style={styles.logIn}>
            <View>
                <TouchableOpacity onPress={()=>navigation.goBack()}>
                    <FontAwesomeIcon style={{color: "#9dd0ff"}} size={32} icon={faArrowLeft} />
                </TouchableOpacity>
                {!shown ? <Image style={{alignSelf: "center"}} source={require("../assets/pana.png")} /> : null }
            </View>
            <View style={styles.inputCont}>
                <Text style={{color: "#005687", fontWeight: "600", fontSize: 32, lineHeight: 39}}>Log In</Text>
                <View style={styles.inputs}>
                    {LogInInputs.map((input, index) => (
                        <View style={{flexDirection: "row", alignItems: "center", marginTop: 50}} key={index}>
                            <FontAwesomeIcon style={{marginRight: 10, color: "#0083ff"}} size={20} icon={input.icon} />
                            <TextInput onChangeText={text => setValues({...values, [input.name]: text})} style={{borderBottomWidth: 1, flex: 1, borderColor: "#9dd0ff", paddingBottom: 10}} placeholder={input.placeHolder} />
                        </View>
                    ))}
                </View>
            </View>
            <View>
                <TouchableOpacity onPress={()=>handleSubmit()} style={styles.button}>
                {isLoading === true ? <ActivityIndicator color="white" /> : <Text style={{textAlign: "center", color: "#fff", fontSize: 20, fontWeight: "600"}}>Log In</Text>}
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