import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { HomeScreen } from '../screens'
import PrescriptionStackComponent from './PrescriptionStack'
import AddPhysicianScreen from '../screens/AddPhysicianScreen/AddPhysicianScreen'
import { navigationConstants } from './constants'

const MainStack = createNativeStackNavigator()

const MainStackComponent = () => {
    return (
        <MainStack.Navigator screenOptions={{ headerShown: false }}>
            <MainStack.Screen name='Home' component={HomeScreen} />
            <MainStack.Screen
                name={navigationConstants.STACKS.PRESCRIPTION_STACK}
                component={PrescriptionStackComponent}
            />
            <MainStack.Screen
                name={navigationConstants.SCREENS.ADD_PHYSICIAN}
                component={AddPhysicianScreen}
                options={{headerShown: true, title: 'Cadastrar Médico'}}
            />
        </MainStack.Navigator>
    )
}

export default MainStackComponent
