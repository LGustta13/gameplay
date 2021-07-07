// Este index foi criado para possibilitar que cada usuário com determinada permissão
// possa acessar rotas específicas (comum, adm, especial)
// è basicamente o contexto da navegação
// Trabalhado pelo core do navigation

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';

import { AppRoutes } from './app.routes';
import { useAuth } from '../hooks/auth';

import { SignIn } from '../screens/SignIn';

export function Routes(){

    const {user} = useAuth();

    return(

        // A tag deve ser sempre usada pois é ela que associa as telas abertas anteriormente
        <NavigationContainer>
            { user.id ? <AppRoutes/> : <SignIn/>}
        </NavigationContainer>
    )
}