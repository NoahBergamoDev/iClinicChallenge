import { useEffect, useState } from 'react'
import { Patient, Physician } from '../../utils/types/Types'

export interface AutoCompleteProps {
    label: string //Label
    inputText: string //Value
    data: (Patient | Physician)[] // Data array
    onSelect: (item: Patient | Physician) => void // Callback when selecting an item
    disabled?: boolean
}

const useAutoCompleteInput = (props: AutoCompleteProps) => {
    const { data, label, disabled } = props

    const [text, setText] = useState<string>('')
    const [expanded, setExpanded] = useState<boolean>(false)
    const [filteredData, setFilteredData] = useState<(Patient | Physician)[]>(
        []
    )

    //Everytime the text changes, verify if has filteredData to expand the component
    useEffect(() => {
        if (filteredData && filteredData.length > 0) {
            setExpanded(true)
        } else {
            setExpanded(false)
        }
    }, [text])

    //Everytime the value prop changes, set the new value
    useEffect(() => {
        setText(props.inputText)
    }, [props.inputText])

    //Handler of the input
    const inputHandler = (_text: string) => {
        if (text.length > _text.length && _text.length > 0) {
            setExpanded(true)
        }
        setText(_text)
        filterData(_text)
    }
    //Filter the data based on the text
    const filterData = (_text: string) => {
        const _filteredData: (Patient | Physician)[] = (
            props.data as Array<Patient | Physician>
        ).filter((obj: Patient | Physician) => {
            const patient = obj as Patient
            //Validate and filter if item is Patient
            if (patient.id != undefined) {
                return patient.name.toLowerCase().includes(_text.toLowerCase())
            } else {
                //Validate and filter if item is Physician
                const physician = obj as Physician
                return physician.name
                    .toLowerCase()
                    .includes(_text.toLowerCase())
            }
        })
        setFilteredData(_filteredData)
    }

    //Selection handler
    const handleSelection = (item: Patient | Physician) => {
        setText(item.name)
        setFilteredData([])
        setExpanded(false)
        props.onSelect(item)
    }

    return {
        data,
        label,
        disabled,
        text,
        expanded,
        filteredData,
        inputHandler,
        handleSelection,
    }
}

export default useAutoCompleteInput
