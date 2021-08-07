import AsyncStorage from '@react-native-async-storage/async-storage'
import axios, { AxiosInstance } from 'axios'
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
            const refreshToken = await AsyncStorage.getItem('@refreshToken')
            console.log(refreshToken)
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

                return (
                    instance &&
                    instance(originalRequest)
                        .then(resp => console.log({ resp }))
                        .catch(error => console.log({ error }))
                )
            }
            return Promise.reject(error)
        }
    )
    return instance
}
