import React from 'react';
import { View, ViewProps } from 'react-native';
import { useTheme } from '../hooks/useTheme';

interface ThemedViewProps extends ViewProps {
  backgroundColor?: 'background' | 'surface' | 'card';
}

export function ThemedView({ style, backgroundColor = 'background', ...props }: ThemedViewProps) {
  const { colors } = useTheme();
  
  return (
    <View
      style={[
        { backgroundColor: colors[backgroundColor] },
        style
      ]}
      {...props}
    />
  );
}