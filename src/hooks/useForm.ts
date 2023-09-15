import {useRef, useState} from "react";
import {InputList, InputProps} from "../components/Checkout/Checkout";
import logEvent from "../utils/logger";

interface UseFormProps {
  formName: string;
  inputs: InputList;
}

export interface InputValidity {
  isValid: boolean;
  errorMessage?: string;
}

export interface InputValidityList {
  [name: string]: InputValidity & {
    touched: boolean
  };
}

const useForm = ({ inputs } : UseFormProps) => {
  const inputsNo = inputs.length;
  const inputsRef = useRef<Map<string, HTMLInputElement | HTMLTextAreaElement>>();
  const inputsNames = Object.keys(inputs);
  const [ inputValidityList, setInputValidityList ] = useState<InputValidityList>(Object.assign({}, ...inputsNames.map((value) => ({
    [value]: {
        isValid: false,
        touched: false,
        errorMessage: undefined,
      }
    })
  )));
  const [ isFormValid, setIsFormValid ] = useState(false);

  function onRefAssign(node: HTMLInputElement | HTMLTextAreaElement, inputName: string) {
    const map = getInputsMap();
    if (node) {
      map.set(inputName, node);
    } else {
      map.delete(inputName);
    }
  }

  function getInputsMap() {
    if (!inputsRef.current) {
      inputsRef.current = new Map();
    }
    return inputsRef.current;
  }

  const runValidation = (input: InputProps, inputName: string, onBlur?: boolean) => {
    const inputValue = getInputsMap()?.get(inputName)!.value;
    logEvent(inputValue);
    let errorMessage;

    const newInputValidityList = { ...inputValidityList };

    const inputIsInvalid = input.validateFunctions.some((validityFunction) => {
      const validateResult = validityFunction(inputValue);

      if (!validateResult.isValid){
        errorMessage = validateResult.errorMessage;
        return true;
      }

      return false;
    });

    if (onBlur)
      newInputValidityList[inputName].touched = true;

    if (inputIsInvalid){
      newInputValidityList[inputName].isValid = false;
      newInputValidityList[inputName].errorMessage = errorMessage;
      logEvent("invalid input");

      setInputValidityList(newInputValidityList)

      return false;
    }

    newInputValidityList[inputName].isValid = true;
    newInputValidityList[inputName].errorMessage = undefined;
    setInputValidityList(newInputValidityList);

    return true;
  }

  const onInputBlur = (inputName: string) => {
    console.log("validating");
    runValidation(inputs[inputName], inputName, true);
  }

  const validateForm = () => {
    const formValid = inputsNames.every(inputName => runValidation(inputs[inputName], inputName));
    console.log(`is form valid: ${formValid}`);
    setIsFormValid(formValid);
    return formValid;
  }

  return {
    inputsRef,
    inputsNo,
    inputsNames,
    isFormValid,
    inputValidityList,
    onRefAssign,
    onInputBlur,
    validateForm,
  }
}

export default useForm;