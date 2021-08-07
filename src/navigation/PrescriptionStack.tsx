import React from 'react'
import { Text, TouchableOpacity } from 'react-native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { navigationConstants } from './constants'
import {
AddEditPrescriptionScreen,
    PrescriptionDetail,
    PrescriptionList,
} from '../screens'

const PrescriptionStack = createNativeStackNavigator()

const PrescriptionStackComponent = () => {
    return (
        <PrescriptionStack.Navigator>
            <PrescriptionStack.Screen
                name={navigationConstants.SCREENS.PRESCRIPTION_LIST}
                component={PrescriptionList}
                options={({ navigation, route }) => ({
                    title: 'Prescrições',
                    headerRight: () => (
                        <TouchableOpacity
                            onPress={() =>
                                navigation.navigate('AddEditPrescriptionScreen')
                            }
                        >
                            <Text>+ Incluir</Text>
                        </TouchableOpacity>
                    ),
                })}
            />
            <PrescriptionStack.Screen
                name={navigationConstants.SCREENS.ADD_EDIT_PRESCRIPTION}
                component={AddEditPrescriptionScreen}
            />
            <PrescriptionStack.Screen
                name={navigationConstants.SCREENS.PRESCRIPTION_DETAILS}
                component={PrescriptionDetail}
                options={() => ({
                    title: 'Detalhes da Prescrição',
                })}
            />
        </PrescriptionStack.Navigator>
    )
}

export default PrescriptionStackComponent
