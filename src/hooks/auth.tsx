// Arquivo criado para trabalhar com contexto e consumir os dados para a aplicação
// 

import React, 
{
    createContext,
    useContext,
    useState,
    ReactNode,
    useEffect
} from 'react';

// Usado para autenticação
import * as AuthSession from 'expo-auth-session';
import AsyncStorage from '@react-native-async-storage/async-storage';

const {REDIRECT_URI} = process.env;
const {SCOPE} = process.env;
const {RESPONSE_TYPE} = process.env;
const {CLIENT_ID} = process.env;
const {CDN_IMAGE} = process.env;

import { api } from '../services/api';
import {COLLECTION_USERS} from '../configs/database';

type User = {
    id: string;
    username: string;
    firstName: string;
    avatar: string;
    email: string;
    token: string;
}

// Foi feito esta tipagem pois pode ser que seja necessário acrescentar mais propriedades na tipagem User (acima)
type AuthContextData = {
    user: User;
    loading: boolean;
    // Promise: leva um tempo para processar
    signIn: () => Promise<void>;
    signOut: () => Promise<void>;
}

type AuthProviderProps = {
    children: ReactNode;
}

// Tipagem feita para pegar os dados da resposta do authSession.startAsync em type e params
type AuthorizationResponse = AuthSession.AuthSessionResult & {
    params: {
        access_token?: string;
        error?: string;
    }
}

// inicializa com um valor inicial, sendo um objeto vazio do tipo AuthContextData
export const AuthContext = createContext({} as AuthContextData);

function AuthProvider({children} : AuthProviderProps) {

    // Foi criado um estado para o usuário
    const [user, setUser] = useState<User>({} as User);

    // Esperar o processo de autenticação
    const [loading, setLoading] = useState(false);

    // Autenticar o usuário com a token que será gerada
    async function signIn(){
        try{
            setLoading(true);

            const authUrl = `${api.defaults.baseURL}/oauth2/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=${SCOPE}`;

            // É criado uma sessão
            const {type, params } = await AuthSession
            .startAsync({authUrl}) as AuthorizationResponse; // authUrl é para onde o usuário vai quando for autenticar

            // O Bearer foi pego na linha acima substiruindo o {type, params} pelo response
            if(type === "success" && !params.error){
                
                // Todas as requisições feitas são acompanhadas por um token
                api.defaults.headers.authorization = `Bearer ${params.access_token}`;

                // Pegando o username, email, image..., como dito pela documentação no discord /users/@me
                const userInfo = await api.get('/users/@me');

                const firstName = userInfo.data.username.split(' ')[0];
                userInfo.data.avatar = `${CDN_IMAGE}/avatars/${userInfo.data.id}/${userInfo.data.avatar}.png`;

                const userData = {
                    ...userInfo.data,
                    firstName,
                    token: params.access_token
                }

                // Assim que os dados são tratados, eles são salvos em setUser
                // AsyncStorage, baseado em chave e valor a ser armazenado
                // stringfy passa  objeto para texto
                await AsyncStorage.setItem(COLLECTION_USERS, JSON.stringify(userData));
                setUser(userData);
            } 

        }catch(error) {
            throw new Error('Não foi possível autenticar'); 
            
        } finally {
            setLoading(false);
        }
    }

    async function signOut(){
        setUser({} as User);
        await AsyncStorage.removeItem(COLLECTION_USERS);
    }

    async function loadUserStorageData(){
        const storage = await AsyncStorage.getItem(COLLECTION_USERS);

        if(storage){
            const userLogged = JSON.parse(storage) as User;
            // Todas as requisições feitas são acompanhadas por um token
            api.defaults.headers.authorization = `Bearer ${userLogged.token}`;

            setUser(userLogged);
        }
    }

    // buscar no dispositivo os dados armazenados localmente
    useEffect(() => {
        loadUserStorageData();
    },[])

    return (
        <AuthContext.Provider value={{
            // Contexto abrange as rotas, para que possam (telas) acessar os dados
            // Recebe um valor de estado atual (abaixo user: id, email, ....)
            // Children são as rotas para as telas em app.tsx
            user,
            loading,
            signIn,
            signOut
        }}>
        
            {children}
        </AuthContext.Provider>
    )
}

// próprio hook criado
function useAuth(){

    // Criando o estado para o contexto
    const context = useContext(AuthContext);

    return context;
}

// Funções para permitir que as telas possam acessar o contexto com os dados do usuário
// agora falta pegar esses dados do discord
export {
    AuthProvider,
    useAuth
}