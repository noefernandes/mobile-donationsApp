import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const AppStack = createStackNavigator();

import Incidents from './pages/Incidents';
import Detail from './pages/Detail';
import ContatosSalvos from './pages/ContatosSalvos';
import Evento from './pages/Evento';
import CriarEvento from './pages/CriarEvento';

export default function Routes(){
    return (
        <NavigationContainer>
                                        {/*Desabilita o cabeçalho padrão*/}
            <AppStack.Navigator screenOptions={{ headerShown: false }} >
                <AppStack.Screen name="Incidents" component={Incidents} />
                <AppStack.Screen name="Detail" component={Detail} />
                <AppStack.Screen name="ContatosSalvos" component={ContatosSalvos} />
                <AppStack.Screen name="CriarEvento" component={CriarEvento} />
                <AppStack.Screen name="Evento" component={Evento} />
            </AppStack.Navigator>

        </NavigationContainer>
    );
}