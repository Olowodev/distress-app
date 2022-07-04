import { StyleSheet, Text, View, SafeAreaView, Image, TouchableOpacity, ScrollView, TouchableWithoutFeedback } from 'react-native'
import React, { useEffect, useState } from 'react'
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome'
import {faPhone, faCircleUser, faSignOut, faCommentAlt} from '@fortawesome/free-solid-svg-icons'
import DropShadow from 'react-native-drop-shadow'
import * as SMS from 'expo-sms'
import Storage from '@react-native-async-storage/async-storage'
import * as Location from 'expo-location';
import * as Battery from 'expo-battery'
import { publicRequest } from "../requestMethods";
import { useSelector, useDispatch } from 'react-redux'
import { logout } from '../redux/apiCalls'



const Home = ({navigation}) => {

    const closeContacts = useSelector((state) => state.user.user === null ? null : state.user.user.closeContacts);
    const user = useSelector((state)=> state.user.user === null ? null : state.user.user);
    const dispatch = useDispatch();
    const [numbers, setNumbers] = useState([])

    useEffect(()=> {
        closeContacts.map((closeContact, index) => {
            setNumbers(current => [...current, closeContact.number])
        })
    }, [closeContacts])

    /*const redPressed = async () => {
        const isAvailable = SMS.isAvailableAsync();
        if (isAvailable) {
            const {result} = await SMS.sendSMSAsync(
                ['07459773774'],
                'sample text',
            );
            console.log(result)
        } else {
            console.log('no sms')
        }
    }*/
    const removeValue = async () => {
        logout(dispatch)
      }

    const [batteryLevel, setBatteryLevel] = useState(null);

    useEffect(() => {
        (async () => {

            let batteryLevel = await Battery.getBatteryLevelAsync();
            const percentBattery = batteryLevel * 100;
            const roundedBatteryLevel = Math.round(percentBattery);
            setBatteryLevel(roundedBatteryLevel)
        })();
    }, []);

    const [location, setLocation] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);

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
    } else if (location) {
        text = `${location[0].name}, ${location[0].city}`;
    }

    
    const pressed = async (color) => {
        try{
            const res = await publicRequest.post('/distress/sms', {color: color, name: user.fullname, numbers: numbers, battery: batteryLevel, location: text})
        }catch(err){
            console.log(err.response.data)
        }
    }

    const ping = async (closeContact) => {
        try {
            const res = await publicRequest.post('distress/call-single', {name: user.fullname, number: closeContact.number, battery: batteryLevel, location: text})
        } catch (err) {
            console.log(err)
        }
    }   
    
    const message = async (closeContact) => {
        try {
            const res = await publicRequest.post('distress/sms-single', {name: user.fullname, number: closeContact.number, battery: batteryLevel, location: text})
        } catch (err) {
            console.log(err)
        }
    }
  return (
    <SafeAreaView>
        <View style={{marginHorizontal: 20, marginTop: 20}}>
            <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
                <Text style={{fontSize: 28, fontWeight: '600', color: '#005687'}}>Welcome {user.fullname.split(' ')[0]}</Text>
                <TouchableOpacity onPress={()=>removeValue()}>
                    <FontAwesomeIcon size={28} color="#005687" icon={faSignOut} />
                </TouchableOpacity>
            </View>
            <View style={{marginVertical: 50}}>
                <View style={{justifyContent: 'space-between', flexDirection: 'row'}}>
                    <TouchableOpacity onPress={()=>pressed("yellow")} style={{backgroundColor: '#fff000', borderRadius: 50, width: 100, height: 100}}></TouchableOpacity>
                    <TouchableOpacity onPress={()=>pressed("orange")} style={{backgroundColor: '#ffa500', borderRadius: 50, width: 100, height: 100}}></TouchableOpacity>
                <TouchableOpacity onPress={()=>pressed('RED')} style={{backgroundColor: '#ff0000', borderRadius: 50, width: 100, height: 100, alignSelf: 'center'}}></TouchableOpacity>
                </View>
            </View>
            <ScrollView>
                {closeContacts.map((closeContact, index)=> (
                    <View key={`close-${index}`} style={{flexDirection: 'row', marginTop: 20, justifyContent: 'space-between', alignItems: 'center', padding: 18, backgroundColor: '#fff',  borderRadius: 20}}>
                        <View style={{flexDirection: 'row', alignItems: 'center'}}>
                            <FontAwesomeIcon style={{marginRight: 17}} size={30} icon={faCircleUser} />
                            <Text style={{fontSize: 18,}}>{closeContact.name}</Text>
                        </View>
                        <View style={{alignItems: 'center', flexDirection: 'row'}}>
                            <TouchableOpacity onPress={()=>message(closeContact)} style={{marginHorizontal: 20, alignItems: 'center'}}>
                                <FontAwesomeIcon color='#0079EB' size={18} icon={faCommentAlt} />
                                <Text>Text</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={()=>ping(closeContact)} style={{alignItems: 'center'}}>
                                <FontAwesomeIcon color='#0079EB' size={18} icon={faPhone} />
                                <Text>Ping</Text>
                            </TouchableOpacity>
                            
                        </View>
                    </View>
                ))}
                
                
            </ScrollView>
            {/*<View style={{marginTop: 50, position: 'absolute', width: '100%', bottom: 0}}>
                <TouchableOpacity onPress={()=>removeValue()} style={styles.button}>
                    <Text style={{textAlign: "center", color: "#fff", fontSize: 20, fontWeight: "600"}}>Log Out</Text>
                </TouchableOpacity>
                </View>*/}
        </View>
    </SafeAreaView>
  )
}

export default Home

const styles = StyleSheet.create({
    shadow: {
        shadowColor: 'rgb(0, 0, 0)',
        shadowOffset: {width: 0, height: 10},
        shadowOpacity: 0.1,
        shadowRadius: 10
    },
    button: {
        padding: 18,
        backgroundColor: '#0079BE',
        borderRadius: 40,
        marginVertical: 10,
        marginTop: 50
    },
})