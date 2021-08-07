import styled from 'styled-components/native'
import { colors } from '../../../utils'

export const Container = styled.TouchableOpacity`
    background-color: ${colors.WHITE};
    margin: 8px 0 8px 0;
    padding: 20px;
    border-radius: 8px;
`

export const PatientNameText = styled.Text`
    font-size: 20px;
    color: ${colors.BLACK};
    font-weight: bold;
    margin-bottom: 8px;
`
export const PhysicianNameText = styled.Text`
    font-size: 16px;
    color: ${colors.MEDIUM_GRAY};
    margin-bottom: 4px;
`

export const CRMText = styled.Text`
    font-size: 16px;
    color: ${colors.MEDIUM_GRAY};
`

export const BoldText = styled.Text`
    font-weight: bold;
`
