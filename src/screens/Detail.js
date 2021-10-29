import React,{useState, useEffect}from 'react'
import {SafeAreaView, View, Text,Image, Dimensions, StyleSheet,ActivityIndicator} from 'react-native'
import { valueSelected} from '../store/SelectedReducer'
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { CommonActions } from '@react-navigation/native';
import ScreenName from '../navigation/ScreenName';
import axios from 'axios'

const DetailScreen = () => {
    const [isLoading, setLoading] = useState(false)
    const [listData, setListData] = useState([])
    const value = useSelector(valueSelected)
    const urlGetData = 'https://www.breakingbadapi.com/api/characters/'
    const navigation = useNavigation();

    useEffect(() => {
        setLoading(true)
        setTimeout(() => {
            getData(() => setLoading(false))
         },1000);
    }, [])

    const getData = async (callback) => {
        console.log(value)
        const response = await axios.get(urlGetData+value)
        const { data, status } = response
        if (status === 200 && data[0]) {
            setListData(data[0] ?? [])
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
                    <Text style={styles.titleText}>{listData.name}</Text>
                </View>
                <View style={[styles.imageWrapper, {marginTop: 15}]}>
                    <Image source={{uri: listData.img}} style={styles.imageSize} />
                </View>
                <Text style={styles.nameText}>Nickname: {listData.nickname}</Text>
                <Text style={styles.nameText}>Date of Birth: {listData.birthday}</Text>
                <Text style={styles.nameText}>Occupation: {(listData.occupation == undefined ? "" : (listData.occupation.length > 1 ? listData.occupation.join(', ') : listData.occupation))}</Text>
                <Text style={styles.nameText}>Portrayed: {listData.portrayed}</Text>
                <Text style={styles.nameText}>Status: {listData.status}</Text>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    imageSize: {
        height: Dimensions.get('window').height / 2.5,
        width: Dimensions.get('window').height / 3,
        borderRadius: 15,
        overflow: 'hidden',
        padding: 10,
    },
    imageWrapper: {
        borderRadius: 15,
        marginBottom: 30,
    },
    titleText: {
        fontSize: 45,
        fontWeight: 'bold',
        marginTop: 10,
        marginBottom: 20
    },
    nameText: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
        textAlign: 'center'
    },
  });

export default DetailScreen