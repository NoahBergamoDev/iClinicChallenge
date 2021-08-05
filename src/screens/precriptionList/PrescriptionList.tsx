import React, { useEffect } from 'react'
import { useState } from 'react'
import { FC } from 'react'
import { View, Text, ListRenderItem, ActivityIndicator } from 'react-native'
import { FlatList } from 'react-native-gesture-handler'
import Button from '../../components/button/Button'
import Input from '../../components/input/Input'
import { navigationConstants } from '../../navigation/constants'
import { colors } from '../../utils/colors'
import PrescriptionListItem from './components/PrescriptionListItem'
import { getPrescriptions } from './services'
import { Prescription } from './types/PrescriptionTypes'

interface Props {
    navigation: any
}

interface ListItem {

}

const PrescriptionList: FC<Props> = (props) => {
    const [prescriptions, setPrescriptions] = useState<Prescription[]>([])
    const [filteredPrescriptions, setFilteredPrescriptions] = useState<Prescription[]>([])
    const [inputText, setInputText] = useState<string>('')
    const [currentPage, setCurrentPage] = useState<number>(0)
    const [maxPages, setMaxPages] = useState<number>(1)
    const [loading, setLoading] = useState<boolean>(false)

    useEffect(() => {
        fetchPrescriptions()
    }, [])

    const fetchPrescriptions = async function () {
        const nextPage = currentPage + 1;
        const response = await getPrescriptions(nextPage);
        if (response) {
            const newPrescription = [...prescriptions, ...response.data]
            setPrescriptions(newPrescription)
            if (response.meta.last_page != maxPages)
                setMaxPages(response.meta.last_page)
        }
        setCurrentPage(nextPage)
    }

    const goToDetails = (prescriptionId: number | undefined, crm: string | undefined) => {
        props.navigation.navigate(navigationConstants.SCREENS.PRESCRIPTION_DETAILS, { prescriptionId: prescriptionId, crm: crm })
    }

    const searchName = async () => {
        setLoading(true)
        if (inputText.trim() != '') {
            const response = await getPrescriptions(0, inputText);
            if (response) {
                setFilteredPrescriptions(response.data)
            }
        }
        setLoading(false)
    }

    const renderPrescriptionItem: ListRenderItem<Prescription> = ({ item }) => <PrescriptionListItem prescription={item} onPress={() => goToDetails(item.id, item?.physician?.crm)} />

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
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', paddingVertical: 4, height: 40 }}>
                    <Text style={{ color: colors.MEDIUM_GRAY }}>Esse é o final da lista de prescrições</Text>
                </View>)
        }
        if (inputText != '') return null

        return <ActivityIndicator size='small' color='red' />
    }

    return (
        <View style={{ flex: 1, justifyContent: 'center', padding: 20 }}>
            <View style={{ width: '100%', alignItems: 'center' }}>
                <Input label='Buscar' onChangeText={(text) => handleInput(text)} value={inputText} />
                <Button label='Buscar' onPress={searchName} loading={loading} disabled={loading} />
            </View>
            <FlatList
                data={filteredPrescriptions.length > 0 ? filteredPrescriptions : prescriptions}
                renderItem={renderPrescriptionItem}
                onEndReached={() => { if (currentPage < maxPages && inputText === '') fetchPrescriptions() }}
                onEndReachedThreshold={0.5}
                ListFooterComponent={renderListFooterComponent}
            />
        </View>
    )
}

export default PrescriptionList
