import React from 'react';
import { TouchableOpacity, StyleSheet, Text, View } from 'react-native';
import { colors } from '../../utils/colors';

export type Props = {
  label: string;
  onPress: () => void;
  color?: string;
};

const Button: React.FC<Props> = ({ onPress = () => { }, label, color }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.container, { backgroundColor: color || colors.PRIMARY_BLUE }]}>
      <Text style={styles.labelText}>{label}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '90%',
    height: 40,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 8,
    marginVertical: 16,
  },
  labelText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.WHITE
  }
});

export default Button;
