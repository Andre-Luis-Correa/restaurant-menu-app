import React, { useState } from 'react';
import { View, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { Card, Text, Button } from 'react-native-paper';
import DateTimePicker from '@react-native-community/datetimepicker';
import data from '../../assets/data.json';

const PedidosScreen: React.FC = () => {
  const [expanded, setExpanded] = useState<string | null>(null);
  const [dataInicial, setDataInicial] = useState<Date | null>(null);
  const [dataFinal, setDataFinal] = useState<Date | null>(null);
  const [showInicialPicker, setShowInicialPicker] = useState(false);
  const [showFinalPicker, setShowFinalPicker] = useState(false);

  const toggleExpand = (id: string) => {
    setExpanded(expanded === id ? null : id);
  };

  const formatarDataBrasileira = (date: Date) => {
    return `${date.getDate().toString().padStart(2, '0')}/${(date.getMonth() + 1)
      .toString()
      .padStart(2, '0')}/${date.getFullYear()}`;
  };

  const filtrarPedidos = () => {
    return data.historicoPedidos.filter((pedido) => {
      const dataPedido = new Date(pedido.data);
      const afterStart = dataInicial ? dataPedido >= dataInicial : true;
      const beforeEnd = dataFinal ? dataPedido <= dataFinal : true;
      return afterStart && beforeEnd;
    });
  };

  const limparFiltros = () => {
    setDataInicial(null);
    setDataFinal(null);
  };

  const pedidosFiltrados = filtrarPedidos();

  return (
    <View style={styles.container}>
      {/* Filtros de Data */}
      <View style={styles.dateFilterContainer}>
        <Button
          mode="outlined"
          onPress={() => setShowInicialPicker(true)}
          style={styles.dateButton}
          labelStyle={styles.dateButtonLabel}
        >
          {dataInicial ? formatarDataBrasileira(dataInicial) : 'Data Inicial'}
        </Button>
      </View>
      <View style={styles.dateFilterContainer}>
        <Button
          mode="outlined"
          onPress={() => setShowFinalPicker(true)}
          style={styles.dateButton}
          labelStyle={styles.dateButtonLabel}
        >
          {dataFinal ? formatarDataBrasileira(dataFinal) : 'Data Final'}
        </Button>
      </View>
      <View style={styles.clearButtonContainer}>
        <Button
          mode="contained"
          onPress={limparFiltros}
          style={styles.clearButton}
          labelStyle={styles.clearButtonLabel}
        >
          Limpar
        </Button>
      </View>

      {showInicialPicker && (
        <DateTimePicker
          value={dataInicial || new Date()}
          mode="date"
          display="default"
          onChange={(event, selectedDate) => {
            setShowInicialPicker(false);
            if (selectedDate) {
              setDataInicial(selectedDate);
            }
          }}
        />
      )}

      {showFinalPicker && (
        <DateTimePicker
          value={dataFinal || new Date()}
          mode="date"
          display="default"
          onChange={(event, selectedDate) => {
            setShowFinalPicker(false);
            if (selectedDate) {
              setDataFinal(selectedDate);
            }
          }}
        />
      )}

      {/* Lista de Pedidos Filtrados */}
      {pedidosFiltrados.length > 0 ? (
        <FlatList
          data={pedidosFiltrados}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => toggleExpand(item.id)}>
              <Card style={styles.card}>
                <Card.Title title={`Pedido ${item.numeroPedido}`} subtitle={`Data: ${formatarDataBrasileira(new Date(item.data))}`} />
                <Card.Content>
                  <Text style={styles.valor}>{`Valor: R$ ${item.valorReais.toFixed(2)} / ${item.valorPontos} pontos`}</Text>
                  {expanded === item.id && (
                    <View style={styles.details}>
                      <Text>{item.descricao}</Text>
                    </View>
                  )}
                </Card.Content>
              </Card>
            </TouchableOpacity>
          )}
          keyExtractor={(item) => item.id}
        />
      ) : (
        <Text style={styles.noResultsText}>Nenhum pedido encontrado para o período selecionado.</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    paddingTop: 24,
    backgroundColor: '#f0f0f0',
  },
  dateFilterContainer: {
    marginBottom: 16,
  },
  clearButtonContainer: {
    marginBottom: 24, // Espaçamento maior antes da lista de pedidos
  },
  dateButton: {
    width: '100%',
    borderRadius: 2,
    borderColor: '#ccc',
    backgroundColor: '#d3d3d3',
  },
  dateButtonLabel: {
    fontSize: 14,
    color: 'black',
  },
  clearButton: {
    backgroundColor: 'tomato',
    borderRadius: 2,
  },
  clearButtonLabel: {
    color: '#fff',
    fontSize: 14,
  },
  card: {
    marginBottom: 16,
    backgroundColor: '#fff',
  },
  valor: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  details: {
    marginTop: 10,
    backgroundColor: '#f9f9f9',
    padding: 10,
    borderRadius: 5,
  },
  noResultsText: {
    fontSize: 16,
    color: 'gray',
    textAlign: 'center',
    marginTop: 20,
  },
});

export default PedidosScreen;
