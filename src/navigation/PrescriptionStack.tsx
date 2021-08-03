import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import PrescriptionList from '../screens/precriptionList/PrescriptionList';
import { Text, TouchableOpacity } from 'react-native';
import AddEditPrescriptionScreen from '../screens/AddEditPrescriptionScreen/AddEditPrescriptionScreen';


const PrescriptionStack = createNativeStackNavigator();

const PrescriptionStackComponent = () => {

    return (
        <PrescriptionStack.Navigator >
            <PrescriptionStack.Screen
                name='PrescriptionList'
                component={PrescriptionList}
                options={({ navigation, route }) => ({
                    title: 'Prescrições',
                    headerRight: () => (
                        <TouchableOpacity onPress={() => navigation.navigate('AddEditPrescriptionScreen')}>
                            <Text>+ Incluir</Text>
                        </TouchableOpacity>
                    )
                })} />
            <PrescriptionStack.Screen
                name='AddEditPrescriptionScreen'
                component={AddEditPrescriptionScreen} />
        </PrescriptionStack.Navigator>
    )
}

export default PrescriptionStackComponent
