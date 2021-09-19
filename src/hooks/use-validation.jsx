import { useReducer } from 'react';

const inputReducer = (state, action) => {
  if (action.type === 'Input') {
    return { value: action.value, isTouched: state.isTouched };
  }
  if (action.type === 'Blur') {
    return { value: state.value, isTouched: true };
  }
  if (action.type === 'Reset') {
    return { value: '', isTouched: false };
  }

  return {
    value: '',
    isTouched: false,
  };
};

const useValidation = (validate) => {
  const [inputState, dispatchInputState] = useReducer(inputReducer, {
    value: '',
    isTouched: false,
  });

  const validValue = validate(inputState.value);
  const hasError = !validValue && inputState.isTouched;

  const valueHandler = (e) => {
    dispatchInputState({ type: 'Input', value: e.target.value });
  };

  const blurHandler = () => {
    dispatchInputState({ type: 'Blur' });
  };
  const resetHandler = () => {
    dispatchInputState({ type: 'Reset' });
  };

  return {
    hasError,
    validValue,
    value: inputState.value,
    valueHandler,
    blurHandler,
    resetHandler,
  };
};

export default useValidation;
