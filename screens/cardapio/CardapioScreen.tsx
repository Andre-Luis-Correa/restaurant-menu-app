import React, { useState } from 'react';
import { View, StyleSheet, FlatList, TextInput } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { Prato, Cardapio as CardapioProps } from '../../types/types';
import data from '../../assets/data.json';
import { Text, Card as PaperCard, Title, Paragraph, IconButton } from 'react-native-paper';
import { useCart } from '../../context/CartContext';

const CardapioScreen: React.FC = () => {
  const cardapio: CardapioProps = data;
  const [categoriaSelecionada, setCategoriaSelecionada] = useState<string>('Todas');
  const [ordenacao, setOrdenacao] = useState<'preco' | 'pontos'>('preco');
  const [ordem, setOrdem] = useState<'asc' | 'desc'>('asc');
  const [busca, setBusca] = useState<string>('');

  const categorias = ['Todas', ...new Set(cardapio.pratos.map(prato => prato.categoria))];

  const pratosFiltrados = cardapio.pratos
    .filter(prato => {
      const categoriaMatch = categoriaSelecionada === 'Todas' || prato.categoria === categoriaSelecionada;
      const buscaMatch = prato.nome.toLowerCase().includes(busca.toLowerCase());
      return categoriaMatch && buscaMatch;
    })
    .sort((a, b) => {
      if (ordenacao === 'preco') {
        return ordem === 'asc' ? a.valorReais - b.valorReais : b.valorReais - a.valorReais;
      } else {
        return ordem === 'asc' ? a.valorPontos - b.valorPontos : b.valorPontos - a.valorPontos;
      }
    });

  const { addToCart } = useCart();

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchInput}
        placeholder="Buscar prato..."
        value={busca}
        onChangeText={setBusca}
      />

      <Text style={styles.filterLabel}>Selecionar categoria:</Text>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={categoriaSelecionada}
          onValueChange={(itemValue) => setCategoriaSelecionada(itemValue)}
          style={styles.picker}
        >
          {categorias.map(categoria => (
            <Picker.Item label={categoria} value={categoria} key={categoria} />
          ))}
        </Picker>
      </View>

      <Text style={styles.filterLabel}>Ordenar por:</Text>
      <View style={styles.ordenacaoContainer}>
        <Text
          style={[
            styles.filterOption,
            ordenacao === 'preco' && styles.filterOptionSelected
          ]}
          onPress={() => setOrdenacao('preco')}
        >
          Preço
        </Text>
        <Text
          style={[
            styles.filterOption,
            ordenacao === 'pontos' && styles.filterOptionSelected
          ]}
          onPress={() => setOrdenacao('pontos')}
        >
          Pontos
        </Text>
        <Text
          style={styles.filterOption}
          onPress={() => setOrdem(ordem === 'asc' ? 'desc' : 'asc')}
        >
          {ordem === 'asc' ? 'Menor Preço' : 'Maior Preço'}
        </Text>
      </View>

      <FlatList
        data={pratosFiltrados}
        renderItem={({ item }) => (
          <PaperCard style={styles.card}>
            <PaperCard.Cover source={{ uri: item.img }} style={styles.cardImage} />
            <PaperCard.Content style={styles.cardContent}>
              <View>
                <Title style={styles.cardTitle}>{item.nome}</Title>
                <Paragraph style={styles.cardDescription}>{item.descricao}</Paragraph>
                <Text style={styles.categoria}>{item.categoria}</Text>
              </View>
              <View style={styles.cardFooter}>
                <Text style={styles.priceText}>{`R$ ${item.valorReais.toFixed(2)} / ${item.valorPontos} pontos`}</Text>
                <IconButton
                  icon="cart-plus"
                  size={24}
                  onPress={() => addToCart(item)}
                />
              </View>
            </PaperCard.Content>
          </PaperCard>
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
    padding: 10,
    backgroundColor: '#f0f0f0',
  },
  searchInput: {
    marginTop: 24,
    backgroundColor: '#e0e0e0',
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 8,
    fontSize: 16,
    marginBottom: 20,
  },
  pickerContainer: {
    backgroundColor: '#e0e0e0',
    borderRadius: 5,
    marginBottom: 20,
  },
  picker: {
    height: 50,
    width: '100%',
  },
  filterLabel: {
    fontSize: 18,
    marginBottom: 10,
    paddingLeft: 10,
  },
  ordenacaoContainer: {
    flexDirection: 'row',
    marginBottom: 20,
    paddingLeft: 10,
  },
  filterOption: {
    fontSize: 16,
    marginHorizontal: 5,
    padding: 8,
    backgroundColor: '#ddd',
    borderRadius: 5,
    textAlign: 'center',
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
  cardContent: {
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 14,
    marginBottom: 5,
  },
  cardDescription: {
    fontSize: 15,
    color: '#666',
    marginBottom: 20,
  },
  categoria: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'tomato',
    marginBottom: 5,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  priceText: {
    fontSize: 16,
  },
});

export default CardapioScreen;