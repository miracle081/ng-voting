import { View } from 'react-native';
import { Intro } from './Framework/Screens/Intro';
import { StackNavigator } from './Framework/Navigation/StackNavigator';
import { NavigationContainer } from '@react-navigation/native';

export default function App() {
  return (
    <StackNavigator />
  );
}
