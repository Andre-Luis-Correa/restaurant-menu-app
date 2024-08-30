import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Image, View, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Avatar } from 'react-native-paper';

import HomeScreen from './screens/home/HomeScreen';
import CardapioScreen from './screens/cardapio/CardapioScreen';
import PedidosScreen from './screens/pedidos/PedidosScreen';
import PerfilScreen from './screens/perfil/PerfilScreen';
import CustomDrawerContent from './components/CustomDrawerContent';
import CartScreen from './screens/cart/CartScreen';
import CartIcon from './components/CartIcon';
import { CartProvider } from './context/CartContext';

const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <CartProvider>
      <NavigationContainer>
        <Drawer.Navigator
          drawerContent={(props) => <CustomDrawerContent {...props} />}
          screenOptions={({ navigation }) => ({

            headerLeft: () => (
              <Ionicons
                name="menu"
                size={30}
                color="white"
                style={{ marginLeft: 10 }}
                onPress={() => navigation.toggleDrawer()}
              />
            ),
            headerRight: () => (
              <View style={styles.headerRightContainer}>
                <CartIcon />
                <Avatar.Text
                  size={36}
                  label="AC" // Você pode substituir "AC" pelas iniciais do usuário.
                  style={styles.avatar}
                  labelStyle={styles.avatarLabel}
                />
              </View>
            ),
            headerStyle: {
              backgroundColor: '#000',
            },
            headerTintColor: '#fff',
            drawerStyle: {
              backgroundColor: '#000',
            },
            drawerActiveTintColor: '#fff',
            drawerActiveBackgroundColor: '#333',
            drawerInactiveTintColor: 'gray',
            sceneContainerStyle: {
              backgroundColor: '#f0f0f0',
            },
          })}
        >
          <Drawer.Screen
            name="Home"
            component={HomeScreen}
            options={{
              drawerIcon: ({ color, size }) => (
                <Ionicons name="home-outline" size={size} color={color} />
              ),
            }}
          />
          <Drawer.Screen
            name="Cardápio"
            component={CardapioScreen}
            options={{
              drawerIcon: ({ color, size }) => (
                <Ionicons name="restaurant-outline" size={size} color={color} />
              ),
            }}
          />
          <Drawer.Screen
            name="Pedidos"
            component={PedidosScreen}
            options={{
              drawerIcon: ({ color, size }) => (
                <Ionicons name="list-outline" size={size} color={color} />
              ),
            }}
          />
          <Drawer.Screen
            name="Carrinho"
            component={CartScreen}
            options={{
              drawerIcon: ({ color, size }) => (
                <Ionicons name="cart-outline" size={size} color={color} />
              ),
            }}
          />
          <Drawer.Screen
            name="Perfil"
            component={PerfilScreen}
            options={{
              drawerIcon: ({ color, size }) => (
                <Ionicons name="person-outline" size={size} color={color} />
              ),
            }}
          />
        </Drawer.Navigator>
      </NavigationContainer>
    </CartProvider>
  );
}

const styles = StyleSheet.create({
  headerRightContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 10,
  },
  avatar: {
    backgroundColor: 'white',
    marginLeft: 15,
    borderRadius: 0, // Faz com que o avatar seja quadrado
  },
  avatarLabel: {
    color: 'tomato',
  },
});
