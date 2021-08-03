import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../screens/login/LoginScreen';


const AuthStack = createNativeStackNavigator();

const AuthStackComponent = () => {

    return (
        <AuthStack.Navigator screenOptions={{ headerShown: false }}>
            <AuthStack.Screen name='Login' component={LoginScreen} />
            <AuthStack.Screen name='SignUp' component={LoginScreen} />
        </AuthStack.Navigator>
    )
}

export default AuthStackComponent
