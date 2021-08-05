import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AuthStackComponent from './AuthStack';
import MainStackComponent from './MainStack';
import { navigationConstants } from './constants';

const AppStack = createStackNavigator();

const MainNavigator = () => {

    return (
        <NavigationContainer>
            <AppStack.Navigator screenOptions={{ headerShown: false }} initialRouteName={navigationConstants.STACKS.MAIN}>
                <AppStack.Screen name={navigationConstants.STACKS.AUTH} component={AuthStackComponent} />
                <AppStack.Screen name={navigationConstants.STACKS.MAIN} component={MainStackComponent} />
            </AppStack.Navigator>
        </NavigationContainer>
    )
}

export default MainNavigator
