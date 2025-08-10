import { StyleSheet, Text, TextInput, View } from 'react-native'
import React from 'react'
import { wp } from '@/helpers/common'
import { hp } from '@/helpers/common'
import { theme } from '@/constants/theme'

const Input = (props) => {
  return (
    <View style={[styles.container, props.containerStyles && props.containerStyles]}>
      {props.icon && props.icon}
      <TextInput
        style={{flex: 1}}
        placeholderTextColor={theme.colors.textLight}
        ref={props.inputRef && props.inputRef}
        {...props}
      />
    </View>
  )
}

export default Input

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 18,
        flexDirection: "row",
        alignItems: "center",
        gap: 12,
        borderRadius: theme.radius.xxl,
        justifyContent: "center",
        height: hp(7.2),
        borderWidth: 0.4,
        borderColor: theme.colors.text,
        borderCurve: "continuous",
    }
})