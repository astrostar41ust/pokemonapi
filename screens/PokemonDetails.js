import { useRoute } from "@react-navigation/native";
import { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image, Button } from "react-native";






export default function PokemonDetails({ navigation }) {

    const route = useRoute()
    const pokemonData = route.params?.pokemonData
   

 
    const handleClearSelection = () => {

        navigation.navigate('Pokemon Details', {pokemonData: undefined})

    }


    return (
        <View style={styles.container}>


            {pokemonData == undefined ?


                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <Text>Loding Pokemon</Text>
                    <TouchableOpacity style={[styles.button, { backgroundColor: 'lightblue' }]}
                        onPress={() => navigation.navigate('Pokemon List')}>

                        <Text style={{ textAlign: 'center' }}>Go to Pokemon List</Text>
                    </TouchableOpacity>
                </View> :

                <View>
                    <View style={styles.header}>
                        <Text>Id: {pokemonData.id}</Text>
                        <Text>Name: {pokemonData.name}</Text>
                        <Text>Type: {pokemonData.types}</Text>
                    </View>
                    <View style={styles.imageSection}>
                        <Image
                            source={{ uri: pokemonData.frontImage }}
                            style={styles.imageBox}>

                        </Image>
                        <Image
                            source={{ uri: pokemonData.backImage }}
                            style={styles.imageBox}>

                        </Image>
                    </View>
                    <View style={styles.statsSection}>
                        <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Base Stats</Text>
                        <View>
                            <Text>Hp: {pokemonData.stats[0].base_stat}</Text>
                            <Text>Attack: {pokemonData.stats[1].base_stat}</Text>
                            <Text>Defense: {pokemonData.stats[2].base_stat}</Text>
                            <Text>Special Attack: {pokemonData.stats[3].base_stat}</Text>
                            <Text>Special Defense: {pokemonData.stats[4].base_stat}</Text>
                            <Text>Speed: {pokemonData.stats[5].base_stat}</Text>
                        </View>
                    </View>
                    <View style={styles.abilitiesSection}>
                        <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Abilities</Text>
                        <View>
                            {pokemonData.hiddenAbilities[0] == true ? <Text>{pokemonData.abilities[0]} (hidden)</Text> : <Text>{pokemonData.abilities[0]} </Text>}
                            {pokemonData.hiddenAbilities[1] == true ? <Text>{pokemonData.abilities[1]} (hidden)</Text> : <Text>{pokemonData.abilities[1]} </Text>}
                            {pokemonData.hiddenAbilities[2] == true ? <Text>{pokemonData.abilities[2]} (hidden)</Text> : <Text>{pokemonData.abilities[2]} </Text>}
                        </View>
                    </View>
                    <View style={styles.movesSection}>
                        <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Moves (first 5)</Text>
                        <View>
                            <Text>{pokemonData.moves[0]}</Text>
                            <Text>{pokemonData.moves[1]}</Text>
                            <Text>{pokemonData.moves[2]}</Text>
                            <Text>{pokemonData.moves[3]}</Text>
                            <Text>{pokemonData.moves[4]}</Text>
                        </View>
                    </View>
                    <View style={styles.buttonSection}>
                        <TouchableOpacity style={[styles.button, { backgroundColor: 'pink' }]}
                            onPress={handleClearSelection}>
                            <Text style={{ textAlign: 'center' }}>Clear Selection</Text>

                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.button, { backgroundColor: 'lightblue' }]}

                            onPress={() => navigation.navigate('Pokemon List')}>

                            <Text style={{ textAlign: 'center' }}>Go to Pokemon List</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            }
        </View>



    )
}



const styles = StyleSheet.create({
    container: {
        flex: 1,

    },
    header: {
        backgroundColor: 'wheat',
        minWidth: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 20
    },
    imageSection: {
        flexDirection: 'row',
        backgroundColor: 'lightpink',
        minWidth: '100%',
        justifyContent: 'space-around',
        alignItems: 'center'
    },
    imageBox: {
        backgroundColor: 'lightgreen',
        width: 100,
        height: 100,
        borderRadius: 10
    },
    statsSection: {
        minWidth: '100%',
        backgroundColor: 'wheat',
    },
    abilitiesSection: {
        minWidth: '100%',
        backgroundColor: 'lightpink',
    },
    movesSection: {
        minWidth: '100%',
        backgroundColor: 'wheat',
    },
    buttonSection: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    button: {
        minWidth: '70%',
        borderRadius: 20,
        paddingVertical: 16,

    }
})