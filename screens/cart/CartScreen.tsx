import React, { useState } from 'react';
import { View, StyleSheet, FlatList, Alert } from 'react-native';
import { Text, Button, IconButton, Snackbar, Modal, Portal, RadioButton, Provider, TextInput } from 'react-native-paper';
import { useCart } from '../../context/CartContext';

const CartScreen: React.FC = () => {
  const { cart, addToCart, removeFromCart, decreaseQuantity, clearCart } = useCart();
  const [visible, setVisible] = useState(false);
  const [paymentModalVisible, setPaymentModalVisible] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState<string | null>(null);
  const [appliedPoints, setAppliedPoints] = useState<string>(''); // Pontos aplicados pelo usuário
  const [errorVisible, setErrorVisible] = useState(false); // Estado para exibir a mensagem de erro
  const [isDiscountApplied, setIsDiscountApplied] = useState(false);
  const userPoints = 200; // Pontos disponíveis para o cliente

  const onDismissSnackBar = () => setVisible(false);
  const onDismissErrorSnackBar = () => setErrorVisible(false);

  const calculateTotal = () => {
    return cart.reduce((acc, item) => acc + item.valorReais * item.quantity, 0).toFixed(2);
  };

  const calculateDiscount = () => {
    const pointsToApply = Math.min(Math.max(parseInt(appliedPoints) || 0, 0), userPoints); // Limitar pontos aplicados a 0 ou mais, mas não mais que os pontos disponíveis
    return pointsToApply * 0.1; // Cada ponto equivale a 10 centavos
  };

  const calculateFinalTotal = () => {
    return (parseFloat(calculateTotal()) - calculateDiscount()).toFixed(2);
  };

  const handleCheckout = () => {
    Alert.alert(
      'Confirmação',
      `Você tem certeza que deseja finalizar o pedido? Total: R$ ${calculateFinalTotal()}`,
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'Confirmar',
          onPress: () => {
            setPaymentModalVisible(true); // Mostrar modal de pagamento
          },
        },
      ],
      { cancelable: false }
    );
  };

  const handlePaymentSelection = () => {
    if (selectedPayment) {
      setPaymentModalVisible(false);
      clearCart();
      setVisible(true);
    } else {
      Alert.alert('Erro', 'Selecione uma forma de pagamento para confirmar.');
    }
  };

  const handlePointsChange = (text: string) => {
    const points = parseInt(text);
    if (text === '' || (!isNaN(points) && points >= 0 && points <= userPoints)) {
      setAppliedPoints(text);
      setErrorVisible(false);
      setIsDiscountApplied(true);
    } else {
      setAppliedPoints('');
      setErrorVisible(true);
      setIsDiscountApplied(false);
    }
  };

  return (
    <Provider>
      <View style={styles.container}>
        {cart.length > 0 ? (
          <FlatList
            data={cart}
            renderItem={({ item }) => (
              <View style={styles.cartItem}>
                <View style={styles.itemDetails}>
                  <Text style={styles.itemName}>{item.nome}</Text>
                  <Text style={styles.itemPrice}>R$ {item.valorReais.toFixed(2)} / {item.valorPontos} pontos</Text>
                </View>
                <View style={styles.quantityContainer}>
                  <IconButton
                    icon="minus"
                    size={20}
                    onPress={() => decreaseQuantity(item.id)}
                  />
                  <Text style={styles.quantity}>{item.quantity}</Text>
                  <IconButton
                    icon="plus"
                    size={20}
                    onPress={() => addToCart(item)}
                  />
                </View>
                <IconButton
                  icon="delete"
                  size={20}
                  onPress={() => removeFromCart(item.id)}
                  style={styles.removeButton}
                />
              </View>
            )}
            keyExtractor={(item) => item.id}
          />
        ) : (
          <View style={styles.emptyCartContainer}>
            <Text style={styles.emptyCartText}>Seu carrinho está vazio.</Text>
          </View>
        )}

        {cart.length > 0 && (
          <View>
            <Text style={styles.totalText}>Total: R$ {calculateTotal()}</Text>

            <Text style={styles.pointsText}>Pontos disponíveis: {userPoints}</Text>
            <TextInput
              label="Aplicar Pontos"
              value={appliedPoints}
              onChangeText={handlePointsChange}
              keyboardType="numeric"
              style={styles.pointsInput}
              placeholder="Digite a quantidade de pontos"
              theme={{ colors: { primary: 'black' } }}
            />

            {errorVisible && (
              <Text style={styles.errorText}>Quantidade de pontos informada inválida.</Text>
            )}

            {isDiscountApplied && (
              <>
                <Text style={styles.discountText}>
                  Desconto: R$ {calculateDiscount().toFixed(2)} ({Math.min(parseInt(appliedPoints) || 0, userPoints)} pontos)
                </Text>
                <Text style={styles.totalText}>
                  Total com desconto: R$ {calculateFinalTotal()}
                </Text>
              </>
            )}
          </View>
        )}

        <View style={styles.buttonContainer}>
          <Button
            mode="contained"
            onPress={clearCart}
            style={[styles.actionButton, styles.clearButton]}
            disabled={cart.length === 0}
          >
            Limpar
          </Button>
          <Button
            mode="contained"
            onPress={handleCheckout}
            style={[styles.actionButton, styles.checkoutButton]}
            disabled={cart.length === 0}
          >
            Finalizar
          </Button>
        </View>

        <Snackbar
          visible={visible}
          onDismiss={onDismissSnackBar}
          duration={3000}
          style={styles.snackbar}
        >
          <View style={styles.snackbarContent}>
            <IconButton icon="check-circle" size={24} />
            <Text style={styles.snackbarText}>Pedido finalizado com sucesso!</Text>
          </View>
        </Snackbar>

        <Portal>
          <Modal visible={paymentModalVisible} onDismiss={() => setPaymentModalVisible(false)} contentContainerStyle={styles.modalContainer}>
            <Text style={styles.modalTitle}>Escolha a forma de pagamento:</Text>
            <RadioButton.Group onValueChange={newValue => setSelectedPayment(newValue)} value={selectedPayment}>
              <RadioButton.Item label="Pix" value="pix" />
              <RadioButton.Item label="Dinheiro" value="dinheiro" />
              <RadioButton.Item label="Cartão" value="cartao" />
            </RadioButton.Group>
            <Button
              mode="contained"
              onPress={handlePaymentSelection}
              style={styles.paymentButton}
              disabled={!selectedPayment} // Desativar botão se nenhum método de pagamento estiver selecionado
            >
              Confirmar Pagamento
            </Button>
          </Modal>
        </Portal>
      </View>
    </Provider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f0f0f0',
  },
  cartItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#fff',
    marginBottom: 20,
    borderRadius: 5,
  },
  itemDetails: {
    flex: 1,
  },
  itemName: {
    fontSize: 16,
  },
  itemPrice: {
    fontSize: 14,
    color: 'gray',
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  quantity: {
    fontSize: 16,
    marginHorizontal: 10,
  },
  removeButton: {
    backgroundColor: 'transparent',
  },
  emptyCartContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyCartText: {
    fontSize: 18,
    color: 'gray',
  },
  totalText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 24,
  },
  pointsText: {
    fontSize: 16,
    color: 'green',
    marginBottom: 15,
  },
  pointsInput: {
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 5,
    marginBottom: 15,
  },
  discountText: {
    fontSize: 16,
    color: 'red',
    marginBottom: 24,
  },
  errorText: {
    fontSize: 16,
    color: 'red',
    marginBottom: 24,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  actionButton: {
    flex: 1,
    marginHorizontal: 5,
    borderRadius: 5,
    height: 40,
    justifyContent: 'center',
  },
  clearButton: {
    backgroundColor: '#9999',
  },
  checkoutButton: {
    backgroundColor: '#00cc66',
  },
  snackbar: {
    backgroundColor: '#fff',
    borderRadius: 5,
  },
  snackbarContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  snackbarText: {
    fontSize: 16,
    color: 'green',
  },
  modalContainer: {
    backgroundColor: 'white',
    padding: 20,
    marginHorizontal: 20,
    borderRadius: 10,
  },
  modalTitle: {
    fontSize: 18,
    marginBottom: 10,
  },
  paymentButton: {
    marginTop: 20,
    backgroundColor: 'green',
  },
});

export default CartScreen;