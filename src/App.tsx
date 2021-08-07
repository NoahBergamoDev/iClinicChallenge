import React from 'react'
import MainNavigator from './navigation/MainNavigator'
import Toast from 'react-native-toast-message'

const App = () => {
    return (
        <>
            <MainNavigator />
            <Toast ref={ref => Toast.setRef(ref)} visibilityTime={5000} />
        </>
    )
}

export default App
