import React from 'react'
import { ActivityIndicator } from 'react-native'
import { colors } from '../../utils/'
import { ButtonContainer, ButtonText } from './style'

export type Props = {
    label: string
    onPress: () => void
    disabled?: boolean
    loading?: boolean
}

const Button: React.FC<Props> = ({
    onPress = () => {},
    label,
    disabled = false,
    loading = false,
}) => {
    return (
        <ButtonContainer
            disabled={disabled || loading}
            onPress={onPress}
            loading={loading}
        >
            {loading ? (
                <ActivityIndicator size='small' color={colors.WHITE} />
            ) : (
                <ButtonText>{label}</ButtonText>
            )}
        </ButtonContainer>
    )
}

export default Button
