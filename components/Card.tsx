import React from 'react';
import { View, Text, Image, StyleSheet, ViewStyle, TextStyle, ImageStyle } from 'react-native';
import { Card as PaperCard, Paragraph, Title } from 'react-native-paper';

interface CardProps {
  imgSrc: string;
  title: string;
  description: string;
  extraInfo: string;
  containerStyle?: ViewStyle;
  imageStyle?: ImageStyle;
  titleStyle?: TextStyle;
  descriptionStyle?: TextStyle;
  extraInfoStyle?: TextStyle;
}

const Card: React.FC<CardProps> = ({
  imgSrc,
  title,
  description,
  extraInfo,
  containerStyle,
  imageStyle,
  titleStyle,
  descriptionStyle,
  extraInfoStyle
}) => {
  return (
    <PaperCard style={[styles.cardContainer, containerStyle]}>
      <PaperCard.Cover source={{ uri: imgSrc }} style={[styles.cardImage, imageStyle]} />
      <PaperCard.Content>
        <Title style={[styles.cardTitle, titleStyle]}>{title}</Title>
        <Paragraph style={[styles.cardDescription, descriptionStyle]}>{description}</Paragraph>
        <Text style={[styles.cardExtraInfo, extraInfoStyle]}>{extraInfo}</Text>
      </PaperCard.Content>
    </PaperCard>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    marginBottom: 20,
  },
  cardImage: {
    width: '100%',
    height: 150,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  cardDescription: {
    fontSize: 14,
    color: '#666',
  },
  cardExtraInfo: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  }
});

export default Card;