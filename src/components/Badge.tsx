import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {useTheme} from '../contexts/ThemeContext';

interface BadgeProps {
  children: React.ReactNode;
  tone?: 'green' | 'amber' | 'red' | 'slate';
}

const Badge: React.FC<BadgeProps> = ({children, tone = 'slate'}) => {
  const {colors} = useTheme();

  const getBadgeColors = () => {
    switch (tone) {
      case 'green':
        return {
          backgroundColor: colors.success + '20',
          borderColor: colors.success + '40',
          color: colors.success,
        };
      case 'amber':
        return {
          backgroundColor: colors.warning + '20',
          borderColor: colors.warning + '40',
          color: colors.warning,
        };
      case 'red':
        return {
          backgroundColor: colors.error + '20',
          borderColor: colors.error + '40',
          color: colors.error,
        };
      default:
        return {
          backgroundColor: colors.secondary + '20',
          borderColor: colors.secondary + '40',
          color: colors.secondary,
        };
    }
  };

  const badgeColors = getBadgeColors();

  return (
    <View
      style={[
        styles.badge,
        {
          backgroundColor: badgeColors.backgroundColor,
          borderColor: badgeColors.borderColor,
        },
      ]}>
      <Text style={[styles.text, {color: badgeColors.color}]}>{children}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
    borderWidth: 1,
  },
  text: {
    fontSize: 12,
    fontWeight: '600',
  },
});

export default Badge;