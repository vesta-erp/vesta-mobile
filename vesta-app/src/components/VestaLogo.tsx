import React from 'react';
import { Image, StyleSheet, StyleProp, ImageStyle } from 'react-native';

interface VestaLogoProps {
  isDarkTheme: boolean;
  variant?: 'full' | 'reduced';
  style?: StyleProp<ImageStyle>;
}

export function VestaLogo({ isDarkTheme, variant = 'full', style }: VestaLogoProps) {
  
  const getLogoSource = () => {
    if (variant === 'full') {
      return isDarkTheme
        ? require('../../assets/images/logo_vesta.png')        // Branca
        : require('../../assets/images/logo_vesta_azule.png'); // Azul
    } else {
      return isDarkTheme
        ? require('../../assets/images/logo-reduzido_vesta.png')        // Branca
        : require('../../assets/images/logo-reduzido_vesta_azule.png'); // Azul
    }
  };

  return (
    <Image
      source={getLogoSource()}
      style={[
        variant === 'full' ? styles.fullLogo : styles.reducedLogo,
        style,
      ]}
      resizeMode="contain"
    />
  );
}

const styles = StyleSheet.create({
  fullLogo: {
    width: 220,
    height: 80,
  },
  reducedLogo: {
    width: 60,
    height: 60,
  },
});