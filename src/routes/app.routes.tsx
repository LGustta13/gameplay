// Arquivo dedicado para acessar rotas assim que o usuário é autenticado
// É basicamente a estrutura de telas
// Trabalhado no formato de pilha

import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import {Home} from '../screens/Home';
import {AppointmentDetails} from '../screens/AppointmentDetails';
import {AppointmentCreate} from '../screens/AppointmentCreate';

import { theme } from '../global/styles/theme';

// Desestruturando para o que me importa: navegação e tela
const {Navigator, Screen} = createStackNavigator();

export function AppRoutes(){
    return (
        <Navigator
            headerMode="none"
            screenOptions={{
                cardStyle:{
                    backgroundColor: theme.colors.secondary100
                }
            }}
        >
            <Screen
                name="Home"
                component={Home}
            />
            <Screen
                name="AppointmentDetails"
                component={AppointmentDetails}
            />
            <Screen
                name="AppointmentCreate"
                component={AppointmentCreate}
            />

        </Navigator>
    )
}