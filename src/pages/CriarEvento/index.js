//useEffect: carrega uma informação assim que o objeto entra em tela
import React, { useState, useEffect } from 'react';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
//Touchable opacity: torna qualquer coisa clicável
//e diminui sua opacidade ao clique.
import { View, FlatList, Image, Text, TouchableOpacity } from 'react-native';

import api from '../../services/api';

//Importa automaticamente a logo no melhor formato
//de acordo com a tela.
import logoImg from '../../assets/logo.png'; 

import styles from './styles';
import { TextInput } from 'react-native-gesture-handler';

export default function ListaEventos(){
    const [nomeEvento, setNomeEvento] = useState("");
    
    //Similar ao useHistory do web.
    const navigation = useNavigation();

    function navigateBack(){
        //Método do useNavigation que retorna a página anterior
        navigation.goBack();
    }

    function navigateToEvento(nome){
        //console.log(nome);
        navigation.navigate('Evento', { nome } );
    }

    
    async function loadIncidents(){
        
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

            <Text style={styles.headerText}>
                Criar novo evento        
            </Text>
            <TextInput style={styles.input} 
                       onChangeText={setNomeEvento}
                       placeholder={"Digite o nome do evento..."}>
            </TextInput>
            <TouchableOpacity 
            style={styles.detailsButton}  
            onPress={() => navigateToEvento(nomeEvento)}
            >
                <Text style={styles.detailsButtonText}>Criar</Text>
                <Feather name='arrow-right' size={16} color='#E02041' />
            </TouchableOpacity>

            
            {/* Usado sempre (no lugar da view) que se trabalha com listagem de dados */}
        </View>   

    );
}