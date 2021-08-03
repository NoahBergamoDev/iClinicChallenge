import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import React from 'react'
import { FC } from 'react'
import { useState } from 'react'
import { View, Text } from 'react-native'
import Button from '../../components/button/Button'
import Input from '../../components/input/Input'
import Title from '../../components/title/Title'
import { colors } from '../../utils/colors'

interface Props {
    navigation: any
}

const LoginScreen: FC<Props> = (props) => {

    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [errorMessage, setErrorMessage] = useState<string | null>(null)

    const login = () => {
        if (!email.length || !password.length) {
            setErrorMessage('Favor preencher os campos.')
            return
        }
        props.navigation.navigate('MainStack')
    }

    const handleInput = (text: string, state: string) => {
        setErrorMessage(null);
        switch (state) {
            case 'email':
                setEmail(text)
                break
            case 'password':
                setPassword(text)
                break
        }
    }

    return (
        <View style={{ flex: 1, marginHorizontal: 16, alignItems: 'center' }}>
            <Title text='Mobile Challenge' />
            <Input onChangeText={(text) => handleInput(text, 'email')} value={email} label='Login' keyboardType={'email-address'} />
            <Input onChangeText={(text) => handleInput(text, 'password')} value={password} label='Senha' secureTextEntry />
            {errorMessage != null && errorMessage != '' && <Text style={{ fontSize: 20, fontWeight: 'bold', color: colors.RED }}>{errorMessage}</Text>}
            <Button onPress={login} label='Login' />
        </View>
    )
}

export default LoginScreen
