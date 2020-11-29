import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider } from "react-redux";
import configureStore from "./src/store/configureStore";
import { Provider as PaperProvider, DefaultTheme } from "react-native-paper";
import useCachedResources from './src/hooks/useCachedResources';
import useColorScheme from './src/hooks/useColorScheme';
import Navigation from './src/navigation';


export const store = configureStore();


export default function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  const theme = {
    ...DefaultTheme,
    dark: colorScheme === "dark" ? true : false,
    mode: 'exact',
    roundness: 3,
    colors: {
      ...DefaultTheme.colors,
      primary: '#3498db',
      accent: '#f1c40f',
      text: colorScheme === "dark" ? "white" : "black"
    },
    
  };

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <Provider store={store}>
      <SafeAreaProvider>
      <PaperProvider theme={theme}>
        <Navigation colorScheme={colorScheme} />
        <StatusBar />
        </PaperProvider>
      </SafeAreaProvider>
      </Provider>
    );
  }
}