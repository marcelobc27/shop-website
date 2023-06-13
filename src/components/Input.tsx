import { FormEventHandler } from "react";

interface InputProps {
  type: string;
  required: boolean;
  value: string | number;
  onChange: any
}

function Input (props: InputProps){
  return(
    <input
      {...props}
      className="border rounded px-3 py-1 w-80"
    />
  )
}

export default Input