import AsyncStorage from '@react-native-async-storage/async-storage'
import axios, { AxiosError, AxiosInstance } from 'axios'
import Toast from 'react-native-toast-message'
import { authenticate } from '../screens/login/services/services'

let instance: AxiosInstance | null = null

const INITIAL_SETTINGS = {
    baseURL: 'https://iclinic-example-api-rest.herokuapp.com/',
    timeout: 15000,
    headers: { Accept: 'application/json' },
}

export const getApiInstance = async () => {
    if (instance) {
        return instance
    }
    instance = axios.create(INITIAL_SETTINGS)

    instance.interceptors.request.use(
        async config => {
            const accessToken = await AsyncStorage.getItem('@accessToken')
            config.headers = {
                Accept: 'application/json',
            }
            if (accessToken != null)
                config.headers.Authorization = `Bearer ${accessToken}`
            return config
        },
        error => {
            Promise.reject(error)
        }
    )

    instance.interceptors.response.use(
        response => {
            return response
        },
        async function (error) {
            const originalRequest = error.config
            console.log('INTERCEPTOR: ', { error })
            if (error.response.status === 401 && !originalRequest._retry) {
                originalRequest._retry = true
                const refreshToken = await AsyncStorage.getItem('@refreshToken')
                if (refreshToken) authenticate({ refreshToken })

                return instance && instance(originalRequest)
            }
            return Promise.reject(error)
        }
    )
    return instance
}

export const errorHandler = ({
    title,
    message,
    autoHide,
}: {
    title?: string
    message?: string
    autoHide?: boolean
}) => {
    Toast.show({
        type: 'error',
        text1: title || 'Houve um problema com a requisição',
        text2: `${
            message ||
            'Houve um erro inesperado, tente novamente em alguns instantes...'
        } `,
        autoHide,
    })
}
