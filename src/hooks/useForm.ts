import {useRef, useState} from "react";
import {InputNames} from "../components/Checkout/Checkout";

interface UseFormProps {
  formName: string;
  inputsNames: typeof InputNames;
}

const useForm = ({ inputsNames } : UseFormProps) => {
  const inputsNo = inputsNames;
  const inputsRef = useRef<Map<any, any>>();
  const [ formTouched, setFormTouched ] = useState(false);
  const [ inputsTouched, setInputsTouched ] = useState([]);

  function onRefAssign(node: HTMLInputElement, inputName: string) {
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

  return {
    onRefAssign,
    getInputsMap,
    formTouched,

  }
}

export default useForm;