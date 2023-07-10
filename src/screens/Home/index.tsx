import { useState } from 'react';
import { Alert, FlatList, Text, TextInput, TouchableOpacity, View } from 'react-native';

import { Participant } from '../../components/Participant';
import { styles } from './styles';

export function Home() {
    const [participants, setParticipants] = useState<string[]>([]);

    const [participantName, setParticipantName] = useState('');

    function handleParticipantAdd(): void {
        if (participants.includes(participantName)) {
            return Alert.alert(
                "Participante existe",
                "Já existe um participante com esse nome"
            );
        }

        setParticipants(prevState => [...prevState, participantName]);
        setParticipantName('');
    }

    function handleParticipantRemove(name: string): void {
        Alert.alert(
            "Remover",
            `Remover o participante ${name} ?`,
            [
                {
                    text: 'Sim',
                    onPress: () => setParticipants(prevState => prevState.filter(participant => participant !== name))
                },
                {
                    text: 'Não',
                    style: 'cancel'
                }
            ]
        );
    }

    return (
        <View style={styles.container} >
            <Text style={styles.eventName}>
                Nome do Evento
            </Text>

            <Text style={styles.eventDate}>
                Domingo, 09 de Julho de 2023
            </Text>

            <View style={styles.form}>
                <TextInput
                    style={styles.input}
                    placeholder='Nome do Participante'
                    placeholderTextColor="#6B6B6B"
                    onChangeText={setParticipantName}
                    value={participantName}
                />

                <TouchableOpacity style={styles.button} onPress={handleParticipantAdd}>
                    <Text style={styles.buttonText}>+</Text>
                </TouchableOpacity>
            </View>

            <FlatList
                showsVerticalScrollIndicator={false}
                data={participants}
                keyExtractor={item => item}
                renderItem={({ item }) => (
                    <Participant
                        key={item}
                        name={item}
                        onRemove={() => handleParticipantRemove(item)}
                    />
                )}
                ListEmptyComponent={() => (
                    <Text style={styles.listEmptyText}>
                        Ninguém chegou no evento ainda? Adicione participantes a sua lista de presença.
                    </Text>
                )}
            />
        </View >
    )
}