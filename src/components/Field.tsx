import { PropsWithChildren } from "react";
import Input from "./Input";

interface FieldProps {
  label: string;
}

function Field(props: PropsWithChildren<FieldProps>) {
  return (
    <label className="block my-2">
      <span className="block text-sm text-gray-600">{props.label}</span>
      {props.children}
    </label>
  );
}

export default Field;
