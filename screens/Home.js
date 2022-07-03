import { StyleSheet, Text, View, SafeAreaView, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome'
import {faPhone, faCircleUser} from '@fortawesome/free-solid-svg-icons'
import DropShadow from 'react-native-drop-shadow'
import * as SMS from 'expo-sms'

const Home = () => {

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
  return (
    <SafeAreaView>
        <View style={{marginHorizontal: 20, marginTop: 20}}>
            <Text style={{fontSize: 32, fontWeight: '600', color: '#005687'}}>WELCOME ADEBAYO</Text>
            <View style={{marginVertical: 50}}>
                <View style={{justifyContent: 'space-between', flexDirection: 'row'}}>
                    <TouchableOpacity style={{backgroundColor: '#fff000', borderRadius: 50, width: 100, height: 100}}></TouchableOpacity>
                    <TouchableOpacity style={{backgroundColor: '#ffa500', borderRadius: 50, width: 100, height: 100}}></TouchableOpacity>
                </View>
                <TouchableOpacity style={{backgroundColor: '#ff0000', borderRadius: 50, width: 100, height: 100, alignSelf: 'center'}}></TouchableOpacity>
            </View>
            <View>
                
                <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 18, backgroundColor: '#fff',  borderRadius: 20}}>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                        <FontAwesomeIcon style={{marginRight: 17}} size={40} icon={faCircleUser} />
                        <Text style={{fontSize: 22,}}>Adebayo</Text>
                    </View>
                    <View style={{alignItems: 'center'}}>
                        <FontAwesomeIcon color='#0079EB' size={18} icon={faPhone} />
                        <Text>Ping</Text>
                    </View>
                </View>
                
            </View>
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
    }
})