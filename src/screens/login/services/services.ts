import { errorHandler, getApiInstance } from '../../../api/api'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { ServicesConstants } from '../../../api/constants/constants'
import { AxiosResponse } from 'axios'

interface Body {
    grant_type: string
    client_id: number
    client_secret: string
    username?: string
    password?: string
    refresh_token?: string
}

export const authenticate = async ({
    email,
    password,
    refreshToken,
}: {
    email?: string
    password?: string
    refreshToken?: string
}) => {
    try {
        const api = await getApiInstance()

        const body: Body = {
            grant_type: refreshToken ? 'refresh_token' : 'password',
            client_id: 2,
            client_secret: 'xOjzZgqTuklsZFhQWnB1CdyCGX2kQOX8v7d21wVr',
        }
        if (email?.length && password?.length) {
            body.username = email
            body.password = password
        } else {
            body.refresh_token = refreshToken
        }
        const response: AxiosResponse = await api.post(
            ServicesConstants.URL.authenticate,
            body
        )

        if (response.status === 200) {
            AsyncStorage.setItem('@accessToken', response.data.access_token)
            AsyncStorage.setItem('@refreshToken', response.data.refresh_token)
            return response.data
        }
        return null
    } catch (e) {
        let message = ''
        if (e.response.status === 400) message = 'Usuário ou senha inválidos'
        errorHandler({ message })
        return null
    }
}
