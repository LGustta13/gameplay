// As fontes serão sempre colocadas aqui pois o App.tsx é o primeiro arquivo aberto
// logo as fontes já serão carregadas
// useFonts: carregar fontes

import React from 'react';
import { StatusBar, LogBox } from 'react-native';
import { useFonts } from 'expo-font';
import AppLoading from 'expo-app-loading';
import { Background } from './src/components/Background';

import { 
  Inter_400Regular, 
  Inter_500Medium
} from '@expo-google-fonts/inter';
import { 
  Rajdhani_500Medium, 
  Rajdhani_700Bold 
} from '@expo-google-fonts/rajdhani';

import { Routes } from './src/routes';

import {AuthProvider} from './src/hooks/auth';

LogBox.ignoreLogs(['You are not currently signed in to Expo on your development machine.']);

export default function App(){

  // useFonts (estado) retorna um vetor com erro e um boleano indicando se carregou as fontes
  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Rajdhani_700Bold,
    Rajdhani_500Medium
  });

  // Se a fonte não carregar, a tela de splash é segurada
  if(!fontsLoaded){
    return <AppLoading/>
  }

  // statusBar foi colocado aqui para que em todas as telas possa ser visível
  // Status que fica na parte superior do celular
  return(
    <Background>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent={true}
      />
      
      <AuthProvider>
        <Routes/>
      </AuthProvider>
    </Background>   
  );
}
