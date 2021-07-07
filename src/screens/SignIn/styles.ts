import { StyleSheet } from 'react-native';
import { theme } from '../../global/styles/theme';

// Exporta um objeto
export const styles = StyleSheet.create({
    container: {
        // Ocupar toda tela
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },

    image: {
        width: '100%',
        height: 360
    },

    content: {
        marginTop: -40,
        paddingHorizontal: 50
    },

    title: {
        color: theme.colors.heading,
        textAlign: 'center',
        fontSize: 38,
        marginBottom: 16,
        fontFamily: theme.fonts.title700,
        lineHeight: 40,
    },

    subtitle: {
        color: theme.colors.heading,
        fontSize: 15,
        textAlign: 'center',
        marginBottom: 30,
        fontFamily: theme.fonts.title500,
        lineHeight: 25,
    }
});