import { Alert, Image, ImageBackground, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { Theme } from "../Components/Theme";
import { AppButton } from "../Components/AppButton";
import { SafeAreaView } from "react-native-safe-area-context";
import { Formik } from "formik";
import * as yup from "yup";
import { useContext } from "react";
import { AppContext } from "../Components/globalVariables";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../Firebase/settings";

const validation = yup.object({
    email: yup.string().email().required(),
    password: yup.string().required().min(8).uppercase(),
})

export function SignIn({ navigation, route }) {
    const { setUserInfo, setPreloader, } = useContext(AppContext);

    // console.log(route.params);

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

            <Formik
                initialValues={{ email: "", password: "" }}
                onSubmit={(value, form) => {
                    signInWithEmailAndPassword(auth, value.email, value.password)
                        .then(() => {
                            setUserInfo(value)
                            form.resetForm()
                            navigation.navigate("HomeScreen")
                        })
                        .catch((error) => {
                            console.log(error);
                            Alert.alert("Error", error.code)
                        });
                }}
                validationSchema={validation}
            >
                {
                    (props) => {
                        return (
                            <View style={{ marginTop: 30, padding: 20 }}>
                                <Text style={styles.text}>Email Address</Text>
                                <TextInput
                                    placeholder="text@example.com"
                                    style={styles.input}
                                    onChangeText={props.handleChange("email")}
                                    value={props.values.email}
                                    autoCapitalize="none"
                                    autoCorrect={false}
                                />
                                <Text style={{ color: Theme.colors.red, marginLeft: 10, textAlign: "right" }}>{props.errors.email}</Text>

                                <Text style={styles.text}>Password</Text>
                                <TextInput
                                    placeholder="Password123%#$"
                                    style={styles.input}
                                    onChangeText={props.handleChange("password")}
                                    value={props.values.password}
                                    autoCapitalize="none"
                                    autoCorrect={false}
                                    autoComplete="off"
                                    secureTextEntry={true}
                                />
                                <Text style={{ color: Theme.colors.red, marginLeft: 10, textAlign: "right" }}>{props.errors.password}</Text>

                                <TouchableOpacity style={{ alignSelf: "flex-end", marginBottom: 15 }}>
                                    <Text style={{ fontSize: 18, color: Theme.colors.primary, fontFamily: Theme.fonts.text700 }}>Forgotten Password?</Text>
                                </TouchableOpacity>
                                <AppButton onPress={props.handleSubmit}>Sign In</AppButton>
                            </View>
                        )
                    }
                }
            </Formik>
            <View style={{ flex: 1, justifyContent: "flex-end", alignItems: "center", marginBottom: 30 }}>
                <TouchableOpacity onPress={() => navigation.navigate("SignUp")}>
                    <Text style={{ fontFamily: Theme.fonts.text400, fontSize: 16 }}>Don't have an account? <Text style={{ fontFamily: Theme.fonts.text700, color: Theme.colors.primary }}>Sign Up</Text></Text>
                </TouchableOpacity>
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
        color: Theme.colors.light.text2,
        marginTop: 10
    },
    input: {
        borderWidth: 0.5,
        borderColor: Theme.colors.primary,
        borderRadius: 20,
        padding: 10
    }
})