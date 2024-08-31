import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Card, Text, Avatar, Title, useTheme, IconButton } from 'react-native-paper';

const PerfilScreen: React.FC = () => {
  const theme = useTheme();

  return (
    <View style={styles.container}>
      <View style={styles.avatarContainer}>
        <Avatar.Text 
          size={80} 
          label="AC" 
          style={[styles.avatar, { backgroundColor: 'black' }]} 
        />
      </View>
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
          <View style={styles.detailRow}>
            <IconButton icon="account" size={24}/>
            <Text style={styles.profileDetail}>Nome: <Text style={styles.profileDetailBold}>André Correa</Text></Text>
          </View>
          <View style={styles.detailRow}>
            <IconButton icon="email" size={24} />
            <Text style={styles.profileDetail}>Email: <Text style={styles.profileDetailBold}>andrecorrea@gmail.com</Text></Text>
          </View>
          <View style={styles.detailRow}>
            <IconButton icon="phone" size={24} />
            <Text style={styles.profileDetail}>Telefone: <Text style={styles.profileDetailBold}>(11) 1234-5678</Text></Text>
          </View>
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
    backgroundColor: '#f8f9fa',
  },
  avatarContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  avatar: {
    borderWidth: 3,
    borderColor: '#ffffff',
    elevation: 4, // Adiciona sombra ao avatar
  },
  title: {
    fontSize: 26,
    marginTop: 10,
    alignSelf: 'center',
    color: '#333',
  },
  pontuacaoCard: {
    marginTop: 20,
    padding: 25,
    borderRadius: 5,
    alignItems: 'center',
    backgroundColor: '#FFF5E1',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  pontuacaoContent: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  starIcon: {
    color: '#FFD700',
    fontSize: 60,
    marginBottom: 8,
  },
  pontuacaoLabel: {
    fontSize: 20,
    color: '#333',
    marginBottom: 5,
  },
  pontuacaoValue: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFA500',
  },
  card: {
    marginTop: 20,
    padding: 20,
    backgroundColor: '#ffffff',
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  profileDetail: {
    fontSize: 14,
    color: '#666',
    marginLeft: 10,
  },
  profileDetailBold: {
    fontWeight: 'bold',
    color: '#333',
  },
});

export default PerfilScreen;