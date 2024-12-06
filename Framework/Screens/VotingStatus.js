import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faIdCard, faVoteYea } from '@fortawesome/free-solid-svg-icons';
import { Theme } from '../Components/Theme';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AppContext } from '../Components/globalVariables';
import { Searchbar } from 'react-native-paper';
import { string } from 'yup';

export function VotingStatus({ navigation }) {
    const { setPreloader, candidates, searchQuery, setSearchQuery, setSelectedCandidate } = useContext(AppContext);

    function onSearch(inp) {
        const returnedItems = candidates.filter(item => String(`${item.firstname} ${item.lastname}`).toUpperCase().includes(inp) || String(item.party).toUpperCase().includes(inp))
        setSearchQuery(returnedItems)
    }


    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.header}>Voting Status</Text>

            <Searchbar
                placeholder="Search"
                onChangeText={inp => onSearch(inp.toUpperCase())}
                style={{ marginVertical: 10, backgroundColor: Theme.colors.primary + 10, borderWidth: 0.5, borderColor: Theme.colors.primary }}
            />

            <FlatList
                data={searchQuery}
                renderItem={({ item }) => (
                    <TouchableOpacity onPress={() => { setSelectedCandidate(item); navigation.navigate("Vote") }} style={styles.card}>
                        <Image source={{ uri: item.image }} style={styles.iconView} />
                        <View style={{ flex: 1 }}>
                            <Text style={styles.cardText}>{item.firstname} {item.lastname}</Text>
                            <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                                <Text numberOfLines={1} style={{ fontSize: 13, fontFamily: Theme.fonts.text400, color: Theme.colors.light.text2 }}>{item.party}</Text>
                                <View style={{ flexDirection: "row", gap: 2, marginTop: 5 }}>
                                    <FontAwesomeIcon icon={faVoteYea} size={20} color={Theme.colors.green} />
                                    <Text style={{ fontSize: 14, fontFamily: Theme.fonts.text700, }}>{item.votes}</Text>
                                </View>
                            </View>
                        </View>
                    </TouchableOpacity>
                )}
                keyExtractor={item => item.id}
            />

        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white",
        padding: 20
    },
    header: {
        fontSize: 25,
        fontFamily: Theme.fonts.text700
    },
    card: {
        borderRadius: 10,
        padding: 10,
        flexDirection: "row",
        gap: 10,
        alignItems: "center",
        backgroundColor: Theme.colors.primary + 10,
        marginTop: 10
    },
    iconView: {
        borderWidth: 0.2,
        borderColor: Theme.colors.primary,
        width: 60,
        height: 60,
        borderRadius: 50,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: Theme.colors.primary + 30,
    },
    cardText: {
        fontSize: 20,
        fontFamily: Theme.fonts.text700,
        color: Theme.colors.light.text1,
    }
});