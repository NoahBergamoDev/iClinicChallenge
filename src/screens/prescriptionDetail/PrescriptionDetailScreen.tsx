import React from 'react'
import { FC } from 'react'
import { View, Text } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import { Title, Button } from '../../components'
import { Container } from './styles'
import usePrescriptionDetailScreen, {
    PrescriptionDetailProp,
} from './usePrescriptionDetailScreen'

const PrescriptionDetailScreen: FC<PrescriptionDetailProp> = props => {
    const {
        crm,
        onDeletePress,
        patient,
        physician,
        text,
        onEditPress
    } = usePrescriptionDetailScreen(props)
    return (
        <Container>
            <ScrollView>
                <Title text='Médico' left />
                <Text>CRM: {crm.split('-')[1]}</Text>
                <Text>Nome: {physician?.name}</Text>

                <Title text='Paciente' left />
                <Text>Nome: {patient?.name}</Text>
                <Text>E-mail: {patient?.email}</Text>
                <Text>Telefone: {patient?.phone}</Text>

                <Title text='Descrição' left />
                <Text>{text}</Text>
            </ScrollView>
            <View style={{ alignItems: 'center' }}>
                <Button label='Alterar' onPress={onEditPress} />
                <Button label='Excluir' onPress={onDeletePress} />
            </View>
        </Container>
    )
}

export default PrescriptionDetailScreen
