import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { HomeScreen } from "../Screens/HomeScreen";
import { Intro } from "../Screens/Intro";
import { SignUp } from "../Screens/SignUp";
import { SignIn } from "../Screens/SignIn";


const Stack = createStackNavigator();

export function StackNavigator() {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Intro" sc>
                <Stack.Screen name="HomeScreen" component={HomeScreen} options={{ headerShown: false }} />
                <Stack.Screen name="Intro" component={Intro} options={{ headerShown: false }} />
                <Stack.Screen name="SignUp" component={SignUp} />
                <Stack.Screen name="SignIn" component={SignIn} options={{ headerShown: false }} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}