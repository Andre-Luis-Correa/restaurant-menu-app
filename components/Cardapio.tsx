import React, { useState } from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import { Text, Card, Title, Paragraph } from 'react-native-paper';
import { Prato, Cardapio as CardapioProps } from '../types/types';
import data from '../assets/data.json';

const Cardapio: React.FC = () => {
  const cardapio: CardapioProps = data;

  const [categoriaSelecionada, setCategoriaSelecionada] = useState<string>('Todas');
  const [precoMaximo, setPrecoMaximo] = useState<number | null>(null);

  const categorias = ['Todas', ...Array.from(new Set(cardapio.pratos.map(prato => prato.categoria)))];

  const pratosFiltrados = cardapio.pratos.filter(prato => {
    const categoriaMatch = categoriaSelecionada === 'Todas' || prato.categoria === categoriaSelecionada;
    const precoMatch = precoMaximo === null || prato.valorReais <= precoMaximo;
    return categoriaMatch && precoMatch;
  });

  return (
    <View style={styles.container}>
      {/* Filtro por Categoria */}
      <Text style={styles.filterLabel}>Filtrar por Categoria:</Text>
      <FlatList
        horizontal
        data={categorias}
        renderItem={({ item }) => (
          <Text
            style={[
              styles.filterOption,
              item === categoriaSelecionada && styles.filterOptionSelected
            ]}
            onPress={() => setCategoriaSelecionada(item)}
          >
            {item}
          </Text>
        )}
        keyExtractor={(item) => item}
        style={styles.filterContainer}
      />

      {/* Filtro por Preço */}
      <Text style={styles.filterLabel}>Filtrar por Preço Máximo:</Text>
      <FlatList
        horizontal
        data={[10, 20, 30, 40, 50, 100]} // Exemplo de preços para filtrar
        renderItem={({ item }) => (
          <Text
            style={[
              styles.filterOption,
              precoMaximo === item && styles.filterOptionSelected
            ]}
            onPress={() => setPrecoMaximo(precoMaximo === item ? null : item)}
          >
            {`R$ ${item.toFixed(2)}`}
          </Text>
        )}
        keyExtractor={(item) => item.toString()}
        style={styles.filterContainer}
      />

      <FlatList
        data={pratosFiltrados}
        renderItem={({ item }) => (
          <Card style={styles.card}>
            <Card.Cover source={{ uri: item.img }} style={styles.cardImage} />
            <Card.Content>
              <Title style={styles.cardTitle}>{item.nome}</Title>
              <Paragraph style={styles.cardDescription}>{item.descricao}</Paragraph>
              <Text>{`R$ ${item.valorReais.toFixed(2)} / ${item.valorPontos} pontos`}</Text>
              <Text style={styles.categoria}>{item.categoria}</Text>
            </Card.Content>
          </Card>
        )}
        keyExtractor={(item) => item.id}
        style={styles.flatList}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 10,
    backgroundColor: '#f0f0f0', // Cor de fundo levemente cinza
  },
  filterContainer: {
    marginBottom: 10,
  },
  filterLabel: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    paddingLeft: 10,
  },
  filterOption: {
    fontSize: 16,
    marginHorizontal: 5,
    padding: 8,
    backgroundColor: '#ddd',
    borderRadius: 5,
  },
  filterOptionSelected: {
    backgroundColor: '#333',
    color: '#fff',
  },
  flatList: {
    marginTop: 10,
  },
  card: {
    width: '100%',
    marginBottom: 20,
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
    height: 150,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  cardDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 10,
  },
  categoria: {
    marginTop: 5,
    fontWeight: 'bold',
    color: 'tomato',
  },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});

export default Cardapio;