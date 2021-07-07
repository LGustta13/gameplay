import React from 'react';
import { View, Text, Alert } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import { styles } from './styles';

import { Avatar } from '../Avatar';
import { useAuth } from '../../hooks/auth';

export function Profile(){

    // Para pegar informações do usuário já recebidas do disord, precisa do estado criado useAuth
    const {user, signOut} = useAuth();

    const textos = [
        "Hoje é dia de vitória ⚔️",
        "Dormir não dá XP 💰",
        "Se tiltar hoje é pior 😡",
        "Bora rushar que hoje tem!"
      ];
    
    const randomIndex = Math.floor(Math.random() * 4);

    function handleSignOut(){
        Alert.alert('Logout', 'Deseja sair do GamePlay?',
        [
            {
                text: 'Não',
                style: 'cancel'
            },
            {
                text: 'Sim',
                onPress: () => signOut()
            }
        ])
    }

    return (
        <View style={styles.container}>

            <RectButton onPress={handleSignOut}>
                <Avatar
                    urlImage={user.avatar}
                />
            </RectButton>

            <View>
                <View style={styles.user}>
                    <Text style={styles.greeting}>
                        Olá,
                    </Text>

                    <Text style={styles.username}>
                        {user.username}!
                    </Text>
                </View>

                <Text style={styles.message}>
                    {textos[randomIndex]}
                </Text>
            </View>
        </View>
    )
}