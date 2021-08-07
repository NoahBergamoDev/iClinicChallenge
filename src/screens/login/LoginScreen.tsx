import React, { FC, useState } from 'react'
import { Button, Input, Title } from '../../components/'
import { ButtonContainer, Container } from './styles'
import { authenticate } from './services/services'
import Toast from 'react-native-toast-message'
import { errorHandler } from '../../api/api'

interface Props {
    navigation: any
}

const LoginScreen: FC<Props> = props => {
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
            props.navigation.navigate('MainStack')
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
            <ButtonContainer>
                <Button onPress={login} label='Login' loading={loading} />
            </ButtonContainer>
        </Container>
    )
}

export default LoginScreen
