import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';
import { Prato as PratoProps } from '../types/types';

const Prato: React.FC<PratoProps> = ({ nome, descricao, valorReais }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.nome}>{nome}</Text>
      <Text style={styles.descricao}>{descricao}</Text>
      <Text style={styles.preco}>R$ {valorReais.toFixed(2)}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  nome: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  descricao: {
    fontSize: 14,
    color: '#666',
  },
  preco: {
    fontSize: 16,
    color: '#000',
  }
});

export default Prato;