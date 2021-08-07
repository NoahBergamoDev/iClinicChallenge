import React, { useEffect, FC, useState } from 'react'
import { FlatList, ListRenderItem, ActivityIndicator } from 'react-native'

import { Input, Button } from '../../components'
import PrescriptionListItem from './components/PrescriptionListItem'

import { getPrescriptions } from './services'
import { navigationConstants } from '../../navigation/constants'
import { colors } from '../../utils/'
import {
    Container,
    FooterContainer,
    FooterText,
    SearchContainer,
} from './styles'
import { Prescription } from '../../utils/types/Types'
import { NavigationProp, RouteProp } from '@react-navigation/native'

interface Props {
    navigation: NavigationProp<any>
    route: RouteProp<{ params: { deletedPrescription: number } }>
}

const PrescriptionListScreen: FC<Props> = ({ navigation, route }) => {
    const { params } = route
    const [prescriptions, setPrescriptions] = useState<Prescription[]>([])
    const [filteredPrescriptions, setFilteredPrescriptions] = useState<
        Prescription[]
    >([])
    const [inputText, setInputText] = useState<string>('')
    const [currentPage, setCurrentPage] = useState<number>(0)
    const [maxPages, setMaxPages] = useState<number>(1)
    const [loading, setLoading] = useState<boolean>(false)

    useEffect(() => {
        fetchPrescriptions()
    }, [])

    useEffect(() => {
        if (params) {
            const { deletedPrescription } = params
            if (params?.deletedPrescription) {
                onDeletePrescription(deletedPrescription)
            }
        }
    }, [params?.deletedPrescription])

    const fetchPrescriptions = async function () {
        const nextPage = currentPage + 1
        const response = await getPrescriptions(nextPage)
        if (response) {
            const newPrescription =
                nextPage === 1
                    ? response.data
                    : [...prescriptions, ...response.data]
            setPrescriptions(newPrescription)
            if (response.meta.last_page != maxPages)
                setMaxPages(response.meta.last_page)
        }
        setCurrentPage(nextPage)
    }

    const goToDetails = (prescriptionId: number, crm: string | undefined) => {
        navigation.navigate(navigationConstants.SCREENS.PRESCRIPTION_DETAILS, {
            prescriptionId: prescriptionId,
            crm: crm,
        })
    }

    const onDeletePrescription = (prescriptionId: number) => {
        const newPrescriptionArray = [...prescriptions]
        const index = newPrescriptionArray.findIndex(
            (p: Prescription) => prescriptionId === p.id
        )
        if (index >= 0) {
            newPrescriptionArray.splice(index, 1)
        }
        setPrescriptions(newPrescriptionArray)
    }

    const searchName = async () => {
        setLoading(true)
        if (inputText.trim() != '') {
            const response = await getPrescriptions(0, inputText)
            if (response) {
                setFilteredPrescriptions(response.data)
            }
        }
        setLoading(false)
    }

    const renderPrescriptionItem: ListRenderItem<Prescription> = ({ item }) => (
        <PrescriptionListItem
            prescription={item}
            onPress={() => goToDetails(item.id, item?.physician?.crm)}
        />
    )

    const handleInput = (text: string) => {
        setInputText(text)
        if (text == '') {
            setFilteredPrescriptions([])
        }
    }

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
