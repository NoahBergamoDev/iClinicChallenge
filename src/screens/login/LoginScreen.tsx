import React from 'react'
import { FC } from 'react'
import { useState } from 'react'
import { Button, Input, Title } from '../../components/'
import { Container, ErrorText } from './styles'
import { authenticate } from './services/services'

interface Props {
    navigation: any
}

const LoginScreen: FC<Props> = props => {
    const [email, setEmail] = useState<string>('unclebob@gmail.com')
    const [password, setPassword] = useState<string>('unclebob')
    const [errorMessage, setErrorMessage] = useState<string | null>(null)

    const login = async () => {
        if (!email.length || !password.length) {
            setErrorMessage('Favor preencher os campos.')
            return
        }
        const authenticatedUser = await authenticate(email, password)
        if (authenticatedUser) {
            props.navigation.navigate('MainStack')
        } else {
            setErrorMessage('Usuário e/ou senha inválidos')
        }
    }

    const handleInput = (text: string, state: string) => {
        setErrorMessage(null)
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
        <Container>
            <Title text='Mobile Challenge' />
            <Input
                onChangeText={text => handleInput(text, 'email')}
                value={email}
                label='Login'
                keyboardType={'email-address'}
            />
            <Input
                onChangeText={text => handleInput(text, 'password')}
                value={password}
                label='Senha'
                secureTextEntry
            />
            {errorMessage != null && errorMessage != '' && (
                <ErrorText>{errorMessage}</ErrorText>
            )}
            <Button onPress={login} label='Login' />
        </Container>
    )
}

export default LoginScreen
