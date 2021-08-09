import React, { FC } from 'react'
import { FlatList, ListRenderItem, ActivityIndicator } from 'react-native'

import { Input, Button } from '../../components'
import PrescriptionListItem from './components/PrescriptionListItem'
import { colors } from '../../utils/'
import {
    Container,
    FooterContainer,
    FooterText,
    SearchContainer,
} from './styles'
import { Prescription } from '../../utils/types/Types'
import usePrescriptionListScreen, {
    PrescriptionListScreenProps,
} from './usePrescriptionListScreen'

const PrescriptionListScreen: FC<PrescriptionListScreenProps> = props => {
    const {
        fetchPrescriptions,
        goToDetails,
        handleInput,
        searchName,
        currentPage,
        maxPages,
        inputText,
        loading,
        filteredPrescriptions,
        prescriptions,
    } = usePrescriptionListScreen(props)

    const renderPrescriptionItem: ListRenderItem<Prescription> = ({ item }) => (
        <PrescriptionListItem
            prescription={item}
            onPress={() => goToDetails(item.id, item?.physician?.crm)}
        />
    )

    const renderListFooterComponent: FC = () => {
        const isFinalPage = currentPage === maxPages
        if (isFinalPage) {
            return (
                <FooterContainer>
                    <FooterText>
                        Esse é o final da lista de prescrições
                    </FooterText>
                </FooterContainer>
            )
        }
        if (inputText != '') return null

        return <ActivityIndicator size='small' color={colors.PRIMARY_BLUE} />
    }
    return (
        <Container>
            <SearchContainer>
                <Input
                    label='Buscar'
                    onChangeText={text => handleInput(text)}
                    value={inputText}
                />
                <Button
                    label='Buscar'
                    onPress={searchName}
                    loading={loading}
                    disabled={loading}
                />
            </SearchContainer>
            <FlatList
                data={
                    filteredPrescriptions.length > 0
                        ? filteredPrescriptions
                        : prescriptions
                }
                renderItem={renderPrescriptionItem}
                extraData={
                    filteredPrescriptions.length > 0
                        ? prescriptions
                        : filteredPrescriptions
                }
                onEndReached={() => {
                    if (currentPage < maxPages && inputText === '')
                        fetchPrescriptions()
                }}
                onEndReachedThreshold={0.1}
                ListFooterComponent={renderListFooterComponent}
            />
        </Container>
    )
}

export default PrescriptionListScreen
