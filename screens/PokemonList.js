
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Image, TextInput } from "react-native";
import { useEffect, useState } from "react";





export default function PokemonList({ navigation }) {

    const [allPokemon, setAllPokemon] = useState([])
    const [allPokemonStore, setAllPokemonStore] = useState([])
    const [searchInput, setSearchInput] = useState('')


    const fetchPokemon = async () => {

        const response = await fetch('https://pokeapi.co/api/v2/pokemon/')
            .then((response) => response.json())
        setAllPokemon(response.results)

        const fetchEachPokemon = response.results.map(async (pokemon) => {
            const response = await fetch(pokemon.url)
                .then((response) => response.json())

            return ({
                id: response.id,
                name: response.name,
                types: response.types.map((types) => types.type.name).join(', '),
                frontImage: response.sprites.front_default,
                backImage: response.sprites.back_default,
                stats: response.stats.map((stats) => stats),
                abilities: response.abilities.map((abilities) => abilities.ability.name),
                hiddenAbilities: response.abilities.map((abilities) => abilities.is_hidden),
                moves: response.moves.map((moves) => moves.move.name)
            })


        })

        const pokemonWithDetails = await Promise.all(fetchEachPokemon)

        setAllPokemon(pokemonWithDetails)
        setAllPokemonStore(pokemonWithDetails)
    }


    useEffect(() => {
        fetchPokemon();
    }, []);

    const handleSearch = () => {
        if (searchInput !== '') {
            const filteredPokemon = allPokemonStore.filter((pokemon) => (
                pokemon.name.toLowerCase().includes(searchInput.toLowerCase()) ||
                pokemon.id.toString().includes(searchInput.toString())
            ))
            setAllPokemon(filteredPokemon)
        }
        else {
            setAllPokemon(allPokemonStore)
        }


    }
    const handleClear = () => {
        if (searchInput !== '') {
            setSearchInput('')
            setAllPokemon(allPokemonStore)
        }
    

    }


    return (

        <View style={styles.container}>
            <View style={{ flexDirection: 'row' }}>
                <TextInput
                    value={searchInput}
                    onChangeText={setSearchInput}

                    style={{ backgroundColor: 'wheat', borderRadius: 10, paddingVertical: 10, flex: 1, }}>

                </TextInput>
                <TouchableOpacity style={[styles.button, { backgroundColor: 'lightblue' }]}
                    onPress={handleSearch}>
                    <Text>Search</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.button, { backgroundColor: 'red' }]}
                    onPress={handleClear}>
                    <Text>Clear</Text>
                </TouchableOpacity>
            </View>
            <FlatList
                data={allPokemon}
                keyExtractor={(item, index) => index}
                renderItem={({ item }) =>
                    <TouchableOpacity style={styles.pokemonBox}
                        onPress={() => navigation.navigate('Pokemon Details', { pokemonData: item },)}>
                        <Image
                            source={{ uri: item.frontImage }}
                            style={{ width: 100, height: 80 }}>

                        </Image>
                        <View>
                            <Text>{item.id}</Text>
                            <Text>{item.name}</Text>
                            <Text>{item.types}</Text>
                        </View>


                    </TouchableOpacity>}
            >

            </FlatList>
        </View>

    )
}




const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    pokemonBox: {
        backgroundColor: 'lightblue',
        borderRadius: 10,
        minWidth: '100%',
        paddingVertical: 30,
        marginVertical: 4,
        flexDirection: 'row'


    },
    button: {
        borderRadius: 10,
        paddingVertical: 10,
        paddingHorizontal: 10
    }

})