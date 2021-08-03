import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AuthStackComponent from './AuthStack';


const AppStack = createNativeStackNavigator();

const MainNavigator = () => {

    return (
        <NavigationContainer>
            <AppStack.Navigator screenOptions={{ headerShown: false }}>
                <AppStack.Screen name='AuthStack' component={AuthStackComponent} />
            </AppStack.Navigator>
        </NavigationContainer>
    )
}

export default MainNavigator
