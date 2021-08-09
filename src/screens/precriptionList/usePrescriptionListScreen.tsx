import { NavigationProp, RouteProp } from '@react-navigation/native'
import React, { useEffect, useState } from 'react'
import { View, Text, ListRenderItem } from 'react-native'
import { navigationConstants } from '../../navigation/constants'
import { Prescription } from '../../utils/types/Types'
import PrescriptionListItem from './components/PrescriptionListItem'
import { getPrescriptions } from './services'

export interface PrescriptionListScreenProps {
    navigation: NavigationProp<any>
    route: RouteProp<{ params: { deletedPrescription: number } }>
}

const usePrescriptionListScreen = (props: PrescriptionListScreenProps) => {
    const { route, navigation } = props
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

    const handleInput = (text: string) => {
        setInputText(text)
        if (text == '') {
            setFilteredPrescriptions([])
        }
    }

    return {
        goToDetails,
        handleInput,
        searchName,
        fetchPrescriptions,
        currentPage,
        maxPages,
        inputText,
        filteredPrescriptions,
        loading,
        prescriptions,
    }
}

export default usePrescriptionListScreen
