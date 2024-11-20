import { Image, ImageBackground, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { Theme } from "../Components/Theme";
import { AppButton } from "../Components/AppButton";
import { SafeAreaView } from "react-native-safe-area-context";

export function SignIn({ navigation }) {
    return (
        <View style={styles.container}>
            <ImageBackground source={require("../../assets/NG-flag.jpg")} style={{ width: "100%", height: 250, borderRadius: 10, }}>
                <SafeAreaView style={{ backgroundColor: "#00000094", flex: 1, justifyContent: "flex-end" }}>
                    <View style={{ marginLeft: 20 }}>
                        <Text style={[styles.header, { color: "white" }]}>Welcome Back</Text>
                        <Text style={[styles.text, { color: "white" }]}>Sign in to continue</Text>
                    </View>
                </SafeAreaView>
            </ImageBackground>

            <View style={{ marginTop: 30, padding: 20 }}>
                <Text style={styles.text}>Email Address</Text>
                <TextInput
                    placeholder="text@example.com"
                    style={styles.input}
                />

                <Text style={styles.text}>Password</Text>
                <TextInput
                    placeholder="Password123%#$"
                    style={styles.input}
                />

                <TouchableOpacity style={{ alignSelf: "flex-end", marginBottom: 15 }}>
                    <Text style={{ fontSize: 18, color: Theme.colors.primary, fontFamily: Theme.fonts.text700 }}>Forgotten Password?</Text>
                </TouchableOpacity>
                <AppButton onPress={() => navigation.navigate("HomeScreen")}>Sign In</AppButton>
            </View>
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white",
    },
    header: {
        fontSize: 30,
        fontFamily: Theme.fonts.text700
    },
    text: {
        fontSize: 16,
        fontFamily: Theme.fonts.text400,
        color: Theme.colors.light.text2
    },
    input: {
        borderWidth: 0.5,
        borderColor: Theme.colors.primary,
        marginBottom: 15,
        borderRadius: 20,
        padding: 10
    }
})