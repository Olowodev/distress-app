import { SafeAreaView, StyleSheet, Text, TextInput, TouchableHighlight, TouchableOpacity, View, FlatList, ScrollView } from 'react-native'
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome'
import {faSearch} from '@fortawesome/free-solid-svg-icons'
import React, { useEffect, useState } from 'react'
import * as Contacts from 'expo-contacts';

const SelectContacts = ({navigation}) => {
    

    const [contacts, setContacts] = useState([
        {
            name: "kini"
        },
        {
            name: "kini"
        },
        {
            name: "kini"
        },
        {
            name: "kini"
        },
        {
            name: "kini"
        },
        {
            name: "kini"
        },
        {
            name: "kini"
        },
        {
            name: "kini"
        },
        {
            name: "kini"
        },
        {
            name: "kini"
        },
        {
            name: "kini"
        },
        {
            name: "kini"
        },
        {
            name: "kini"
        },
        {
            name: "kini"
        },
        {
            name: "kini"
        },
        {
            name: "kini"
        },
        {
            name: "kini"
        },
        {
            name: "kini"
        },
        {
            name: "kini"
        },
        {
            name: "kini"
        },
        {
            name: "kini"
        },

        {
            name: "kini"
        },
        {
            name: "kini"
        },
        {
            name: "kini"
        },{
            name: "kini"
        },
        {
            name: "kini"
        },

    ]);

    useEffect(() => {
        (async () => {
            const {status} = await Contacts.requestPermissionsAsync();
            if (status === 'granted') {
                const {data} = await Contacts.getContactsAsync({
                    fields: [Contacts.Fields.Emails],
                });

                if (data.length > 0) {
                    const contacts = data;
                    console.log(contacts);
                    //setContacts(contacts); 
                }
            }
        })();
    }, []);
  return (
    <SafeAreaView>
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
                <TouchableOpacity style={{padding: 20, borderBottomWidth: 1}} key={`contact-${index}`}>
                    <Text>{contact.name}</Text>
                </TouchableOpacity>
            ))}
            
            
        
        </ScrollView>
        <View style={{position: "absolute", bottom: 0, width: "100%"}}>
                <TouchableOpacity style={styles.button}>
                    <Text style={{textAlign: "center", color: "#fff", fontSize: 20, fontWeight: "600"}}>Continue</Text>
                </TouchableOpacity>
                <Text onPress={()=>navigation.navigate("Home")} style={{textAlign: "center", color: "#0079be", fontSize: 24}}>Skip for now</Text>
            </View>
        </View>
    </SafeAreaView>
  )
}

export default SelectContacts

const styles = StyleSheet.create({
    button: {
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