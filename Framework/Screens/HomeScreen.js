import { Dimensions, Image, StyleSheet, Text, View } from 'react-native'
import React, { useContext } from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Profile } from './Profile';
import { Theme } from '../Components/Theme';
import { Ionicons } from '@expo/vector-icons';
import { VotingStatus } from './VotingStatus';
import { SafeAreaView } from 'react-native-safe-area-context';
import Carousel from 'react-native-reanimated-carousel';
import { AppContext } from '../Components/globalVariables';

const carouselLinks = [
  "https://img.freepik.com/free-photo/back-view-woman-protesting-outdoors_23-2150246570.jpg?t=st=1732111039~exp=1732114639~hmac=37bbb0bbc65eeac8d84c17e65e6f263ed87df66162acfd14ec9b6d8c06fb7137&w=2000",
  "https://img.freepik.com/premium-photo/nigeria-flag-hand-dropping-ballot-card-into-box-voting-election-concept_764664-10129.jpg?ga=GA1.1.515862877.1732110330&semt=ais_hybrid",
  "https://img.freepik.com/free-photo/nigeria-flag-ruffled-beautifully-waving-macro-close-up-shot_1379-129.jpg?ga=GA1.1.515862877.1732110330&semt=ais_hybrid",
];

function Home() {
  const { userUID } = useContext(AppContext)
  const { width, height } = Dimensions.get("screen");

  return (
    <SafeAreaView style={{ backgroundColor: "white", flex: 1 }}>
      <View style={{ padding: 20, }}>
        <Text>HomeScreen</Text>
        <Text>User ID: {userUID}</Text>
        <View style={{ marginVertical: 10, }}>
          <Carousel
            loop
            width={width - 40}
            height={200}
            autoPlay={true}
            data={carouselLinks}
            style={{ borderRadius: 10 }}
            scrollAnimationDuration={2000}
            renderItem={({ index }) => (
              <Image style={{ width: '100%', height: 200, borderRadius: 10, }} source={{ uri: carouselLinks[index] }} />
            )}
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
      <Tab.Screen name="VotingStatus" component={VotingStatus} options={{ title: "Voting Status" }} />
      <Tab.Screen name="Profile" component={Profile} options={{ title: "Account" }} />
    </Tab.Navigator>
  );
}