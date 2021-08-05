import AsyncStorage from '@react-native-async-storage/async-storage'
import { NavigationProp } from '@react-navigation/native'
import React, { useEffect } from 'react'
import { FC } from 'react'
import { View, Text } from 'react-native'
import Button from '../../components/button/Button'
import Title from '../../components/title/Title'
import { navigationConstants } from '../../navigation/constants'

interface Props {
    navigation: NavigationProp<any>
}

interface Button {
    id: number;
    label: string;
    onPress: () => void;
}

const HomeScreen: FC<Props> = ({ navigation }) => {

    useEffect(() => {
        verifyLogin()
    }, [])

    const logout = async () => {
        await AsyncStorage.clear();
        navigation.navigate(navigationConstants.STACKS.AUTH)
    }

    const verifyLogin = async () => {
        const isLoggedIn = await AsyncStorage.getItem('@accessToken') != null
        if (!isLoggedIn) navigation.navigate(navigationConstants.STACKS.AUTH)

    }
    const buttons: Button[] = [
        { id: 0, label: '+ Prescrição (React Native)', onPress: () => navigation.navigate('PrescriptionStack') },
        { id: 1, label: '+ Médico (Android Nativo)', onPress: () => { } },
        { id: 2, label: '+ Paciente (iOS Nativo)', onPress: () => { } },
        { id: 3, label: 'Sair', onPress: logout }
    ]

    return (
        <View style={{ flex: 1, alignItems: 'center' }}>
            <Title text='Mobile Challenge' />
            {buttons.map(button => <Button key={button.id} label={button.label} onPress={button.onPress} />)}

        </View>
    )
}

export default HomeScreen
