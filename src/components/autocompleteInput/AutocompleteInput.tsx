import React, { useEffect } from 'react'
import { useState } from 'react'
import { FC } from 'react'
import { View, Text, TouchableOpacity, ScrollView } from 'react-native'
import { Patient, Physician } from '../../screens/precriptionList/types/PrescriptionTypes'
import { colors } from '../../utils/colors'
import Input from '../input/Input'

interface Props {
    label: string;
    inputText: string;
    data: (Patient | Physician)[];
    onSelect: (item: (Patient | Physician)) => void;
    disabled?: boolean
}

const AutocompleteInput: FC<Props> = (props) => {

    const [text, setText] = useState<string>('')
    const [expanded, setExpanded] = useState<boolean>(false)
    const [filteredData, setFilteredData] = useState<(Patient | Physician)[]>([])

    const { data, label, onSelect, disabled, inputText } = props;

    useEffect(() => {
        if (filteredData && filteredData.length > 0) {
            setExpanded(true)
        } else {
            setExpanded(false)
        }

    }, [text])

    useEffect(() => {
        setText(inputText);
    }, [inputText])

    const inputHandler = (_text: string) => {
        if (text.length > _text.length && _text.length > 0) {
            setExpanded(true)
        }
        setText(_text)
        filterData(_text)
    }

    const filterData = (text: string) => {
        const _filteredData: (Patient | Physician)[] = (data as Array<Patient | Physician>).filter((obj: Patient | Physician) => {
            const patient = obj as Patient;
            if (patient.id != undefined) {
                return patient.name.toLowerCase().includes(text.toLowerCase())
            } else {
                const physician = obj as Physician
                return physician.name.toLowerCase().includes(text.toLowerCase())
            }
        })
        setFilteredData(_filteredData);
    }

    const handleSelection = (item: (Patient | Physician)) => {
        setText(item.name)
        setFilteredData([])
        setExpanded(false)
        onSelect(item)
    }

    //TODO: FAZER  
    return (
        <View style={{ width: '100%', alignItems: 'center' }}>
            <Input label={label} onChangeText={inputHandler} value={text} flatBottom={expanded} disabled={data.length === 0 || disabled} />
            {
                expanded &&
                <View style={{ position: 'absolute', top: 75, bottom: 0, width: '90%', height: 50 * filteredData.length, maxHeight: 250, backgroundColor: colors.WHITE, zIndex: 1, borderWidth: 1, borderColor: colors.LIGHT_GRAY, borderBottomLeftRadius: 8, borderBottomRightRadius: 8 }} >
                    <ScrollView>
                        {filteredData?.map((item, index) =>
                            <TouchableOpacity key={`${item.id}${item.name}${index}`} style={{ height: 40, justifyContent: 'center' }} onPress={() => handleSelection(item)}>
                                <View style={{ flex: 1, marginHorizontal: 16, borderBottomWidth: 1, borderBottomColor: colors.MEDIUM_GRAY, justifyContent: 'center' }}>
                                    <Text>{item.name} </Text>
                                </View>
                            </TouchableOpacity>)}
                    </ScrollView>
                </View>
            }
        </View>
    )
}

export default AutocompleteInput
