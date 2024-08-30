import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { Appbar } from 'react-native-paper';

const Header: React.FC = () => {
  return (
    <Appbar.Header style={styles.headerContainer}>
      <Appbar.Content title="" />
      <Image source={require('../assets/logo.png')} style={styles.logo} />
    </Appbar.Header>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    backgroundColor: '#000', // Fundo preto
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 120,  // Ajuste conforme o tamanho da sua logo
    height: '100%',
    resizeMode: 'contain',
  }
});

export default Header;