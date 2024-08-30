// src/components/CartIcon.tsx
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useCart } from '../context/CartContext';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { DrawerParamList } from '../types/types'; // Defina os tipos de rotas

const CartIcon: React.FC = () => {
  const { totalItems } = useCart();
  const navigation = useNavigation<NavigationProp<DrawerParamList>>();

  return (
    <TouchableOpacity onPress={() => navigation.navigate('Carrinho')}>
      <View style={styles.container}>
        <Ionicons name="cart-outline" size={30} color="white" />
        {totalItems > 0 && (
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{totalItems}</Text>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
  },
  badge: {
    position: 'absolute',
    right: -6,
    top: -6,
    backgroundColor: 'red',
    borderRadius: 10,
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
});

export default CartIcon;