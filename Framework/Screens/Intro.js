import { Image, ImageBackground, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { AppButton } from '../Components/AppButton';

export function Intro({ navigation }) {

    const userID = "HJ7455DWwf6rsehOEcqKoWdV0WVQG34aCCMJvcFYTUuwS1r";

    return (
        <ImageBackground source={require("../../assets/intro.jpg")} style={{ width: "100%", height: "100%" }}>
            <View style={styles.container}>
                <View></View>
                <Text style={styles.header}>NG Voting</Text>
                <AppButton onPress={() => navigation.navigate("SignIn", userID)}>Get Started</AppButton>
            </View>
        </ImageBackground >
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "space-between",
        padding: 20,
        backgroundColor: "#00180082"
    },
    header: {
        fontSize: 30,
        textAlign: "center",
        fontWeight: "700",
        color: "white"
    }
});