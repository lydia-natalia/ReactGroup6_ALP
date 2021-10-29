import React, {useState, useEffect} from 'react'
import {SafeAreaView, View, Text, StyleSheet} from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import axios from 'axios'

const AboutScreen = () => {
    const selectedCharacterId = useSelector((state) => state.character.selectedCharacterId);
    const urlGetData = `https://www.breakingbadapi.com/api/characters/${selectedCharacterId}`
    console.log('SELECTED CHAR: ', selectedCharacterId)
    const [data, setData] = useState([])

    const response = axios.get(urlGetData)
        .then(res => {
            const data = res.data[0]
            setData(data)
            console.log('RESPONSE: ', data)
        })
    // const { data, status } = response
    // if (status === 200 && data[0]) {
    //     setListData(data[0] ?? [])
    //     console.log('SELECTED NAME: ', data[0])
    // }
    
    return (
        <SafeAreaView style={{flex: 1}}>
            <View style={{flexGrow: 1}}>
                <View style={{ justifyContent: 'center', alignItems: 'center'}}>
                    <Text style={styles.titleText}>ABOUT</Text>
                    <Text style={{fontSize:21, margin:10}}>
                        Breaking Bad is regarded as one of the greatest television series of all time, and with 16 Primetime Emmy Awards.
                        {"\n\n"}
                        This app is designed to make it easy for the viewer to know more about all characters.
                    </Text>
                    {data  && <Text style={styles.nameText}>Selected Character: {data.name}</Text>}
                </View>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    titleText: {
        fontSize: 45,
        fontWeight: 'bold',
        marginTop: 10,
        marginBottom: 20
    }
  });

export default AboutScreen