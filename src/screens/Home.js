import React, {useState, useEffect} from 'react'
import {SafeAreaView, FlatList, TouchableOpacity, Dimensions, Image, View, Text, ActivityIndicator, StyleSheet} from 'react-native'
import axios from 'axios'

const HomeScreen = () => {
    const [isLoading, setLoading] = useState(false)
    const [isRefresh, setIsRefresh] = React.useState(false)
    const [listData, setListData] = useState([])

    const urlGetData = 'https://www.breakingbadapi.com/api/characters'

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
        alert(item);
    }

    renderItem = ({ item, index }) => {
        return (
            <TouchableOpacity onPress={() => _onPress(item)} style={{ justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
                <View style={[styles.imageWrapper, {marginTop: ((index == 0) ? 15 : 0)}]}>
                    <Image source={{uri: item.img}} style={styles.imageSize} />
                </View>
                <Text style={styles.nameText}>{item.name}</Text>
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