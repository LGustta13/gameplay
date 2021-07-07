import React from 'react';

// Usado quando temos poucos objetos na lista
import { ScrollView } from 'react-native';
import { RectButton, RectButtonProps } from 'react-native-gesture-handler';
import {View} from 'react-native';

import { styles } from './styles';
import {categories} from '../../utils/categories';
import { Category } from '../Category';

type Props = {
    categorySelected: string;
    // É uma função que tem um tipo de retorno, () recebe algum valor, => retorno
    setCategory: (categoryId: string) => void;
    hasCheckBox?: boolean;
}

export function CategorySelect({categorySelected, setCategory, hasCheckBox=false}: Props){
    return (
        <ScrollView
            horizontal
            style={styles.container}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{paddingRight: 40}}
        >
            {
                // .map usado para percorrer cada categoria
                categories.map(category => (
                    <Category
                        key={category.id}
                        title={category.title}
                        icon={category.icon}
                        checked={category.id === categorySelected}
                        onPress={() => setCategory(category.id)}
                        hasCheckBox={hasCheckBox}
                    />
                ))
            }
            
        </ScrollView>
    );
}