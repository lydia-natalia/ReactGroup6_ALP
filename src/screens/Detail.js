import React, {useState, useEffect} from 'react'
import {SafeAreaView, FlatList, TouchableOpacity, Dimensions, Image, View, Text, ActivityIndicator, StyleSheet} from 'react-native'
import axios from 'axios'
import ScreenName from '../navigation/ScreenName'; 
import { useNavigation, CommonActions } from '@react-navigation/native'
import { useSelector, useDispatch } from 'react-redux'
import { changeSelectedCharacter } from '../store/CharacterReducer'


const DetailScreen = () => {
    const selectedCharacterId = useSelector((state) => state.character.selectedCharacterId);
    const dispatch = useDispatch();
    const [isLoading, setLoading] = useState(false)
    const [isRefresh, setIsRefresh] = React.useState(false)
    const [listData, setListData] = useState([])
    const navigation = useNavigation()

    const urlGetData = `https://www.breakingbadapi.com/api/characters/${selectedCharacterId}`

    useEffect(() => {
        setLoading(true)
        getData(() => setLoading(false))
    }, [])

    const onRefresh = () => {
        setIsRefresh(true)
        getData(() => setIsRefresh(false))
    }

    const getData = async (callback) => {
        const response = await axios.get(urlGetData)
        const { data, status } = response
        if (status === 200 && data[0]) {
            setListData(data[0] ?? [])
            callback()
        }
    }

    console.log(listData.img);

    if (isLoading) {
        return (
            <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}>
                <ActivityIndicator size='large' color='blue' />
            </View>
        )
    }

    _onPress = (item) => {
        alert(item);
    }

    return (
        <SafeAreaView style={{flex: 1}}>
            <View style={{flexGrow: 1, justifyContent: 'center', alignItems: 'center'}}>
                <View style={{ justifyContent: 'center', alignItems: 'center'}}>
                    <Text style={styles.titleText}>DETAIL</Text>
                </View>
                <View style={[styles.imageWrapper, {marginTop: 15}]}>
                    <Image source={{uri: listData.img}} style={styles.imageSize} />
                </View>
                <Text style={styles.nameText}>Name: {listData.name}</Text>
                <Text style={styles.nameText}>Nickname: {listData.nickname}</Text>
                <Text style={styles.nameText}>Date of Birth: {listData.birthday}</Text>
                <Text style={styles.nameText}>Status: {listData.status}</Text>
                <Text style={styles.nameText}>Portrayed: {listData.portrayed}</Text>
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