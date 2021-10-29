import React from 'react'
import {SafeAreaView, View, Text, StyleSheet} from 'react-native'

const DetailScreen = () => {
    return (
        <SafeAreaView style={{flex: 1}}>
            <View style={{flexGrow: 1}}>
                <View style={{ justifyContent: 'center', alignItems: 'center'}}>
                    <Text style={styles.titleText}>DETAIL</Text>
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

export default DetailScreen