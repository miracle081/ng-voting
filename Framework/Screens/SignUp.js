import { Alert, Image, ImageBackground, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { Theme } from "../Components/Theme";
import { AppButton } from "../Components/AppButton";
import { SafeAreaView } from "react-native-safe-area-context";
import { Formik } from "formik";
import * as yup from "yup";
import { useContext } from "react";
import { AppContext } from "../Components/globalVariables";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../Firebase/settings";
import { doc, setDoc } from "firebase/firestore";

const validation = yup.object({
    firstname: yup.string().min(2).required(),
    lastname: yup.string().min(2).required(),
    phone: yup.number().min(11).required(),
    address: yup.string().min(2).required(),
    email: yup.string()
        .email("Invalid email")
        .required("Email is required"),
    password: yup.string()
        .min(8, "Password must be at least 8 characters")
        .max(20, "Password must not exceed 20 characters")
        .required("Password is required"),

})

export function SignUp({ navigation, route }) {
    const { setUserInfo, setPreloader, setUserUID } = useContext(AppContext);

    // console.log(route.params);

    return (
        <View style={styles.container}>
            <ScrollView>
                <ImageBackground source={require("../../assets/NG-flag.jpg")} style={{ width: "100%", height: 250, borderRadius: 10, }}>
                    <SafeAreaView style={{ backgroundColor: "#00000094", flex: 1, justifyContent: "flex-end" }}>
                        <View style={{ marginLeft: 20 }}>
                            <Text style={[styles.header, { color: "white" }]}>Create An Account</Text>
                            <Text style={[styles.text, { color: "white" }]}>Join us and let your vote count</Text>
                        </View>
                    </SafeAreaView>
                </ImageBackground>

                <Formik
                    initialValues={{ firstname: "", lastname: "", phone: "", address: "", email: "", password: "" }}
                    onSubmit={(value, form) => {
                        setPreloader(true)
                        createUserWithEmailAndPassword(auth, value.email, value.password)
                            .then((data) => {
                                const { uid } = data.user;

                                setDoc(doc(db, "users", uid), {
                                    firstname: value.firstname,
                                    lastname: value.lastname,
                                    email: value.email,
                                    userUID: uid,
                                    balance: 0,
                                    cart: [],
                                    image: null,
                                    phone: value.phone,
                                    address: value.address,
                                    role: "user",
                                }).then((data) => {
                                    setPreloader(false)
                                    setUserUID(uid)
                                    form.resetForm()
                                    navigation.replace("HomeScreen")
                                }).catch(e => {
                                    setPreloader(false)
                                    console.log(e)
                                })
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
                                    <Text style={styles.text}>First name</Text>
                                    <TextInput
                                        placeholder="eg. Obi"
                                        style={styles.input}
                                        onChangeText={props.handleChange("firstname")}
                                        value={props.values.firstname}
                                    />
                                    <Text style={{ color: Theme.colors.red, marginLeft: 10, textAlign: "right" }}>{props.errors.firstname}</Text>

                                    <Text style={styles.text}>Last name</Text>
                                    <TextInput
                                        placeholder="eg. John"
                                        style={styles.input}
                                        onChangeText={props.handleChange("lastname")}
                                        value={props.values.lastname}
                                    />
                                    <Text style={{ color: Theme.colors.red, marginLeft: 10, textAlign: "right" }}>{props.errors.lastname}</Text>

                                    <Text style={styles.text}>Phone Number</Text>
                                    <TextInput
                                        placeholder="eg. 09087654643"
                                        style={styles.input}
                                        onChangeText={props.handleChange("phone")}
                                        value={props.values.phone}
                                        keyboardType="phone-pad"
                                    />
                                    <Text style={{ color: Theme.colors.red, marginLeft: 10, textAlign: "right" }}>{props.errors.phone}</Text>

                                    <Text style={styles.text}>Home Address</Text>
                                    <TextInput
                                        placeholder="eg. No. 52 Amino Kano road, Abuja"
                                        style={styles.input}
                                        onChangeText={props.handleChange("address")}
                                        value={props.values.address}
                                        autoCapitalize="none"
                                        autoCorrect={false}
                                    />
                                    <Text style={{ color: Theme.colors.red, marginLeft: 10, textAlign: "right" }}>{props.errors.address}</Text>

                                    <Text style={styles.text}>Email Address</Text>
                                    <TextInput
                                        placeholder="text@example.com"
                                        style={styles.input}
                                        onChangeText={props.handleChange("email")}
                                        value={props.values.email}
                                        autoCapitalize="none"
                                        autoCorrect={false}
                                        keyboardType="email-address"
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

                                    <View style={{ marginTop: 10 }}>
                                        <AppButton onPress={props.handleSubmit}>Sign Up</AppButton>
                                    </View>
                                </View>
                            )
                        }
                    }
                </Formik>
                <View style={{ flex: 1, justifyContent: "flex-end", alignItems: "center", marginBottom: 30 }}>
                    <TouchableOpacity onPress={() => navigation.navigate("SignIn")}>
                        <Text style={{ fontFamily: Theme.fonts.text400, fontSize: 16 }}>Have an account? <Text style={{ fontFamily: Theme.fonts.text700, color: Theme.colors.primary }}>Sign In</Text></Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
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
        // marginTop: 10
    },
    input: {
        borderWidth: 0.5,
        borderColor: Theme.colors.primary,
        borderRadius: 20,
        padding: 10
    }
})