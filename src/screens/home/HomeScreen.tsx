import AsyncStorage from '@react-native-async-storage/async-storage'
import { NavigationProp } from '@react-navigation/native'
import React, { useEffect } from 'react'
import { FC } from 'react'
import { View } from 'react-native'
import { Button, Title } from '../../components'
import { navigationConstants } from '../../navigation/constants'

interface Props {
    navigation: NavigationProp<any>
}

interface Button {
    id: number
    label: string
    onPress: () => void
}

const HomeScreen: FC<Props> = ({ navigation }) => {
    useEffect(() => {
        verifyLogin()
    }, [])

    const logout = async () => {
        await AsyncStorage.clear()
        navigation.navigate(navigationConstants.STACKS.AUTH)
    }

    const verifyLogin = async () => {
        const isLoggedIn = (await AsyncStorage.getItem('@accessToken')) != null
        if (!isLoggedIn) navigation.navigate(navigationConstants.STACKS.AUTH)
    }
    const buttons: Button[] = [
        {
            id: 0,
            label: '+ Prescrição (React Native)',
            onPress: () => navigation.navigate('PrescriptionStack'),
        },
        { id: 1, label: '+ Médico (Android Nativo)', onPress: () => {} }, //TODO: Call an Android (Kotlin) screen
        { id: 2, label: '+ Paciente (iOS Nativo)', onPress: () => {} }, //TODO: Call an iOS (Swift) screen
        { id: 3, label: 'Sair', onPress: logout },
    ]

    return (
        <View
            style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
        >
            <Title text='Mobile Challenge' />
            {buttons.map(button => (
                <Button
                    key={button.id}
                    label={button.label}
                    onPress={button.onPress}
                />
            ))}
        </View>
    )
}

export default HomeScreen
