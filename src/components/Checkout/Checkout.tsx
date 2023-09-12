import Card from "../UI/Card";
import useForm from "../../hooks/useForm";

interface InputProps {
  name: string;
  errorMessage: string;
}

export default function Checkout() {
  const { formTouched,  } = useForm({
    formName: 'checkout',
    inputsNames: InputNames
  });

  const {
    NAME,
    STREET,
    CITY,
    ZIP_CODE,
    COUNTRY,
    DELIVERY_NOTES,
  } = InputNames;

  return (
    <Card elevation='medium'>
      <form>
        <label htmlFor={NAME}>First and last name</label>
        <input type='text' id={NAME} name={NAME}/>
        <label htmlFor={STREET}>Street name, building and house number</label>
        <input type='text' id={STREET} name={STREET}/>
        <label htmlFor={CITY}>City</label>
        <input type='text' id={CITY} name={CITY}/>
        <label htmlFor={ZIP_CODE}>Zip code</label>
        <input type='text' id={ZIP_CODE} name={ZIP_CODE}/>
        <label htmlFor={COUNTRY}>Country</label>
        <input type='text' id={COUNTRY} name={COUNTRY}/>
        <label htmlFor={DELIVERY_NOTES}>Notes for delivery</label>
        <textarea id={DELIVERY_NOTES} name={DELIVERY_NOTES}/>
        <button>Cancel</button>
        <button type='submit'>Order</button>
      </form>
    </Card>
  )
}