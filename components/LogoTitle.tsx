import React from 'react';
import { Image, StyleSheet } from 'react-native';

const LogoTitle: React.FC = () => {
  return (
    <Image
      style={styles.logo}
      source={require('../assets/logo.png')}
    />
  );
};

const styles = StyleSheet.create({
  logo: {
    width: 40,
    height: 40,
    marginLeft: 320, // Ajuste para alinhar melhor a logo
  },
});

export default LogoTitle;