// Será criado um componente para os botões no app
import React from 'react';
import { Text } from 'react-native';
import { RectButton, RectButtonProps } from 'react-native-gesture-handler';

import {styles} from './styles';

// Criando uma propriedade que recebe um objeto {} type ou interface
// nome da propriedade: tipo
// Se colocar title?, significa que não é obrigatório a propriedade
type Props = RectButtonProps & {
    title: string;
}

export function Button({title, ...rest}: Props){
    return(
        <RectButton
            style={styles.container}
            {...rest}
        >

            <Text style={styles.title}>
                {title}
            </Text>
        </RectButton>
    );
}