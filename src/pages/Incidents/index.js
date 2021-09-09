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

export default function Incidents(){
    const [total, setTotal] = useState(0);
    
    //Similar ao useHistory do web.
    const navigation = useNavigation();

    //Colocado agora: usuarios
    const usuario1 = {id: 1, descricao: "Descrição 1", nome: "Usuario 1", endereco: "Rua 1", email: "usuario1@mail.com", telefone: "99999999"}
    const usuario2 = {id: 2, descricao: "Descrição 2", nome: "Usuario 2", endereco: "Rua 2", email: "usuario2@mail.com", telefone: "99999999"}
    const usuario3 = {id: 3, descricao: "Descrição 3", nome: "Usuario 3", endereco: "Rua 3", email: "usuario3@mail.com", telefone: "99999999"}
    const usuariosLista = [usuario1, usuario2, usuario3]
    //Se recebe parametro, pode enviá-lo a pagina destino (detail).
    function navigateToDetail(usuario){
        navigation.navigate('Detail', { usuario });
    }

    function navigateToContacts(){
        navigation.navigate('ContatosSalvos');
    }

    async function loadIncidents(){
        setTotal(usuariosLista.length)
    }
    //Função que dispara toda vez que as variáveis nos colchetes mudam
    useEffect(() => {
        loadIncidents();
    }, []);

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Image source={logoImg} style={{height: 100, width: 100}} />
                <Text style={styles.headerText}>
                    Total de <Text style={styles.headerTextBold}> {total} usuários </Text>.
                </Text>
            </View>

            <TouchableOpacity 
                        style={styles.detailsButton} 
                        //Usa-se arrow function para não chamar imediatamente 
                        onPress={() => navigateToContacts()}
                        >
                            <Text style={styles.detailsButtonText}>Ver contatos salvos</Text>
                            <Feather name='arrow-right' size={16} color='#E02041' />
                        </TouchableOpacity>
            <TextInput style={styles.input} placeholder={"Digite o nome do usuário..."}></TextInput>

            
            {/* Usado sempre (no lugar da view) que se trabalha com listagem de dados */}
            
            <FlatList
                //Array de dados vai montar a lista.
                data={usuariosLista}
                style={styles.incidentList} 
                //Informação única de cada item (necessário que seja string).
                keyExtractor={usuario => String(usuario.id)}
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
                renderItem={({item: usuario}) => (
                    <View style={styles.incident}>
                        <Text style={styles.incidentProperty}>Nome:</Text>
                        <Text style={styles.incidentValue}>{usuario.nome}</Text>

                        <Text style={styles.incidentProperty}>Descrição:</Text>
                        <Text style={styles.incidentValue}>{usuario.descricao}</Text>

                        <Text style={styles.incidentProperty}>Endereço:</Text>
                        <Text style={styles.incidentValue}>{usuario.endereco}</Text>

                        <Text style={styles.incidentProperty}>E-mail:</Text>
                        <Text style={styles.incidentValue}>{usuario.email}</Text>

                        <Text style={styles.incidentProperty}>Telefone:</Text>
                        <Text style={styles.incidentValue}>{usuario.telefone}</Text>

                    
                        <TouchableOpacity 
                        style={styles.detailsButton} 
                        //Usa-se arrow function para não chamar imediatamente 
                        onPress={() => navigateToDetail(usuario)}
                        >
                            <Text style={styles.detailsButtonText}>Ver mais detalhes</Text>
                            <Feather name='arrow-right' size={16} color='#E02041' />
                        </TouchableOpacity>
                    </View>
                )}
            />

        </View>   

    );
}