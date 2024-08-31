import React, { useState } from 'react';
import { View, StyleSheet, FlatList, TextInput, Modal, TouchableOpacity } from 'react-native';
import { Prato, Cardapio as CardapioProps } from '../../types/types';
import data from '../../assets/data.json';
import { Text, Card as PaperCard, Title, Paragraph, IconButton, Button } from 'react-native-paper';
import { useCart } from '../../context/CartContext';

const CardapioScreen: React.FC = () => {
  const cardapio: CardapioProps = data;
  const [categoriaSelecionada, setCategoriaSelecionada] = useState<string>('Todas');
  const [ordenacao, setOrdenacao] = useState<'preco' | 'pontos'>('preco');
  const [ordem, setOrdem] = useState<'asc' | 'desc'>('asc');
  const [busca, setBusca] = useState<string>('');
  const [modalVisible, setModalVisible] = useState(false);

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

      <View style={styles.categoryContainer}>
        <Text style={styles.filterLabel}>Categoria:</Text>
        <TouchableOpacity onPress={() => setModalVisible(true)} style={styles.filterOptionSelected}>
          <Text style={styles.categoryText}>{categoriaSelecionada}</Text>
        </TouchableOpacity>
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.modalView}>
          {categorias.map(categoria => (
            <TouchableOpacity
              key={categoria}
              style={styles.modalButton}
              onPress={() => {
                setCategoriaSelecionada(categoria);
                setModalVisible(false);
              }}
            >
              <Text style={styles.modalButtonText}>{categoria}</Text>
            </TouchableOpacity>
          ))}
          <Button mode="contained" onPress={() => setModalVisible(false)} style={styles.modalCloseButton}>
            Fechar
          </Button>
        </View>
      </Modal>

      <FlatList
        data={pratosFiltrados}
        renderItem={({ item }) => (
          <View style={styles.cardWrapper}>
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
          </View>
        )}
        keyExtractor={(item) => item.id}
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
    borderRadius: 2,
    paddingHorizontal: 10,
    paddingVertical: 8,
    fontSize: 16,
    marginBottom: 20,
    height: 45
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
    textAlign: 'center',
  },
  filterOptionSelected: {
    backgroundColor: '#333',
    color: '#fff',
    padding: 8,
    marginLeft:10
  },
  categoryContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    paddingLeft: 10,
  },
  categoryText: {
    color: '#fff',
    fontSize: 16,
  },
  modalView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.8)',
  },
  modalButton: {
    backgroundColor: '#fff',
    padding: 15,
    marginBottom: 10,
    width: '80%',
    alignItems: 'center',
  },
  modalButtonText: {
    fontSize: 18,
  },
  modalCloseButton: {
    backgroundColor: 'black',
    marginTop: 20,
  },
  cardWrapper: {
    overflow: 'hidden',
    marginBottom: 20,
    borderRadius: 10,
  },
  card: {
    width: '100%',
    borderRadius: 10,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
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