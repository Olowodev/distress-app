import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View, Keyboard, TouchableWithoutFeedback, KeyboardAvoidingView, Platform, ScrollView, ActivityIndicator } from 'react-native'
import React,{useState, useEffect} from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faArrowLeft, faSearch } from '@fortawesome/free-solid-svg-icons'
import { SignUpInputs } from '../data'
import * as Location from 'expo-location';
import { useSelector } from 'react-redux';
import { useDispatch } from "react-redux";
import { signup } from "../redux/apiCalls";
import * as Contacts from 'expo-contacts';
import Checkbox from 'expo-checkbox';
import { Toast } from 'react-native-toast-message'



function CheckboxComponent({contact, setChecked, checked, setSelectedContacts}) {
    const [clicked, setClicked] = useState(false);
    const {phoneNumbers, ...others} = contact;
    const number1 = Platform.OS === "ios" ? phoneNumbers[0].digits : phoneNumbers;
    const {name, ...moreOthers} = contact;
    const neededContact = {name, number: number1}

    const showToast = (type, text1, text2) => {
        Toast.show({
            type: type,
            text1: text1,
            text2: text2,
            visibilityTime: 6000,
        })
    }
    

    const Pressed = () => {
        if (checked < 5) {
            setClicked(!clicked);
            if (clicked == false) {
                setChecked(checked = checked + 1);
                setSelectedContacts(current => [...current, neededContact]);
            } else {
                setChecked(checked = checked - 1)
                setSelectedContacts(current => 
                    current.filter(selectedContact => {
                        return selectedContact != neededContact
                    }
                ))
            }
        } else {
            showToast("error", "You have selected 5 contacts")
            if (clicked == true) {
                setClicked(false);
                setChecked(checked = checked - 1);
                setSelectedContacts(current => 
                    current.filter(selectedContact => {
                        return selectedContact != neededContact
                    }))
            
        }
    }


    }

    return (
        
        <TouchableOpacity onPress={()=>Pressed()} style={{padding: 20, borderBottomWidth: 1, flexDirection: 'row', alignItems: 'center'}}>
            <Checkbox value={clicked}
        style={{ padding: 15, marginRight: 10, borderRadius: 50}} />  
            <Text style={{fontSize: 20}}>{contact.name}</Text>
        </TouchableOpacity>
    );
}


