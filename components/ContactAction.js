import { StyleSheet, Text, View, TouchableOpacity, ActivityIndicator } from 'react-native'
import React from 'react'
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome'
import {faPhone, faCommentAlt} from '@fortawesome/free-solid-svg-icons'

const ContactAction = ({message, closeContact, ping}) => {
  return (
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
  )
}

export default ContactAction

const styles = StyleSheet.create({})