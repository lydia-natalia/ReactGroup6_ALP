import React,{useState, useEffect}from 'react'
import {SafeAreaView, View, Text, StyleSheet,ActivityIndicator} from 'react-native'
import { valueSelected} from '../store/SelectedReducer'
import { useSelector } from 'react-redux';
import axios from 'axios'

const DetailScreen = () => {
    const [isLoading, setLoading] = useState(false)
    const [data, setData] = useState([])
    const value = useSelector(valueSelected)
    console.log(value)
    const urlGetData = 'https://www.breakingbadapi.com/api/characters/'

    useEffect(() => {
        setLoading(true)
        setTimeout(() => {
            getData(() => setLoading(false))
         },1000);
    }, [])

    const getData = async (callback) => {
        const response = await axios.get(urlGetData+value)
        const { data, status } = response
        if (status === 200 && data) {
            setData(data ?? [])
            callback()
        }
    }

    if (isLoading) {
        return (
            <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}>
                <ActivityIndicator size='large' color='blue' />
            </View>
        )
    }

    return (
        <SafeAreaView style={{flex: 1}}>
            <View style={{flexGrow: 1, justifyContent: 'center', alignItems: 'center'}}>
                <View style={{ justifyContent: 'center', alignItems: 'center'}}>
                    <Text style={styles.titleText}>DETAIL</Text>
                </View>
                <View style={[styles.imageWrapper, {marginTop: 15}]}>
                    <Image source={{uri: data.img}} style={styles.imageSize} />
                </View>
                <Text style={styles.nameText}>Name: {data.name}</Text>
                <Text style={styles.nameText}>Nickname: {data.nickname}</Text>
                <Text style={styles.nameText}>Date of Birth: {data.birthday}</Text>
                <Text style={styles.nameText}>Status: {data.status}</Text>
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

export default DetailScreen