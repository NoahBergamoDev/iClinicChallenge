import React, { FC, useEffect, useState } from 'react'
import { Button, Input, Title } from '../../components/'
import { ButtonContainer, Container } from './styles'
import { authenticate } from './services/services'
import Toast from 'react-native-toast-message'
import { errorHandler } from '../../api/api'
import { NavigationProp } from '@react-navigation/native'
import useLoginScreen from './useLoginScreen'

interface Props {
    navigation: NavigationProp<any>
}

const LoginScreen: FC<Props> = props => {
    const { email, handleInput, loading, login, password } =
        useLoginScreen(props)

    return (
        <Container>
            <Title text='Mobile Challenge' />
            <Input
                onChangeText={(text: string) => handleInput(text, 'email')}
                value={email}
                label='Login'
                keyboardType={'email-address'}
            />
            <Input
                onChangeText={(text: string) => handleInput(text, 'password')}
                value={password}
                label='Senha'
                secureTextEntry
            />
            <ButtonContainer>
                <Button onPress={login} label='Login' loading={loading} />
            </ButtonContainer>
        </Container>
    )
}

export default LoginScreen
