import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Card, Text, Avatar, Title } from 'react-native-paper';

const PerfilScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      <Avatar.Text size={64} label="AC" style={styles.avatar} />
      <Title style={styles.title}>Olá, André Correa!</Title>
      
      <Card style={styles.pontuacaoCard}>
        <Card.Content style={styles.pontuacaoContent}>
          <Text style={styles.starIcon}>★</Text>
          <Text style={styles.pontuacaoLabel}>Sua Pontuação</Text>
          <Text style={styles.pontuacaoValue}>20 pontos</Text>
        </Card.Content>
      </Card>

      <Card style={styles.card}>
        <Card.Content>
          <Text style={styles.profileDetail}>Nome: André Correa</Text>
          <Text style={styles.profileDetail}>Email: andrecorrea@gmail.com</Text>
          <Text style={styles.profileDetail}>Telefone: (11) 1234-5678</Text>
        </Card.Content>
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 50, // Margin top for the start of the page
    backgroundColor: '#f0f0f0',
  },
  avatar: {
    backgroundColor: '#000',
    alignSelf: 'center',
  },
  title: {
    fontSize: 24,
    marginTop: 20,
    alignSelf: 'center',
  },
  pontuacaoCard: {
    marginTop: 20,
    padding: 20,
    backgroundColor: '#FFF5E1', // Light yellow background
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 3,
    alignItems: 'center', // Centraliza todo o conteúdo do card
  },
  pontuacaoContent: {
    alignItems: 'center',
  },
  starIcon: {
    color: '#FFD700',
    fontSize: 50, // Aumenta o tamanho da estrela
    textAlign: 'center',
    marginBottom: 10,
  },
  pontuacaoLabel: {
    fontSize: 18,
    color: '#333',
    textAlign: 'center',
    marginBottom: 5,
  },
  pontuacaoValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFA500', // Orange color for points value
    textAlign: 'center',
  },
  card: {
    marginTop: 20,
    padding: 15,
  },
  profileDetail: {
    fontSize: 16,
    marginTop: 10,
  },
});

export default PerfilScreen;