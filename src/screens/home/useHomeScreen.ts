import React, { useEffect } from 'react'
import { Platform } from 'react-native'
import { NavigationProp } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { errorHandler } from '../../api/api'
import { navigationConstants } from '../../navigation/constants'

export interface HomeScreenProps {
    navigation: NavigationProp<any>
}

interface Button {
    id: number
    label: string
    onPress: () => void
}

const useHomeScreen = (props: HomeScreenProps) => {
    const { navigation } = props

    useEffect(() => {
      verifyLogin()
  }, [])


  const logout = async () => {
      await AsyncStorage.clear()
      navigation.navigate(navigationConstants.STACKS.AUTH)
  }

    const buttons: Button[] = [
        {
            id: 0,
            label: '+ Prescrição (React Native)',
            onPress: () => navigation.navigate('PrescriptionStack'),
        },
        {
            id: 1,
            label: '+ Médico (Android Nativo)',
            onPress: () =>
                checkOSandNavigate(
                    navigationConstants.SCREENS.ADD_PHYSICIAN,
                    'android'
                ),
        },
        {
            id: 2,
            label: '+ Paciente (iOS Nativo)',
            onPress: () => checkOSandNavigate(null, 'ios'),
        }, //TODO: Call an iOS (Swift) screen
        { id: 3, label: 'Sair', onPress: logout },
    ]

    const verifyLogin = async () => {
        const isLoggedIn = (await AsyncStorage.getItem('@accessToken')) != null
        if (!isLoggedIn) navigation.navigate(navigationConstants.STACKS.AUTH)
    }
    const checkOSandNavigate = (routeName: string | null, os: string) => {
        const message = `Não é possível adicionar ${
            os === 'android' ? 'médicos' : 'pacientes'
        } em dispositivos diferentes de ${os}.`
        if (Platform.OS !== os) {
            errorHandler({
                title: 'Area restrita',
                message: message,
            })
            return
        }
        if (routeName) navigation.navigate(routeName)
    }

    return {
      buttons,
      
    }
}

export default useHomeScreen
