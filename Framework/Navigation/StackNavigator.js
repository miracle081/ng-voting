import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { HomeScreen } from "../Screens/HomeScreen";
import { Intro } from "../Screens/Intro";
import { SignUp } from "../Screens/SignUp";
import { SignIn } from "../Screens/SignIn";
import { EditProfile } from "../Screens/EditProfile";
import { Pay } from "../Screens/Pay";
import { FundAccount } from "../Screens/FundAccount";
import { Vote } from "../Screens/Vote";


const Stack = createStackNavigator();

export function StackNavigator() {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="HomeScreen">
                <Stack.Screen name="HomeScreen" component={HomeScreen} options={{ headerShown: false }} />
                <Stack.Screen name="Intro" component={Intro} options={{ headerShown: false }} />
                <Stack.Screen name="SignUp" component={SignUp} options={{ headerShown: false }} />
                <Stack.Screen name="SignIn" component={SignIn} options={{ headerShown: false }} />
                <Stack.Screen name="EditProfile" component={EditProfile} options={{ headerShown: false }} />
                <Stack.Screen name="FundAccount" component={FundAccount} options={{ headerShown: false }} />
                <Stack.Screen name="Pay" component={Pay} options={{ headerShown: false }} />
                <Stack.Screen name="Vote" component={Vote} options={{ headerShown: false }} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}