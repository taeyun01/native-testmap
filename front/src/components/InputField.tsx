import {
  View,
  StyleSheet,
  Dimensions,
  TextInputProps,
  Text,
  Pressable,
  TextInput,
} from 'react-native';
import React, {ForwardedRef, forwardRef, useRef} from 'react';
import {colors} from '../constants';
import {mergeRefs} from '../utils';

const deviceHeight = Dimensions.get('screen').height;

interface InputFieldProps extends TextInputProps {
  disabled?: boolean;
  error?: string;
  touched?: boolean;
}

const InputField = forwardRef(
  (
    {disabled = false, error, touched, ...props}: InputFieldProps,
    ref?: ForwardedRef<TextInput>,
  ) => {
    const innerRef = useRef<TextInput | null>(null); // 인풋 아무곳 클릭해도 포커스 되게끔 설정하기 위해 사용

    const handlePressInput = () => {
      innerRef.current?.focus();
    };

    return (
      <Pressable onPress={handlePressInput}>
        <View
          style={[
            styles.container,
            disabled && styles.disabled,
            touched && Boolean(error) && styles.inputError, // 터치가 된 인풋만 적용(touched가 true이고 error가 true일 때 스타일 적용)
          ]}>
          <TextInput
            ref={ref ? mergeRefs(innerRef, ref) : innerRef}
            editable={!disabled}
            placeholderTextColor={colors.GRAY_500}
            style={[styles.input, disabled && styles.disabled]}
            autoCapitalize="none" // 키보드 열었을 때, 첫 글자 대문자 방지
            spellCheck={false} // 오타 자동 수정 방지 (키보드 열었을때 관련 검색같은거 제거)
            autoCorrect={false} // 오타 자동 수정 방지 (키보드 열었을때 관련 검색같은거 제거)
            {...props}
          />
          {touched && Boolean(error) && (
            <Text style={styles.error}>{error}</Text>
          )}
        </View>
      </Pressable>
    );
  },
);

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: colors.GRAY_200,
    padding: deviceHeight > 700 ? 15 : 10,
    borderRadius: 8,
  },
  input: {
    fontSize: 16,
    color: colors.BLACK,
    padding: 0,
  },
  disabled: {
    backgroundColor: colors.GRAY_200,
    color: colors.GRAY_700,
  },
  inputError: {
    borderWidth: 1,
    borderColor: colors.RED_300,
  },
  error: {
    color: colors.RED_500,
    fontSize: 12,
    marginTop: 5,
  },
});

export default InputField;
