import styled from 'styled-components/native'
import { colors } from '../../utils'

interface DropdownContainerProps {
    size: number
}

export const DropdownContainer = styled.View<DropdownContainerProps>`
    position: absolute;
    top: 75px;
    bottom: 0;
    width: 90%;
    height: ${(props: DropdownContainerProps) => `${50 * props.size}px`};
    max-height: 250px;
    background-color: ${colors.WHITE};
    z-index: 1;
    border-width: 1px;
    border-color: ${colors.LIGHT_GRAY};
    border-bottom-left-radius: 8px;
    border-bottom-right-radius: 8px;
`

export const DropdownItemContainer = styled.TouchableOpacity`
    height: 50px;
    justify-content: center;
`

export const Container = styled.View`
    width: 100%;
    align-items: center;
`

export const DropdownItemNameContainer = styled.View`
    padding: 16px;
    border-bottom-width: 1px;
    border-bottom-color: ${colors.LIGHT_GRAY};
    justify-content: center;
`

export const DropdownItemName = styled.Text`
    color: ${colors.DARK_GRAY};
    font-weight: bold;
`
