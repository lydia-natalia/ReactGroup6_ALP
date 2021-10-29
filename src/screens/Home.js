import React, {useState, useEffect} from 'react'
import {SafeAreaView, FlatList, TouchableOpacity, Dimensions, Image, View, Text, ActivityIndicator, StyleSheet, Alert} from 'react-native'
import axios from 'axios'
import { useNavigation } from '@react-navigation/native';
import ScreenName from '../navigation/ScreenName';
import { CommonActions } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { valueSelected } from '../store/SelectedReducer';
import SagaAction from '../saga/SagaAction';

const HomeScreen = () => {
    // const selectedCharacterId = useSelector((state) => state.character.selectedCharacterId);
    // // console.log(selectedCharacterId);
    // const dispatch = useDispatch();
    
    // const getCharacterDetail = (id) => {
    //     dispatch(changeSelectedCharacter(id));

    //     navigation.dispatch(CommonActions.navigate({
    //         name: ScreenName.DetailScreen
    //     }))
    // }

    const [isLoading, setLoading] = useState(false)
    const [isRefresh, setIsRefresh] = React.useState(false)
    const [listData, setListData] = useState([])
    const navigation = useNavigation();
    
    //const valueSelected = useSelector((state) => state.selected.value)
    
    const value = useSelector(valueSelected)
    const dispatch = useDispatch()

    const urlGetData = 'https://www.breakingbadapi.com/api/characters'

    useEffect(() => {
        setLoading(true)
        if(value != 0 && value != undefined){
            alert("Load Selected Data");
            navigation.dispatch(CommonActions.navigate({
                name: ScreenName.DetailScreen
            }))
        }
        getData(() => setLoading(false))
    }, [])

    const onRefresh = () => {
        setIsRefresh(true)
        getData(() => setIsRefresh(false))
    }

    const getData = async (callback) => {
        const response = await axios.get(urlGetData)
        const { data, status } = response
        if (status === 200 && data) {
            setListData(data ?? [])
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


    _onPress = (item) => {
        var id = item.char_id
        dispatch({ type: SagaAction.selected.SELECTED, id})
        navigation.dispatch(CommonActions.navigate({
            name: ScreenName.DetailScreen
        }))
    }

    renderItem = ({ item, index }) => {
        return (
            <TouchableOpacity onPress={() => _onPress(item)} style={{ justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
                <View style={[styles.imageWrapper, {marginTop: ((index == 0) ? 15 : 0)}]}>
                    <Image source={{uri: item.img}} style={styles.imageSize} />
                </View>
                <View>
                    <Text style={styles.nameText} >{item.name} <Text style={{color:"red"}}>{(value == item.char_id ? "SELECTED" : "")}</Text></Text> 
                </View>
            </TouchableOpacity>
        )
    }

    return (
        <SafeAreaView style={{flex: 1}}>
            <View style={{flexGrow: 1}}>
                <View style={{ justifyContent: 'center', alignItems: 'center'}}>
                    <Text style={styles.titleText}>BREAKING BAD</Text>
                </View>
                <FlatList
                    data={listData}
                    contentContainerStyle={{flex: 1}}
                    initialNumToRender={10}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.char_id}
                    onRefresh={onRefresh}
                    refreshing={isRefresh}
                />
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
        marginBottom: 10,
        elevation: 15
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
        marginBottom: 40
    },
  });

export default HomeScreen