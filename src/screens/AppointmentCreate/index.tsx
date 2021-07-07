import React, { useState } from 'react';
import { Feather } from '@expo/vector-icons';
import { styles } from './styles';
import uuid from 'react-native-uuid';   
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

import { GuildIcon } from '../../components/GuildIcon';

import {
    View, 
    Text, 
    ScrollView,
    Platform,
    KeyboardAvoidingView,
} from 'react-native';

import {COLLECTION_APPOINTMENTS} from '../../configs/database';
import { Background } from '../../components/Background';
import { Header } from '../../components/Header';
import { theme } from '../../global/styles/theme';
import { CategorySelect } from '../../components/CategorySelect';
import { RectButton } from 'react-native-gesture-handler';
import { SmallInput } from '../../components/SmallInput';
import { TextArea } from '../../components/TextArea';
import { Button } from '../../components/Button';
import { ModalView } from '../../components/ModalView';

import { Guilds } from '../Guilds';
import { GuildProps } from '../../components/Guild';

export function AppointmentCreate(){

    const [category, setCategory] = useState('');
    const [openGuildsModal, setOpenGuildsModal] = useState(false);

    // useState<tipo>, mas começa como objeto vazio {} do tipo GuildProps
    const [guild, setGuild] = useState<GuildProps>({} as GuildProps);

    // Estados criados para pegar as informações colocadas pelo usuário
    const [day, setDay] = useState('');
    const [month, setMonth] = useState('');
    const [hour, setHour] = useState('');
    const [minute, setMinute] = useState('');
    const [description, setDescription] = useState('');

    const navigation = useNavigation();

    function handleOpenGuilds(){
        setOpenGuildsModal(true);
    }

    function handleCloseGuilds(){
        setOpenGuildsModal(false);
    }

    function handleCategorySelect(categoryId: string){
        setCategory(categoryId);
    }

    function handleGuildSelect(guildSelect: GuildProps){
        setGuild(guildSelect);
        setOpenGuildsModal(false);
    }

    async function handleSave(){
        const newAppointment = {
            id: uuid.v4(),
            guild,
            category,
            date: `${day}/${month} às ${hour}:${minute}h`,
            description
        };

        const storage = await AsyncStorage.getItem(COLLECTION_APPOINTMENTS);
        const appointments = storage ? JSON.parse(storage) : [];

        await AsyncStorage.setItem(
            COLLECTION_APPOINTMENTS,
            JSON.stringify([...appointments, newAppointment])
        );

        navigation.navigate('Home');
    }

    return (
        <KeyboardAvoidingView 
            style={styles.container}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
            <Background>
                <ScrollView>
                    <Header
                        title="Agendar partida"
                    />

                    <Text style={[styles.label, {marginLeft: 24, marginTop: 36, marginBottom: 18}]}>
                        Categoria
                    </Text>

                    <CategorySelect
                        hasCheckBox
                        setCategory={handleCategorySelect}
                        categorySelected={category}
                    />

                    <View style={styles.form}>

                        <RectButton onPress={handleOpenGuilds}>
                            <View style={styles.select}>

                                {
                                    <GuildIcon guildId={guild.id} iconId={guild.icon}/> 
                                }
                                

                                <View style={styles.selectBody}>
                                    <Text style={styles.label}>
                                        {guild.name ? guild.name : 'Selecione um servidor'}
                                    </Text>
                                </View>

                                <Feather
                                    name="chevron-right"
                                    color={theme.colors.heading}
                                    size={18}
                                />
                            </View>
                        </RectButton>

                        <View style={styles.field}>
                            <View>

                                <Text style={[styles.label, {marginBottom: 12}]}>
                                    Dia e mês
                                </Text>

                                <View style={styles.column}>
                                    <SmallInput 
                                        maxLength={2}
                                        onChangeText={setDay}
                                    />
                                    <Text style={styles.divider}>
                                        /
                                    </Text>
                                    <SmallInput 
                                        maxLength={2}
                                        onChangeText={setMonth}
                                    />
                                </View>

                            </View>

                            <View>

                                <Text style={[styles.label, {marginBottom: 12}]}>
                                    Hora e minuto
                                </Text>

                                <View style={styles.column}>
                                    <SmallInput 
                                        maxLength={2}
                                        onChangeText={setHour}    
                                    />
                                    <Text style={styles.divider}>
                                        :
                                    </Text>
                                    <SmallInput 
                                        maxLength={2}
                                        onChangeText={setMinute}
                                    />
                                </View>

                            </View>
                        </View>

                        <View style={[styles.field, {marginBottom: 12}]}>
                            <Text style={styles.label}>
                                Descrição
                            </Text>

                            <Text style={styles.caracteresLimit}>
                                Máximo 100 caractéres
                            </Text>
                        </View>

                        <TextArea
                            multiline
                            maxLength={100}
                            numberOfLines={5}
                            autoCorrect={false} 
                            onChangeText={setDescription}    
                        />

                        <View style={styles.footer}>
                            <Button 
                                title="Agendar"
                                onPress={handleSave}
                            />
                        </View>

                    </View>
                </ScrollView>
            </Background>
            
            <ModalView 
                visible={openGuildsModal}
                closeModal={handleCloseGuilds}
            >
                <Guilds handleGuildSelect={handleGuildSelect}/>
            </ModalView>
            
        </KeyboardAvoidingView>
        
    );
}