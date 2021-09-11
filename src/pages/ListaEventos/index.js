//useEffect: carrega uma informação assim que o objeto entra em tela
import React, { useState, useEffect } from 'react';
import { Feather, Trash } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { AsyncStorage } from 'react-native';
//Touchable opacity: torna qualquer coisa clicável
//e diminui sua opacidade ao clique.
import { View, FlatList, Image, Text, TouchableOpacity } from 'react-native';

//Importa automaticamente a logo no melhor formato
//de acordo com a tela.
import logoImg from '../../assets/logo.png'; 

import styles from './styles';
import { TextInput } from 'react-native-gesture-handler';

export default function Incidents(){
    const [eventosLista, setEventosLista] = useState([]);
    
    //Similar ao useHistory do web.
    const navigation = useNavigation();

    //Se recebe parametro, pode enviá-lo a pagina destino (detail).

    function navigateBack(){
        //Método do useNavigation que retorna a página anterior
        navigation.goBack();
    }

    const getEvento = async (nome) => {
        try {
            const jsonValue = await AsyncStorage.getItem(nome)
            if(jsonValue != null){
                //console.log(JSON.parse(jsonValue));
                return JSON.parse(jsonValue);
            }
        } catch(e) {
          // error reading value
          console.log("Não foi possível receber as informações.")
        }
    }

    async function loadIncidents(){
        var lista_eventos = [];
        //console.log("antes: " + usuario2);
        const evento1 = await getEvento("1");
        const evento2 = await getEvento("2");
        const evento3 = await getEvento("3");

        if(evento1 != null){
            //console.log(evento1);
            lista_eventos.push(evento1);
        }
        if(evento2 != null){
            lista_eventos.push(evento2);
        }
        if(evento3 != null){
            lista_eventos.push(evento3);
        }

        //console.log("Evento 1 : " + evento1);
        //console.log("Evento 2 : " + evento2);
        //console.log("Evento 3 : " + evento3);
        setEventosLista(lista_eventos);
    }
    //Função que dispara toda vez que as variáveis nos colchetes mudam
    useEffect(() => {
        loadIncidents();
    }, []);

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Image source={logoImg} style={{height: 100, width: 100}} />
                <TouchableOpacity onPress={navigateBack}>
                    <Feather name='arrow-left' size={28} color='#E02041' />
                </TouchableOpacity>
            </View>
            
            {/* Usado sempre (no lugar da view) que se trabalha com listagem de dados */}
            
            <FlatList
                //Array de dados vai montar a lista.
                data={eventosLista}
                style={styles.incidentList} 
                //Informação única de cada item (necessário que seja string).
                keyExtractor={evento => String(evento.nome)}
                //Retira o scroll sem desabilitar a rolagem.
                showsVerticalScrollIndicator={false}
                //Função disparada quando o usuario chega ao final da lista.
                onEndReached={loadIncidents}
                //Indica a quantos porcentos do final da lista o usuario precisa estar
                //para que carregue novos intens.
                //0.2 (20%) - 0.3 (30%) - etc 
                onEndReachedThreshold={0.2}
                //Função responsável por renderizar cada item.
                //item: incident - troca o nome da variavel item por incident.
                renderItem={({item: evento}) => (
                    <View style={styles.incident}>
                        <Text style={styles.incidentProperty}>Nome:</Text>
                        <Text style={styles.incidentValue}>Evento {evento.nome}</Text>
                    </View>
                )}
            />

        </View>   

    );
}