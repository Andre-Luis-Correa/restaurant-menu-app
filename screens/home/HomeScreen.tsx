import React from 'react';
import { View, ScrollView, StyleSheet, Image, Text } from 'react-native';
import { Card, Title, Paragraph } from 'react-native-paper';
import data from '../../assets/data.json';

const HomeScreen: React.FC = () => {
  const pratosMaisVendidos = data.pratos.slice(0, 3); // Seleciona os três primeiros pratos
  const recomendacaoCozinha = data.pratos.slice(3, 8); // Seleciona os próximos cinco pratos

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.firstSectionTitle}>Os mais vendidos do dia</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.horizontalScroll}>
        {pratosMaisVendidos.map(prato => (
          <Card key={prato.id} style={styles.card}>
            <Card.Cover source={{ uri: prato.img }} style={styles.cardImage} />
            <Card.Content>
              <Title style={styles.cardTitle}>{prato.nome}</Title>
              <Paragraph style={styles.cardDescription}>{prato.descricao}</Paragraph>
              <Text>{`R$ ${prato.valorReais.toFixed(2)} / ${prato.valorPontos} pontos`}</Text>
              <Text style={styles.categoria}>{prato.categoria}</Text>
            </Card.Content>
          </Card>
        ))}
      </ScrollView>

      <Text style={styles.sectionTitle}>Recomendação da cozinha</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.horizontalScroll}>
        {recomendacaoCozinha.map(prato => (
          <Card key={prato.id} style={styles.card}>
            <Card.Cover source={{ uri: prato.img }} style={styles.cardImage} />
            <Card.Content>
              <Title style={styles.cardTitle}>{prato.nome}</Title>
              <Paragraph style={styles.cardDescription}>{prato.descricao}</Paragraph>
              <Text>{`R$ ${prato.valorReais.toFixed(2)} / ${prato.valorPontos} pontos`}</Text>
              <Text style={styles.categoria}>{prato.categoria}</Text>
            </Card.Content>
          </Card>
        ))}
      </ScrollView>

      <Text style={styles.sectionTitle}>Nossa casa</Text>
      <View style={styles.nossaCasaContainer}>
        <Image source={{ uri: 'https://wallpapers.com/images/hd/restaurant-steak-dinner-over-fireplace-9deedgcb2up9t4dj.jpg' }} style={styles.nossaCasaImage} />
        <View style={styles.overlay} />
        <Text style={styles.nossaCasaText}>Rua Rio Grande, 678 Vila A - Foz do Iguaçu</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 10,
  },
  firstSectionTitle: {
    fontSize: 20,
    marginVertical: 10,
    marginBottom: 24,
    marginTop: 24
  },
  sectionTitle: {
    fontSize: 20,
    marginVertical: 10,
    marginBottom: 24,
  },
  horizontalScroll: {
    marginBottom: 24,
  },
  card: {
    width: 200,
    marginRight: 10,
    marginBottom: 10,
    borderRadius: 10,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
    overflow: 'hidden',
  },
  cardImage: {
    height: 100,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  cardDescription: {
    fontSize: 12,
    color: '#666',
    marginBottom: 10,
  },
  categoria: {
    marginTop: 5,
    fontWeight: 'bold',
    color: 'tomato',
  },
  nossaCasaContainer: {
    alignItems: 'center',
    position: 'relative', // Adicionada para permitir a sobreposição
  },
  nossaCasaImage: {
    width: '100%',
    height: 200,
    borderRadius: 10, // Arredondando as bordas da imagem
    marginBottom: 48
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Adiciona um filtro escuro sobre a imagem
    borderRadius: 10, // Arredondando as bordas do filtro para coincidir com a imagem
    marginBottom: 48
  },
  nossaCasaText: {
    position: 'absolute',
    bottom: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    padding: 10,
    borderRadius: 20,
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold',
    marginBottom: 48
  },
});

export default HomeScreen;