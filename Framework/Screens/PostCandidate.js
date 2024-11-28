import { Alert, Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { Theme } from "../Components/Theme";
import { AppButton } from "../Components/AppButton";
import { SafeAreaView } from "react-native-safe-area-context";
import { useContext, useState } from "react";
import { AppContext } from "../Components/globalVariables";
import { auth, db } from "../Firebase/settings";
import { addDoc, collection } from "firebase/firestore";


export function PostCandidate({ navigation, route }) {
    const { userUID, setPreloader, } = useContext(AppContext);
    const [image, setImage] = useState(null)
    const [firstname, setfirstname] = useState("");
    const [middlename, setmiddlename] = useState("");
    const [lastname, setlastname] = useState("");
    const [party, setparty] = useState("");
    const [position, setposition] = useState("");
    const [bio, setbio] = useState("");

    // console.log(route.params);

    function post() {
        setPreloader(true)
        addDoc(collection(db, "condidates"), {
            firstname,
            middlename,
            lastname,
            party,
            position,
            bio,
            image,
            votes: 0,
            datePosted: new Date().getTime(),
            year: new Date().getFullYear(),
            userUID,
        }).then(() => {
            setbio("")
            Alert.alert("Status", "Candidate posted successfully")
            setPreloader(false);
            navigation.navigate("HomeScreen", { screen: "Home" });
        }).catch(e => console.log(e))
    }

    return (
        <SafeAreaView style={{ backgroundColor: "#ffffff", flex: 1 }}>
            <View style={styles.container}>
                <ScrollView>
                    <View style={{ marginLeft: 20 }}>
                        <Text style={styles.header}>Post Candidate</Text>
                        <Text style={styles.text}>Add a Candidate that should be voted for!</Text>
                    </View>

                    <View style={{ marginTop: 30, padding: 20 }}>
                        <View style={{ flexDirection: 'row', justifyContent: "space-between", gap: 20 }}>
                            <View style={{ flex: 1 }}>
                                <Text style={styles.text}>Profile Image</Text>
                                <TextInput
                                    style={[styles.input, { borderRadius: 10 }]}
                                    onChangeText={img => setImage(img)}
                                    value={image}
                                    autoCapitalize="none"
                                    autoCorrect={false}
                                    keyboardType="url"
                                />
                            </View>
                            <Image source={{ uri: image || null }} defaultSource={require("../../assets/user.jpg")} style={{ width: 90, height: 90, borderRadius: 100, borderWidth: 1, borderColor: Theme.colors.gray, }} />
                        </View>

                        <Text style={styles.text}>First Name</Text>
                        <TextInput
                            style={styles.input}
                            onChangeText={inp => setfirstname(inp)}
                            value={firstname}
                        />

                        <Text style={styles.text}>Middle Name</Text>
                        <TextInput
                            style={styles.input}
                            onChangeText={inp => setmiddlename(inp)}
                            value={middlename}
                        />

                        <Text style={styles.text}>Last Name</Text>
                        <TextInput
                            style={styles.input}
                            onChangeText={inp => setlastname(inp)}
                            value={lastname}
                        />

                        <Text style={styles.text}>Party</Text>
                        <TextInput
                            style={styles.input}
                            onChangeText={inp => setparty(inp)}
                            value={party}
                        />

                        <Text style={styles.text}>Position</Text>
                        <TextInput
                            style={styles.input}
                            onChangeText={inp => setposition(inp)}
                            value={position}
                        />

                        <Text style={styles.text}>Bio</Text>
                        <TextInput
                            style={styles.input}
                            onChangeText={inp => setbio(inp)}
                            value={bio}
                            multiline={true}
                            numberOfLines={4}
                        />

                        <View style={{ marginTop: 20 }}>
                            <AppButton onPress={post}>Post Candidate</AppButton>
                        </View>
                    </View>
                </ScrollView>
            </View>
        </SafeAreaView>
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
        marginTop: 5
    },
    input: {
        borderWidth: 0.5,
        borderColor: Theme.colors.primary,
        borderRadius: 20,
        padding: 10
    }
})