import React from 'react';
import { 
  View, 
  Text, 
  Image,
  Alert,
  ActivityIndicator
} from 'react-native';

import { useAuth } from '../../hooks/auth';

import { ButtonIcon } from '../../components/ButtonIcon';
import IllustrationImg from '../../assets/illustration.png';
import { styles } from './styles';
import { Background } from '../../components/Background';
import { theme } from '../../global/styles/theme';

// Exporta uma função
export function SignIn(){

  // Não precisa mais da navegação pois o usuário será redirecionado para outra tela do browser
  //const navigation = useNavigation();

  // O user (id, username, firstName, email, ...) foi recuperado
  // o signIn está salvo em um contexto (useAuth), onde também está a autenticação
  const {loading, signIn} = useAuth();

  // Funções nomeadas com handle são específicas para realizar algo sobre a ação do usuário
  // Neste caso foi no botão do discord
  async function handleSignIn(){
    try{
      await signIn();
    } catch(error) {
      Alert.alert(error);
    }
  }

  return(
    <Background>
      
      <View style={styles.container}>
        <Image 
          source={IllustrationImg}
          style={styles.image}
          resizeMode="stretch"
        />

        <View style={styles.content}>
          <Text style={styles.title}>
            Conecte-se {'\n'}e organize suas {'\n'}jogatinas
          </Text>

          <Text style={styles.subtitle}>
            Crie grupos para jogar seus games {'\n'}favoritos com seus amigos
          </Text>

          { 
            loading ? <ActivityIndicator color={theme.colors.primary}/>
            :
            <ButtonIcon
              title={"Entrar com Discord"}
              onPress={handleSignIn}
            />
        
          }
        </View>
      </View>
    </Background>
    
  );
}