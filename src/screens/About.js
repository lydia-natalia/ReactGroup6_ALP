import React from 'react'
import {SafeAreaView, View, Text, StyleSheet} from 'react-native'

const AboutScreen = () => {
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