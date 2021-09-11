//useEffect: carrega uma informação assim que o objeto entra em tela
import React from 'react';
import { Feather } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { AsyncStorage } from 'react-native';

//Linking: usado para enviar a mensagem no whatsapp
import { View, Image, Text, TouchableOpacity, Linking } from 'react-native';
//Para instalar: expo install expo-mail-composer
//Exporta tudo de expo-mail-composer para  MailComposer
import * as MailComposer from 'expo-mail-composer';

import perfil from '../../assets/perfil.png';

import styles from './styles';

export default function Detail(){
    const navigation = useNavigation();
    //Pega informações específicas da página atual.
    const route = useRoute();
    //pega o parametro incident que a rota (página) recebeu
    const usuario = route.params.usuario;
    const message = `Olá ${usuario.name}, estou entrando em contato.`;

    function navigateBack(){
        //Método do useNavigation que retorna a página anterior
        navigation.goBack();
    }

    function sendMail(){
        MailComposer.composeAsync({
            //Assunto da mensagem
            subject: `Assunto da mensagem`,
            //Pra quem o email será enviado
            recipients: [usuario.email],
            //Conteúdo da menssagem
            body: message,

        });
    }

    function sendWhatsapp(){
        Linking.openURL(`whatsapp://send?phone=${usuario.telefone}&text=${message}`);
    }

    const storeData = async (usuario) => {
        try {
          const jsonValue = JSON.stringify(usuario);
          await AsyncStorage.setItem(usuario.nome, jsonValue);
        } catch (e) {
          console.log("Erro: " + e);
        }
    }

    function saveContact(usuario){
        storeData(usuario);
        navigation.navigate('ContatosSalvos');
    }


    return (
        <View style={styles.container}>
            <View style={styles.header}>
            <Image source={perfil} style={{width: 60, height: 60, marginTop: 0}} />
                <TouchableOpacity onPress={navigateBack}>
                    <Feather name='arrow-left' size={28} color='#E02041' />
                </TouchableOpacity>
            </View>

            
            <View style={styles.incident}>
                <Text style={styles.incidentProperty}>Nome:</Text>
                <Text style={styles.incidentValue}>{usuario.nome}</Text>

                <Text style={styles.incidentProperty}>Endereço:</Text>
                <Text style={styles.incidentValue}>{usuario.endereco}</Text>

                <Text style={styles.incidentProperty}>Dados bancários:</Text>
                <Text style={styles.incidentValue}>Banco x</Text>
                <Text style={styles.incidentValue}>abcd-9</Text>
            </View>

            <View style={styles.contactBox}>
                <Text style={styles.heroTitle}>Entre em contato:</Text>

                <View style={styles.actions}>
                    <TouchableOpacity style={styles.action} onPress={sendWhatsapp}>
                        <Text style={styles.actionText}>Whatsapp</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.action} onPress={sendMail}>
                        <Text style={styles.actionText}>E-mail</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.action} onPress={() => saveContact(usuario)}>
                        <Text style={styles.actionText}>Salvar</Text>
                    </TouchableOpacity>
                </View>
            </View>

        </View>
    );
}