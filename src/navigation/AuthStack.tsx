import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { LoginScreen } from '../screens/'
import { navigationConstants } from './constants'

const AuthStack = createNativeStackNavigator()

const AuthStackComponent = () => {
    return (
        <AuthStack.Navigator screenOptions={{ headerShown: false }}>
            <AuthStack.Screen
                name={navigationConstants.SCREENS.LOGIN}
                component={LoginScreen}
            />
            <AuthStack.Screen
                name={navigationConstants.SCREENS.SIGN_UP}
                component={LoginScreen}
            />
        </AuthStack.Navigator>
    )
}

export default AuthStackComponent
