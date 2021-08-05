import React from 'react';
import { TouchableOpacity, StyleSheet, Text, View, ActivityIndicator, ViewStyle } from 'react-native';
import { colors } from '../../utils/colors';

export type Props = {
  label: string;
  onPress: () => void;
  color?: string;
  disabled?: boolean;
  loading?: boolean;
};

const Button: React.FC<Props> = ({ onPress = () => { }, label, color, disabled = false, loading = false }) => {
  return (
    <TouchableOpacity
      disabled={disabled}
      onPress={onPress}
      style={[styles.container, { backgroundColor: disabled ? colors.LIGHT_GRAY : color || colors.PRIMARY_BLUE },]}>
      {loading ? <ActivityIndicator size='small' color={colors.PRIMARY_BLUE} /> : <Text style={styles.labelText}>{label}</Text>}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '90%',
    height: 50,
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
