import { StackNavigator } from './Framework/Navigation/StackNavigator';
import { useCallback, useEffect, useState } from 'react';
import { PTSerif_400Regular, PTSerif_700Bold } from "@expo-google-fonts/pt-serif"
import * as SplashScreen from "expo-splash-screen";
import * as Font from "expo-font";

export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
    async function prepare() {
      try {
        await Font.loadAsync({ PTSerif_400Regular, PTSerif_700Bold });
        await new Promise(resolve => setTimeout(resolve, 2000));
      } catch (e) {
        console.warn(e);
      } finally {
        setAppIsReady(true);
      }
    }

    prepare();
  }, []);

  useCallback(async () => {
    if (appIsReady) {
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null;
  }

  return (
    <StackNavigator />
  );
}
