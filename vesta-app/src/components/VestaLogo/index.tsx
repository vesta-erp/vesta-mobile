import React from 'react';
import { Image, StyleProp, ImageStyle } from 'react-native';
import { styles } from './styles';

interface VestaLogoProps {
  isDarkTheme: boolean;
  variant?: 'full' | 'reduced';
  style?: StyleProp<ImageStyle>;
}

export function VestaLogo({ isDarkTheme, variant = 'full', style }: VestaLogoProps) {
  
  const getLogoSource = () => {
    if (variant === 'full') {
      return isDarkTheme
        ? require('../../../assets/images/logo_vesta.png')
        : require('../../../assets/images/logo_vesta_azule.png');
    } else {
      return isDarkTheme
        ? require('../../../assets/images/logo-reduzido_vesta.png')
        : require('../../../assets/images/logo-reduzido_vesta_azule.png');
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