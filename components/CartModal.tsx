import React from 'react';
import { View, Text, Button, Modal, FlatList, StyleSheet } from 'react-native';
import { useCart } from '../context/CartContext';
import { Prato } from '../types/types';

interface CartModalProps {
  visible: boolean;
  onClose: () => void;
}

const CartModal: React.FC<CartModalProps> = ({ visible, onClose }) => {
  const { cart, removeFromCart, clearCart } = useCart();

  const handleCheckout = () => {
    // Implementar a lógica de finalização de pedido
    clearCart();
    onClose();
    alert('Pedido finalizado com sucesso!');
  };

  return (
    <Modal visible={visible} animationType="slide">
      <View style={styles.container}>
        <Text style={styles.title}>Seu Carrinho</Text>
        <FlatList
          data={cart}
          renderItem={({ item }) => (
            <View style={styles.cartItem}>
              <Text>{item.nome}</Text>
              <Button title="Remover" onPress={() => removeFromCart(item.id)} />
            </View>
          )}
          keyExtractor={(item) => item.id}
        />
        <Button title="Finalizar Pedido" onPress={handleCheckout} />
        <Button title="Fechar" onPress={onClose} />
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: 'white',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  cartItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
});

export default CartModal;