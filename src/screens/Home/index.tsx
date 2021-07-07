// useCallBack usado para memorizar a referência em memória da função
import React, {useState, useCallback} from 'react';

// FlarList usado com vários objetos na lista, essencial em questão de renderizar alguns itens da lista
import { View, FlatList, Text} from 'react-native';
import { styles } from './styles';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {Profile} from '../../components/Profile';
import {ButtonAdd} from '../../components/ButtonAdd';
import { CategorySelect } from '../../components/CategorySelect';
import {ListHeader} from '../../components/ListHeader';
import {Appointment, AppointmentProps} from '../../components/Appointment';
import {ListDivider} from '../../components/ListDivider';
import { Background } from '../../components/Background';
import { Load } from '../../components/Load';

import { COLLECTION_APPOINTMENTS } from '../../configs/database';



export function Home() {

    // Vetor recebe o estado [nome do estado, função que atualiza o estado] = (nome inicial)
    const [category, setCategory] = useState('');

    const [loading, setLoading] = useState(true);

    const navigation = useNavigation();

    const [appointments, setAppointments] = useState<AppointmentProps[]>([]);

    function handleCategorySelect(categoryId: string){
        // Verifica se category tem algum valor ou conteúdo (marcada), se sim, então ela é desmarcada
        // se não era será selecionada (marcada)
        categoryId === category? setCategory('') : setCategory(categoryId);
    }

    function handleAppointmentDetails(guildSelected: AppointmentProps){
        navigation.navigate('AppointmentDetails', {guildSelected});
    }

    function handleAppointmentCreate(){
        navigation.navigate('AppointmentCreate');
    }

    async function loadAppointments(){
        const response = await AsyncStorage.getItem(COLLECTION_APPOINTMENTS);
        const storage: AppointmentProps[] = response ? JSON.parse(response) : [];

        if(category){
            setAppointments(storage.filter(item => item.category === category));
        } else {
            setAppointments(storage);
        }

        setLoading(false);
    }

    useFocusEffect(useCallback(() => {
        loadAppointments();
    },[category]));

    return (
        <Background>
            <View style={styles.header}>
                <Profile/>
                <ButtonAdd
                    onPress={handleAppointmentCreate}
                />
            </View>
            
            <CategorySelect
                // O category inicializa desmarcado, porém assim q algum card é selecionado, o id deste card
                // vai para category devido a função handleCategorySelect que sente a ação do usuário
                categorySelected={category}
                setCategory={handleCategorySelect}
            />

            {
                loading ? <Load/> :
                <>
                    <ListHeader
                        title="Partidas agendadas"
                        subtitle={`Total ${appointments.length}`}
                    />


                    <FlatList
                        data={appointments}
                        keyExtractor={item=> item.id}  
                        // Quais itens serão renderizados, além disso é desestruturado cada item percorrendo-o
                        renderItem={({item}) => (
                        <Appointment 
                            data={item} 
                            onPress={() => handleAppointmentDetails(item)}    
                        />
                        )}
                        ItemSeparatorComponent={() => <ListDivider/>}
                        contentContainerStyle={{paddingBottom: 69}}
                        style={styles.matches}
                        showsVerticalScrollIndicator={false}
                    />
                </>
            }
        
        </Background>
    );
}