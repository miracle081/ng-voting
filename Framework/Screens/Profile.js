import { View, StyleSheet, Text, TouchableOpacity, Image, Modal, Pressable, ScrollView, RefreshControl } from "react-native";
import { Theme } from "../Components/Theme";
import { useEffect, useState } from "react";
import { formatMoney } from "../Components/FormatMoney";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faUserCircle, faUserEdit, faXmark } from "@fortawesome/free-solid-svg-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { AppButton } from "../Components/AppButton";

export function Profile({ navigation }) {
    // const { userInfo, setPreloader, } = useContext(AppContext);
    const [modalVisibility, setModalVisibility] = useState(false);

    const closeModal = () => {
        setModalVisibility(!modalVisibility);
    };


    useEffect(() => {
        // setPreloader(false)
        // console.log(userInfo);

    }, [])


    function logout() {
        // setPreloader(true)
        setTimeout(() => {
            // setPreloader(false)
            navigation.replace("Intro")
        }, 3000);
    }


    const refreshControl = () => { }
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
            <ScrollView refreshControl={
                <RefreshControl refreshing={false} onRefresh={refreshControl} />
            } showsVerticalScrollIndicator={false}>
                <View style={styles.container}>
                    <View style={{ flexDirection: "row", gap: 10 }}>
                        <Image style={{ width: 90, height: 90, borderRadius: 20, borderWidth: 1, borderColor: Theme.colors.gray }}
                            source={require("../../assets/user.jpg")} />

                        <View style={{ marginBottom: 10, }}>
                            <Text style={{ fontSize: 22, fontFamily: Theme.fonts.text700 }}>Benjamin Franklin</Text>
                            <Text style={{ fontSize: 15, fontFamily: Theme.fonts.text400, color: Theme.colors.light.text2 }}>ben@gmail.com</Text>
                            <TouchableOpacity onPress={() => navigation.navigate("EditProfile")}
                                style={{ padding: 5, marginTop: 0 }}>
                                <FontAwesomeIcon icon={faUserEdit} color={Theme.colors.primary} size={25} />
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={{ marginTop: 20, borderColor: Theme.colors.light.line, borderWidth: 0, borderRadius: 10, padding: 10 }}>
                        <Text style={{ fontSize: 15, fontFamily: Theme.fonts.text500, }}>Wallet Balance</Text>
                        <Text style={{ fontSize: 13, fontFamily: Theme.fonts.text700, }}>₦<Text style={{ fontSize: 30 }}>{formatMoney(98000)}</Text></Text>
                    </View>
                    <View style={{ flex: 1, marginTop: 10, paddingTop: 20, }}>


                    </View>

                    <View style={{ marginTop: 30 }}>
                        <AppButton onPress={closeModal} style={{ borderColor: Theme.colors.red, backgroundColor: "transparent", borderWidth: 1 }} textColor={Theme.colors.red}>Sign Out</AppButton>
                    </View>
                </View>
            </ScrollView>
            {/* logout  modal  */}

            <Modal
                visible={modalVisibility}
                animationType="slide"
                transparent={true}
            >
                <View style={{ flex: 1, backgroundColor: "rgba(0,0,0,0.8)" }}>
                    <Pressable style={{ flex: 1 }} onPress={closeModal} ></Pressable>
                    <View style={{ height: 200, backgroundColor: Theme.colors.light.bg, borderTopRightRadius: 20, borderTopLeftRadius: 20, justifyContent: "center" }}>
                        <Text style={{ fontSize: 16, fontFamily: Theme.fonts.text400, textAlign: "center" }}>Are you sure you want to log out?</Text>

                        <View style={{ marginTop: 20, margin: 15, }}>
                            <AppButton onPress={() => { closeModal(); logout() }} style={{ borderColor: Theme.colors.red, backgroundColor: "transparent", borderWidth: 1 }} textColor={Theme.colors.red}>Yes, Sign Out</AppButton>
                        </View>

                    </View>
                </View>
            </Modal>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // alignItems: 'center',
        padding: 20,
    },
    EditProfileBtn: {
        borderWidth: 1,
        paddingHorizontal: 20,
        padding: 10,
        borderRadius: 10,
        marginBottom: 20,
        marginTop: 10,
        // flex: 1,
        backgroundColor: Theme.colors.primary
    },
    ProfileBtn: {
        padding: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: "space-between",
        borderRadius: 10,
        marginBottom: 10,
        borderColor: Theme.colors.light.line,
        borderBottomWidth: 1
    },
})