import { InputHTMLAttributes } from "react";
import {
  FieldValues,
  Path,
  RegisterOptions,
  UseFormRegister,
} from "react-hook-form";

import styles from "./input.module.scss";

interface InputProps<T extends FieldValues>
  extends InputHTMLAttributes<HTMLInputElement> {
  register: UseFormRegister<T>;
  error?: string;
  options: RegisterOptions;
  name: Path<T>;
}
export const Input = <T extends FieldValues>({
  error,
  register,
  name,
  options,
  ...rest
}: InputProps<T>): JSX.Element => {
  return (
    <div>
      <input
        {...register(name ?? "", options)}
        {...rest}
        className={styles.input}
        autoComplete="off"
        defaultValue=""
      />
      {error && <div>{error}</div>}
    </div>
  );
};
