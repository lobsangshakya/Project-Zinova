import React from "react";
import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  TextStyle,
  ViewStyle,
} from "react-native";
import { colors } from "@/styles/commonStyles";

type ButtonVariant = "filled" | "outline" | "ghost" | "link";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps {
  onPress?: () => void;
  variant?: ButtonVariant;
  size?: ButtonSize;
  disabled?: boolean;
  loading?: boolean;
  children: React.ReactNode;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

export const Button: React.FC<ButtonProps> = ({
  onPress,
  variant = "filled",
  size = "md",
  disabled = false,
  loading = false,
  children,
  style,
  textStyle,
}) => {
  const sizeStyles: Record<
    ButtonSize,
    { height: number; fontSize: number; padding: number }
  > = {
    sm: { height: 36, fontSize: 14, padding: 12 },
    md: { height: 44, fontSize: 16, padding: 16 },
    lg: { height: 55, fontSize: 18, padding: 20 },
  };

  const getVariantStyle = () => {
    const baseStyle: ViewStyle = {
      borderRadius: 16,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      shadowColor: colors.cardShadow,
      shadowOffset: {
        width: 0,
        height: 4,
      },
      shadowOpacity: 0.15,
      shadowRadius: 6,
      elevation: 4,
    };

    switch (variant) {
      case "filled":
        return {
          ...baseStyle,
          backgroundColor: colors.primary,
        };
      case "outline":
        return {
          ...baseStyle,
          backgroundColor: colors.card,
          borderWidth: 2,
          borderColor: colors.primary,
        };
      case "ghost":
        return {
          ...baseStyle,
          backgroundColor: colors.backgroundAlt,
        };
      case "link":
        return {
          backgroundColor: "transparent" as const,
          borderRadius: 16,
          flexDirection: "row" as const,
          alignItems: "center" as const,
          justifyContent: "center" as const,
          paddingHorizontal: 0,
          paddingVertical: 4,
        };
    }
  };

  const getTextColor = () => {
    if (disabled) {
      return colors.textSecondary;
    }

    switch (variant) {
      case "filled":
        return colors.background;
      case "outline":
      case "link":
        return colors.primary;
      case "ghost":
        return colors.text;
    }
  };

  return (
    <Pressable
      onPress={onPress}
      disabled={disabled || loading}
      style={[
        getVariantStyle(),
        variant !== "link" && {
          height: sizeStyles[size].height,
          paddingHorizontal: sizeStyles[size].padding,
        },
        {
          opacity: disabled ? 0.5 : 1,
        },
        style,
      ]}
    >
      {loading ? (
        <ActivityIndicator color={getTextColor()} />
      ) : (
        <Text
          style={StyleSheet.flatten([
            {
              fontSize: sizeStyles[size].fontSize,
              color: getTextColor(),
              textAlign: "center",
              marginBottom: 0,
              fontWeight: variant === "link" ? "500" : "700",
            },
            textStyle,
          ])}
        >
          {children}
        </Text>
      )}
    </Pressable>
  );
};

export default Button;
