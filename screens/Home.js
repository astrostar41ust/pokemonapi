import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

export default function Home({ navigation }) {
    return (
        <View style={styles.container}>
            <Text>Pokemon Api</Text>
            <TouchableOpacity 
                style={styles.button}
                onPress={() => navigation.navigate('Pokemon List')}
            >
                <Text style={{ textAlign: 'center' }}>Go to Pokemon List</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center', // Fixed typo
        alignItems: 'center', // Fixed typo
    },
    button: {
        backgroundColor: 'lightblue',
        borderRadius: 20,
        padding: 10, // Added padding for better appearance
    }
});
