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
    const [usuariosLista, setUsuariosLista] = useState([]);
    
    //Similar ao useHistory do web.
    const navigation = useNavigation();

    //Se recebe parametro, pode enviá-lo a pagina destino (detail).
    function navigateToDetail(usuario){
        navigation.navigate('Detail', { usuario });
    }

    function navigateBack(){
        //Método do useNavigation que retorna a página anterior
        navigation.goBack();
    }

    const removeUsuario = async (nome) => {
        try {
            await AsyncStorage.removeItem(nome);
        }
        catch(exception) {
            console.log(e);
        }
    }

    const getUsuario = async (nome) => {
        try {
            const jsonValue = await AsyncStorage.getItem(nome)
            if(jsonValue != null){
                return JSON.parse(jsonValue);
            }
        } catch(e) {
          // error reading value
          console.log("Não foi possível receber as informações.")
        }
    }

    async function loadIncidents(){
        //setTotal(usuariosLista.length)
        const usuarios = [];
        console.log("antes: " + usuario2);
        const usuario1 = await getUsuario("Usuario 1");
        const usuario2 = await getUsuario("Usuario 2");
        const usuario3 = await getUsuario("Usuario 3");

        if(usuario1 != null){
            usuarios.push(usuario1);
        }
        if(usuario2 != null){
            usuarios.push(usuario2);
        }
        if(usuario3 != null){
            usuarios.push(usuario3);
        }

        console.log("Usuario 1 : " + usuario1);
        console.log("Usuario 2 : " + usuario2);
        console.log("Usuario 3 : " + usuario3);
        setUsuariosLista(usuarios);
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
                        onPress={() => removeUsuario(usuario.nome)}
                        >
                            <Text style={styles.detailsButtonText}>Remover usuário</Text>
                            <Feather name='trash-2' size={16} color='#E02041' />
                        </TouchableOpacity>
                        
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