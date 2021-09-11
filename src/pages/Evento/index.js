//useEffect: carrega uma informação assim que o objeto entra em tela
import React, { useState, useEffect } from 'react';
import { Feather } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import {AsyncStorage} from 'react-native';

//Linking: usado para enviar a mensagem no whatsapp
import { View, Image, Text, TouchableOpacity, FlatList } from 'react-native';

import logoImg from '../../assets/logo.png';
import mapa from '../../assets/mapa.png';

import styles from './styles';

export default function Evento(){
    const navigation = useNavigation();
    //Pega informações específicas da página atual.
    const route = useRoute();
    //pega o parametro incident que a rota (página) recebeu
    const nomeEvento = route.params.nome;

    const usuario1 = {id: 1, descricao: "Descrição 1", nome: "Usuario 1", endereco: "Rua 1", email: "usuario1@mail.com", telefone: "00000000"}
    const usuario2 = {id: 2, descricao: "Descrição 2", nome: "Usuario 2", endereco: "Rua 2", email: "usuario2@mail.com", telefone: "99999999"}
    const usuario3 = {id: 3, descricao: "Descrição 3", nome: "Usuario 3", endereco: "Rua 3", email: "usuario3@mail.com", telefone: "99999999"}
    const usuarios = [usuario1, usuario2, usuario3]

    function navigateBack(){
        //Método do useNavigation que retorna a página anterior
        navigation.goBack();
    }

    const saveEvento = async () => {
        try {
          await AsyncStorage.setItem(String(nomeEvento), String(nomeEvento));
        } catch (e) {
          console.log("Erro: " + e);
        }

        /*const jsonValue1 = await AsyncStorage.getItem("1");
        console.log("Foi ----------- " + jsonValue1);
        const jsonValue2 = await AsyncStorage.getItem("2");
        console.log("Foi ----------- " + jsonValue2);
        const jsonValue3 = await AsyncStorage.getItem("3");
        console.log("Foi ----------- " + jsonValue3);*/
    }

    function navigateToListaEventos(){
        //Método do useNavigation que retorna a página anterior
        //console.log(lista_participantes);
        saveEvento();
        navigation.navigate("ListaEventos");
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Image source={logoImg} style={{height: 100, width: 100}} />
                <TouchableOpacity onPress={navigateBack}>
                    <Feather name='arrow-left' size={28} color='#E02041' />
                </TouchableOpacity>
            </View>

            <Text style={styles.incidentValue}>
                Adicionar participantes ao evento        
            </Text>
            <Image source={mapa} style={{height: 200, width: 200, marginLeft: 55, marginTop: 15}} />

            <TouchableOpacity 
                        style={styles.detailsButton} 
                        //Usa-se arrow function para não chamar imediatamente 
                        onPress={() => navigateToListaEventos()}
                        >
                            <Text style={styles.detailsButtonText}>Finalizar</Text>
                            <Feather name='arrow-right' size={16} color='#E02041' />
                        </TouchableOpacity>

            <FlatList
                //Array de dados vai montar a lista.
                data={usuarios}
                style={styles.incidentList} 
                //Informação única de cada item (necessário que seja string).
                keyExtractor={usuario => String(usuario.id)}
                //Retira o scroll sem desabilitar a rolagem.
                showsVerticalScrollIndicator={false}
                //Indica a quantos porcentos do final da lista o usuario precisa estar
                //para que carregue novos intens.
                //0.2 (20%) - 0.3 (30%) - etc 
                onEndReachedThreshold={0.2}
                //Função responsável por renderizar cada item.
                //item: incident - troca o nome da variavel item por incident.
                renderItem={({item: usuario}) => (
                    <View style={styles.incident}>
                        <Text style={styles.incidentProperty}>Nome:</Text>
                        <Text style={styles.incidentValue}>{usuario.nome}</Text>
                        <TouchableOpacity 
                        style={styles.detailsButton} 
                        >
                            <Text style={styles.detailsButtonText}>Adicionar</Text>
                            <Feather name='arrow-right' size={16} color='#E02041' />
                        </TouchableOpacity>
                    </View>
                )}
            />

        </View>
    );
}