import { View, StyleSheet, Text, TouchableOpacity, Image, Modal, Pressable, ScrollView, RefreshControl, Alert } from "react-native";
import { Theme } from "../Components/Theme";
import { useContext, useEffect, useState } from "react";
import { formatMoney } from "../Components/FormatMoney";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faUserCircle, faUserEdit, faVoteYea, faXmark } from "@fortawesome/free-solid-svg-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { AppButton } from "../Components/AppButton";
import { AppContext } from "../Components/globalVariables";
import { addDoc, collection, doc, onSnapshot, orderBy, query, updateDoc, where } from "firebase/firestore";
import { db } from "../Firebase/settings";

export function Vote({ navigation }) {
    const { userUID, userInfo, setPreloader, selectedCandidate } = useContext(AppContext);
    const [modalVisibility, setModalVisibility] = useState(false);
    const [votedList, setvotedList] = useState([]);

    const closeModal = () => {
        setModalVisibility(!modalVisibility);
    };


    useEffect(() => {
        // setPreloader(false)
        // console.log(userInfo);
        const q = collection(db, 'votes');
        const filter = query(q, where('userUID', '==', userUID), where('year', '==', new Date().getFullYear()), where('position', '==', selectedCandidate.position));
        onSnapshot(filter, (snapShot) => {
            let data = [];
            snapShot.forEach((doc) => {
                data.push({ ...doc.data(), docID: doc.id })
            })
            setvotedList(data);
            setPreloader(false)
        });
    }, []);

    function handleVote() {
        setPreloader(true);
        addDoc(collection(db, "votes"), {
            candidateId: selectedCandidate.docID,
            name: `${selectedCandidate.firstname} ${selectedCandidate.lastname}`,
            userUID,
            dateCreated: Date.now(),
            year: new Date().getFullYear(),
            position: selectedCandidate.position,
        }).then(() => {
            if (votedList.length > 0) {
                return
            }
            updateDoc(doc(db, "candidates", selectedCandidate.docID), {
                votes: Number(selectedCandidate.votes) + 1
            }).then(() => {
                setPreloader(false);
                navigation.goBack()
                // Alert.alert(

                // )
            }).catch(() => {
                setPreloader(false);
                // Alert.alert(
                //     "Payment Status",
                //     `Something went wrong.`,
                //     [{ text: "Try Again", onPress: () => navigation.goBack() }]
                // )
            })
        }).catch(e => console.log(e))
    }



    const refreshControl = () => { }
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
            <ScrollView refreshControl={
                <RefreshControl refreshing={false} onRefresh={refreshControl} />
            } showsVerticalScrollIndicator={false}>
                <View style={styles.container}>
                    <View style={{ gap: 10, alignItems: "center" }}>
                        <Image style={{ width: 190, height: 190, borderRadius: 890, borderWidth: 0.4, borderColor: Theme.colors.gray }}
                            source={{ uri: selectedCandidate.image }} />

                        <Text style={{ fontSize: 22, fontFamily: Theme.fonts.text700 }}>{selectedCandidate.firstname} {selectedCandidate.lastname}</Text>
                        <Text style={{ fontSize: 15, fontFamily: Theme.fonts.text400, color: Theme.colors.light.text2 }}>{selectedCandidate.party}</Text>
                        <View style={{ flexDirection: "row", gap: 2, marginTop: 5 }}>
                            <FontAwesomeIcon icon={faVoteYea} size={20} color={Theme.colors.green} />
                            <Text style={{ fontSize: 14, fontFamily: Theme.fonts.text700, }}>{selectedCandidate.votes}</Text>
                        </View>
                    </View>

                    {votedList.length > 0 ?
                        <Text style={{ fontSize: 25, marginTop: 20, textAlign: "center", fontFamily: Theme.fonts.text700, color: Theme.colors.primary }}>Thank you for voting</Text>
                        :
                        <AppButton onPress={handleVote} style={{ marginTop: 10 }}>Vote</AppButton>
                    }
                </View>
            </ScrollView>
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