const SignUp = ({navigation}) => {
    const [location1, setLocation] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);
    const [shown, setShown] = useState(false);
    const [signedUp, setSignedUp] = useState(false);
    const [checked, setChecked] = useState(0)

    const [contacts, setContacts] = useState([]);
    const [selectedContacts, setSelectedContacts] = useState([]);
    const [values, setValues] = useState({
        fullname: '',
        email: '',
        password: '',
        confirmPassword: '',
        phoneNumber: ''
    });



    const isLoading = useSelector((state) => state.user.isFetching === null ? null : state.user.isFetching);

    

    const dispatch = useDispatch();

    useEffect(() => {
        (async () => {
            const {status} = await Contacts.requestPermissionsAsync();
            if (status === 'granted') {
                const {data} = await Contacts.getContactsAsync();

                if (data.length > 0) {
                    const contacts = data;
                    setContacts(contacts); 
                }
            }
        })();
    }, []);

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

    useEffect(() => {
        (async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                setErrorMsg('Permission to access location was denied');
                return;
            }

            let locationGeocode = await Location.getCurrentPositionAsync({});
            let convert = {
                "latitude": locationGeocode.coords.latitude,
                "longitude": locationGeocode.coords.longitude
            }
            try {
                let location = await Location.reverseGeocodeAsync(convert);
                setLocation(location);
            } catch (err) {
                console.log(err)
            } 
        })();
    }, []);

    let text = '';
    if (errorMsg) {
        text = errorMsg;
    } else if (location1) {
        text = location1[0].city;

        //console.log(text)
    }

    const continueButton = () => {
        signup(dispatch, {...values, location: text, closeContacts: selectedContacts});
        console.log(selectedContacts)
    }

    const showToast = (type, text1, text2) => {
        Toast.show({
            type: type,
            text1: text1,
            text2: text2,
            visibilityTime: 6000,
        })
    }
    

    const handleSubmit = (e) => {
        if (values.email.trim() === "" || values.fullname.trim() === "" || values.phoneNumber.trim() === "" || values.password.trim() === "" || values.confirmPassword.trim() === "") {
            setSignedUp(false);
            showToast("error", "Please fill in the empty fields")
        } else {
            setSignedUp(true)
        }
        //signup(dispatch,{...values, location: text})
        //navigation.navigate("SelectContacts")
    };

    

    

  return (
    <SafeAreaView>
        {signedUp === false ?
        <TouchableWithoutFeedback style={{flex: 1}} onPress={Keyboard.dismiss}>
        <View style={styles.signUp}>
            <View>
                <TouchableOpacity onPress={()=>navigation.goBack()}>
                    <FontAwesomeIcon style={{color: "#9dd0ff"}} size={28} icon={faArrowLeft} />
                </TouchableOpacity>
                {!shown ? <Image style={{alignSelf: "center"}} source={require("../assets/bro.png")} /> : null}
            </View>
            <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
            <View style={styles.inputCont}>
                <Text style={{color: "#005687", fontWeight: "600", fontSize: 32, lineHeight: 39}}>Sign Up</Text>
                <View style={styles.inputs}>
                    {SignUpInputs.map((input, index) => (
                        <View style={{flexDirection: "row", alignItems: "center", marginTop: 25}} key={index}>
                            <FontAwesomeIcon style={{marginRight: 10, color: "#0083ff"}} size={20} icon={input.icon} />
                            <TextInput {...input} onChangeText={text => setValues({...values, [input.name]: text})} value={input.name === "location" ? text : null} style={{borderBottomWidth: 1, flex: 1, borderColor: "#9dd0ff", paddingBottom: 5}} placeholder={input.placeHolder} />
                        </View>
                    ))}
                </View>
            </View>
            <View style={{marginTop: 20, color: "#727227"}}>
                <Text style={{textAlign: "center", fontSize: 13, color: '#727272'}}>By signing up you agree to our <Text style={{color: "#0079be", fontSize: 13,}}>Terms &amp; Conditions</Text> and <Text style={{fontSize: 13, color: "#0079be"}}>Privacy Policy</Text></Text>
            </View>
            <View>
                <TouchableOpacity onPress={()=>handleSubmit()} style={styles.button}>
                {isLoading === true ? <ActivityIndicator color='white' /> : <Text style={{textAlign: "center", color: "#fff", fontSize: 20, fontWeight: "600"}}>Sign up</Text>}
                </TouchableOpacity>
                <Text style={{textAlign: "center", color: "#727272", fontSize: 14}}>Joined us before? <Text onPress={()=>navigation.navigate("LogIn")} style={{color: "#0079be", fontSize: 14}}>Log In</Text></Text>
            </View>
            </KeyboardAvoidingView>
        </View>
        </TouchableWithoutFeedback>
        :
        <View style={styles.select}>

            <ScrollView>

            <View>
                <Text style={{fontSize: 22, textAlign: "center"}}>Select Up To 5 Close Contacts</Text>
            </View>
            <View style={{backgroundColor: "#f9fcff", alignItems: "center", flexDirection: "row", padding: 15, borderRadius: 50, marginTop: 15}}>
                <FontAwesomeIcon icon={faSearch} />
                <TextInput placeholder='search...' style={{flex: 1, paddingHorizontal: 5, fontSize: 16}}  />
            </View>
            {contacts.map((contact, index) => (
                <CheckboxComponent selectedContacts={selectedContacts} setSelectedContacts={setSelectedContacts} checked={checked} setChecked={setChecked} contact={contact} key={`contact-${index}`} />
            ))}
            
            
        
        </ScrollView>
        {checked > 2 ? <View style={{position: "absolute", bottom: 0, width: "100%"}}>
                <TouchableOpacity onPress={()=>continueButton()} style={styles.button1}>
                {isLoading === true ? <ActivityIndicator color='white' /> : <Text style={{textAlign: "center", color: "#fff", fontSize: 20, fontWeight: "600"}}>Continue</Text>}
                </TouchableOpacity>
                {/*<Text onPress={()=>navigation.navigate("Home")} style={{textAlign: "center", color: "#0079be", fontSize: 24}}>Skip for now</Text>*/}
            </View>: null}
        </View>
}
    </SafeAreaView>
    
  )
}

export default SignUp

const styles = StyleSheet.create({
    signUp: {
        marginHorizontal: 20,
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
      button1: {
        padding: 18,
        backgroundColor: '#0079BE',
        borderRadius: 40,
        marginVertical: 10,
        marginTop: 50
    },

    select: {
        marginHorizontal: 20,
        marginVertical: 10
    },
})