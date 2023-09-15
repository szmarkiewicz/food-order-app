import Card from "../UI/Card";
import useForm, {InputValidity} from "../../hooks/useForm";
import React, {useMemo} from "react";

export interface InputProps {
  type: string;
  label: string;
  validateFunctions: ((value: string) => InputValidity)[];
}

export interface InputList {
  [name: string]: InputProps;
}

const requiredValueResolver = (value: string): InputValidity => !!value ? {
  isValid: true
} : {
  isValid: false,
  errorMessage: "This is a required field",
};
const maxLengthResolver = (maxLength: number) => (value: string): InputValidity => value.length <= maxLength ? {
  isValid: true
} : {
  isValid: false,
  errorMessage: "Value too long",
};

const INPUT_LIST: InputList = {
  'name': {
    type: 'text',
    label: 'First and last name',
    validateFunctions: [
      requiredValueResolver,
      maxLengthResolver(1024)
    ]
  },
  'street': {
    type: 'text',
    label: 'Street name, building and house number, floor',
    validateFunctions: [
      requiredValueResolver,
      maxLengthResolver(4096)
    ]
  },
  'city': {
    type: 'text',
    label: 'City',
    validateFunctions: [
      requiredValueResolver,
      maxLengthResolver(1024)
    ]
  },
  'zip-code': {
    type: 'text',
    label: 'Zip code',
    validateFunctions: [
      requiredValueResolver,
      (value: string) => new RegExp('\\b\\d{5}\\b').test(value) ? {
        isValid: true
      } : {
        isValid: false,
        errorMessage: "The zip code must contain exactly 5 digits",
      },
    ]
  }, 'country': {
    type: 'text',
    label: 'Country',
    validateFunctions: [
      requiredValueResolver,
      maxLengthResolver(1024)
    ]
  }, 'delivery-notes': {
    type: 'text',
    label: 'Notes for delivery',
    validateFunctions: [
      maxLengthResolver(8192)
    ]
  }
};

const FORM_NAME = 'checkout';

export default function Checkout() {
  const {inputsRef, inputsNames, validateForm, onRefAssign, onInputBlur, isFormValid, inputValidityList} = useForm({
    formName: FORM_NAME,
    inputs: INPUT_LIST,
  });

  const InputElements = useMemo(() => inputsNames.map(inputName => {
      return <li key={inputName}>
        <label htmlFor={inputName}>{INPUT_LIST[inputName].label}</label>
        {inputName === 'delivery-notes' ? <textarea id={inputName} name={inputName} ref={(node) => node && onRefAssign(node, inputName)} onBlur={() => onInputBlur(inputName)}/> :
          <input type={INPUT_LIST[inputName].type} id={inputName} name={inputName} ref={(node) => node && onRefAssign(node, inputName)} onBlur={() => onInputBlur(inputName)}/>}
        {!inputValidityList[inputName].isValid && <div className='error-message'>{inputValidityList[inputName].errorMessage}</div>}
      </li>
  }), [inputValidityList]);

  const onCheckoutDataSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    validateForm();

    // TODO: send to backend...
  };

  return (
    <Card elevation='high'>
      <form name={FORM_NAME} onSubmit={onCheckoutDataSubmit}>
        <ul className='checkout--inputs-list'>
          {InputElements}
        </ul>
        <button>Cancel</button>
        <button type='submit'>Order</button>
      </form>
    </Card>
  )
}