import AsyncStorage from '@react-native-async-storage/async-storage'
import { NavigationProp } from '@react-navigation/native'
import React, { useEffect } from 'react'
import { FC } from 'react'
import { Platform, View } from 'react-native'
import Toast from 'react-native-toast-message'
import { errorHandler } from '../../api/api'
import { Button, Title } from '../../components'
import { navigationConstants } from '../../navigation/constants'
import useHomeScreen, { HomeScreenProps } from './useHomeScreen'

interface Props {
    navigation: NavigationProp<any>
}

interface Button {
    id: number
    label: string
    onPress: () => void
}

const HomeScreen: FC<HomeScreenProps> = props => {
    const { buttons } = useHomeScreen(props)
    return (
        <View
            style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
        >
            <Title text='Mobile Challenge' />
            {buttons.map(button => (
                <Button
                    key={button.id}
                    label={button.label}
                    onPress={button.onPress}
                />
            ))}
        </View>
    )
}

export default HomeScreen
