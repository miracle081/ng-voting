import { Dimensions, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Profile } from './Profile';
import { Theme } from '../Components/Theme';
import { Ionicons } from '@expo/vector-icons';
import { VotingStatus } from './VotingStatus';
import { SafeAreaView } from 'react-native-safe-area-context';
import Carousel from 'react-native-reanimated-carousel';
import { AppContext } from '../Components/globalVariables';
import { addDoc, collection, doc, getDoc, onSnapshot } from 'firebase/firestore';
import { db } from '../Firebase/settings';
import { PostCandidate } from './PostCandidate';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faVoteYea } from '@fortawesome/free-solid-svg-icons';

const carouselLinks = [
  "https://img.freepik.com/free-photo/back-view-woman-protesting-outdoors_23-2150246570.jpg?t=st=1732111039~exp=1732114639~hmac=37bbb0bbc65eeac8d84c17e65e6f263ed87df66162acfd14ec9b6d8c06fb7137&w=2000",
  "https://img.freepik.com/premium-photo/nigeria-flag-hand-dropping-ballot-card-into-box-voting-election-concept_764664-10129.jpg?ga=GA1.1.515862877.1732110330&semt=ais_hybrid",
  "https://img.freepik.com/free-photo/nigeria-flag-ruffled-beautifully-waving-macro-close-up-shot_1379-129.jpg?ga=GA1.1.515862877.1732110330&semt=ais_hybrid",
];

function Home() {
  const { userUID, setUserInfo, userInfo, setPreloader } = useContext(AppContext)
  const { width, height } = Dimensions.get("screen");
  const [candidates, setCandidates] = useState([])


  function getUserInfo() {
    setPreloader(true);
    // getDoc(doc(db, "users", userUID))
    //   .then((user) => {
    //     setUserInfo(user.data());
    //     setPreloader(false);
    //   })
    //   .catch(e => { setPreloader(false); console.log(e) });

    onSnapshot(doc(db, "users", userUID), (snapShot) => {
      setPreloader(false);
      snapShot.exists() ? setUserInfo(snapShot.data()) : null;
    });
  }

  const getCandidates = async () => {
    onSnapshot(collection(db, 'candidates'), (snapshot) => {
      const allData = []
      snapshot.forEach(item => {
        allData.push({ ...item.data(), docID: item.id })
      })
      setCandidates(allData);
      setPreloader(false)
      // console.log(allData);
    });
  };

  useEffect(() => {
    getUserInfo();
    getCandidates();

  }, [])


  return (
    <SafeAreaView style={{ backgroundColor: "white", flex: 1 }}>
      <View style={{ padding: 20, }}>
        <View style={{ flexDirection: "row", gap: 10 }}>
          <Image style={{ width: 50, height: 50, borderRadius: 50, borderWidth: 1, borderColor: Theme.colors.gray }}
            source={require("../../assets/user.png")} />
          <View style={{}}>
            <Text style={{ fontSize: 18, fontFamily: Theme.fonts.text700 }}>{userInfo.firstname} {userInfo.lastname}</Text>
            <Text style={{ fontSize: 13, fontFamily: Theme.fonts.text400, color: Theme.colors.gray }}>Secure voting...</Text>
          </View>
        </View>

        <View style={{ marginVertical: 10, }}>
          <Carousel
            loop
            width={width - 40}
            height={215}
            autoPlay={true}
            data={candidates}
            style={{ borderRadius: 10 }}
            scrollAnimationDuration={2000}
            renderItem={({ index }) => {
              let item = candidates[index]
              return (
                <View style={{ flexDirection: "row", gap: 20, borderWidth: 1, borderColor: Theme.colors.gray, padding: 10, borderRadius: 10 }}>
                  <Image style={{ width: 150, height: 150, borderRadius: 10, }} source={{ uri: item.image }} />
                  <View style={{ flex: 1, }}>
                    <Text style={{ fontSize: 20, fontFamily: Theme.fonts.text700 }}>{item.firstname} {item.lastname}</Text>
                    <Text style={{ fontSize: 14, fontFamily: Theme.fonts.text400, color: Theme.colors.gray }}>President</Text>
                    <Text style={{ fontSize: 14, fontFamily: Theme.fonts.text400, color: Theme.colors.gray }}>Party: {item.party}</Text>
                    <View style={{ flexDirection: "row", gap: 2, marginTop: 5 }}>
                      <FontAwesomeIcon icon={faVoteYea} size={20} color={Theme.colors.green} />
                      <Text style={{ fontSize: 14, fontFamily: Theme.fonts.text600, }}>{item.votes}</Text>
                    </View>
                    <Text numberOfLines={2} style={{ fontSize: 14, fontFamily: Theme.fonts.text400, color: Theme.colors.gray }}>{item.bio}</Text>
                  </View>
                </View>
              )
            }}
          />
        </View>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({});

const Tab = createBottomTabNavigator();
export function HomeScreen() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color }) => {
          let iconName;
          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          }

          else if (route.name === 'VotingStatus') {
            iconName = focused ? 'bar-chart' : 'bar-chart-outline';
          }

          else if (route.name === 'PostCandidate') {
            iconName = focused ? 'person-add' : 'person-add-outline';
          }
          else if (route.name === 'Profile') {
            iconName = focused ? 'person' : 'person-outline';
          }

          return <Ionicons name={iconName} size={24} color={color} />;
        },
        tabBarActiveTintColor: Theme.colors.primary,
        tabBarInactiveTintColor: Theme.colors.gray,
        headerShown: false,
      })}
    >
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="PostCandidate" component={PostCandidate} options={{ title: "Post Candidate" }} />
      <Tab.Screen name="VotingStatus" component={VotingStatus} options={{ title: "Voting Status" }} />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  );
}