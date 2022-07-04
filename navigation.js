import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StyleSheet } from 'react-native';
import Home from './screens/Home';
import Intro from './screens/Intro';
import LogIn from './screens/LogIn';
import SignUp from './screens/SignUp';
import { useSelector } from 'react-redux';

const Stack = createNativeStackNavigator();

export default function Navigation() {

    const user = useSelector((state) => state.user.user === null ? null : state.user.user);
  return (
        <NavigationContainer>
            <Stack.Navigator>
          {user === null ? (
            <>
            <Stack.Screen name="Intro" component={Intro} options={{headerShown: false}}/>
            <Stack.Screen name="SignUp" component={SignUp} options={{headerShown: false}}/>
            {/*<Stack.Screen name="SelectContacts" component={SelectContacts} options={{headerShown: false}}/>*/}
            <Stack.Screen name="LogIn" component={LogIn} options={{headerShown: false}}/>
          </>)
          :
          (
            <>
            <Stack.Screen name="Home" component={Home} options={{headerShown: false}}/>
          </>)}
          </Stack.Navigator>
        </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  
});
