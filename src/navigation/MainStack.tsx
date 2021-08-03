import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/home/HomeScreen';
import PrescriptionStackComponent from './PrescriptionStack';


const AuthStack = createNativeStackNavigator();

const AuthStackComponent = () => {

    return (
        <AuthStack.Navigator  screenOptions={{ headerShown: false }}>
            <AuthStack.Screen name='Home' component={HomeScreen} />
            <AuthStack.Screen name='PrescriptionStack' component={PrescriptionStackComponent} />
        </AuthStack.Navigator>
    )
}

export default AuthStackComponent
