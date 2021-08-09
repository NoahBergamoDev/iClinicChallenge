import { NavigationProp } from '@react-navigation/native'
import React, { useState } from 'react'
import { View, Text } from 'react-native'
import Toast from 'react-native-toast-message'
import { errorHandler } from '../../api/api'
import { authenticate } from './services/services'

interface LoginScreenProps {
    navigation: NavigationProp<any>
}

const useLoginScreen = (props: LoginScreenProps) => {
    const { navigation } = props

    const [email, setEmail] = useState<string>('unclebob@gmail.com')
    const [password, setPassword] = useState<string>('unclebob')
    const [loading, setLoading] = useState<boolean>(false)

    const login = async () => {
        setLoading(true)
        if (!email.length || !password.length) {
            errorHandler({})
            Toast.show({
                type: 'error',
                text1: 'Campos obrigatórios',
                text2: 'Favor preencher o Login e a Senha',
                autoHide: false,
            })
            setLoading(false)
            return
        }
        const authenticatedUser = await authenticate({ email, password })
        if (authenticatedUser) {
            navigation.navigate('MainStack')
        }
    }

    const handleInput = (text: string, state: string) => {
        switch (state) {
            case 'email':
                setEmail(text)
                break
            case 'password':
                setPassword(text)
                break
        }
    }

    return {
        email,
        password,
        loading,
        login,
        handleInput,
    }
}

export default useLoginScreen
