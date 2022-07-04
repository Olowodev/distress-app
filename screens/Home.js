import { StyleSheet, Text, View,  TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome'
import { faCircleUser, faSignOut} from '@fortawesome/free-solid-svg-icons'
import * as Location from 'expo-location';
import * as Battery from 'expo-battery'
import { publicRequest } from "../requestMethods";
import { useSelector, useDispatch } from 'react-redux'
import { logout } from '../redux/apiCalls'
import Toast from 'react-native-toast-message'
import Animated from 'react-native-reanimated'
import ContactAction from '../components/ContactAction'
import { useSharedValue, useAnimatedStyle, withTiming, withRepeat, interpolate, Extrapolate, withDelay, Easing } from 'react-native-reanimated'
import { distressButtons } from '../data';


/*const Pulse = ({delay = 0, repeat}) => {
    const animation = useSharedValue(0);
    useEffect(() => {
        animation.value = withDelay(
            delay,
            withRepeat(
                withTiming(1, {
                    duration: 2000,
                    easing: Easing.linear,
                }),
                repeat ? -1 : 1,
                false
            )
        );
    }, []);
    const animatedStyles = useAnimatedStyle(() => {
        const opacity = interpolate(
            animation.value,
            [0, 1],
            [1, 0],
            Extrapolate.CLAMP
        );
        return {
            opacity: opacity,
            transform: [{ scale: animation.value}],
        };
    });
    return <Animated.View style={[styles.circle, animatedStyles]} />
};*/

function ButtonComponent({button, user, numbers, batteryLevel, text}) {
    const [distressLoading, setDistressLoading] = useState(false)


    const showToast = (type, text1, text2) => {
        Toast.show({
            type: type,
            text1: text1,
            text2: text2,
            visibilityTime: 6000,
        })
    }

    const pressed = async (color) => {
        setDistressLoading(true)
        try{
            const res = await publicRequest.post('/distress/sms', {color: color, name: user.fullname, numbers: numbers, battery: batteryLevel, location: text})
            .then(showToast('success', 'DISTRESS SENT'),
                setDistressLoading(false))
        }catch(err){
            console.log(err)
            showToast('error', 'DISTRESS MESSAGE NOT SENT')
            setDistressLoading(false)
        }
    }
    

    

    return (
        
        <View style={{position: 'relative', alignItems: 'center', justifyContent: 'center'}}>
            <TouchableOpacity onPress={()=>pressed(button.distressColor)} style={{backgroundColor: button.bgColor, borderRadius: 50, width: 100, height: 100, position: 'relative', zIndex: 10}}></TouchableOpacity>
            {distressLoading === true ? <ActivityIndicator style={{position: 'absolute', zIndex: 100}} color='black' />: null }
        </View>
    );
}



const Home = ({navigation}) => {

    const closeContacts = useSelector((state) => state.user.user === null ? null : state.user.user.closeContacts);
    const user = useSelector((state)=> state.user.user === null ? null : state.user.user);
    const dispatch = useDispatch();
    const [numbers, setNumbers] = useState([]);
    //const [pingLoading, setPingLoading] = useState(false)
    //const [messageLoading, setMessageLoading] = useState(false)
    const [batteryLevel, setBatteryLevel] = useState(null);
    const [location, setLocation] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);
    //const [pulse, setPulse] = useState([1]);

    useEffect(()=> {
        closeContacts.map((closeContact, index) => {
            setNumbers(current => [...current, closeContact.number])
        })
    }, [closeContacts]);

    useEffect(() => {
        (async () => {

            let batteryLevel = await Battery.getBatteryLevelAsync();
            const percentBattery = batteryLevel * 100;
            const roundedBatteryLevel = Math.round(percentBattery);
            setBatteryLevel(roundedBatteryLevel)
        })();
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

    const showToast = (type, text1, text2) => {
        Toast.show({
            type: type,
            text1: text1,
            text2: text2,
            visibilityTime: 6000,
        })
    }

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

    let text = '';
    if (errorMsg) {
        text = errorMsg;
    } else if (location) {
        text = `${location[0].name}, ${location[0].city}`;
    }


    const ping = async (closeContact) => {
        //setPingLoading(true)
        try {
            const res = await publicRequest.post('distress/call-single', {name: user.fullname, number: closeContact.number, battery: batteryLevel, location: text})
            .then(showToast('success', 'DISTRESS CALL SENT'))
            //setPingLoading(false)
            //console.log(pingLoading)
        } catch (err) {
            console.log(err)
            showToast('error', 'DISTRESS CALL NOT SENT')
            //setPingLoading(false)
        }
    }   
    
    const message = async (closeContact) => {
        //setMessageLoading(true)
        try {
            const res = await publicRequest.post('distress/sms-single', {name: user.fullname, number: closeContact.number, battery: batteryLevel, location: text})
            .then(showToast('success', 'DISTRESS MESSAGE SENT'))
            //setMessageLoading(false)
        } catch (err) {
            console.log(err)
            showToast('error', 'DISTRESS MESSAGE NOT SENT')
            //setMessageLoading(false)
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
                    {distressButtons.map((button, index) => (
                        <ButtonComponent user={user} batteryLevel={batteryLevel} text={text} numbers={numbers} button={button} key={index} />
                    ))}
                </View>
            </View>
            <ScrollView>
                {closeContacts.map((closeContact, index)=> (
                    <View key={`close-${index}`} style={{flexDirection: 'row', marginTop: 20, justifyContent: 'space-between', alignItems: 'center', padding: 18, backgroundColor: '#fff',  borderRadius: 20}}>
                        <View style={{flexDirection: 'row', alignItems: 'center'}}>
                            <FontAwesomeIcon style={{marginRight: 17}} size={30} icon={faCircleUser} />
                            <Text style={{fontSize: 18,}}>{closeContact.name}</Text>
                        </View>
                        <ContactAction message={message} closeContact={closeContact} ping={ping} />
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
    circle: {
        borderWidth: 4,
        width: 300,
        borderRadius: 150,
        height: 300,
        position:'absolute',
        borderColor: 'red',
        backgroundColor: 'red'
    }
})