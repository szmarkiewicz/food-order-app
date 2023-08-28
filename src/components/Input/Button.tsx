import {PropsWithChildren} from "react";

interface ButtonProps{

}

export default function Button(props: PropsWithChildren<ButtonProps>) {
  const { children,  } = props;
  return (<button>
    {children}
  </button>);
}