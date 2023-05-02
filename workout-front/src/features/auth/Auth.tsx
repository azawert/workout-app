import { FC } from "react";
import { useForm } from "react-hook-form";

import { Button } from "src/components/ui/button/Button";
import { Input } from "src/components/ui/input/Input";

import styles from "./auth.module.scss";

interface IValues {
  email: string;
  password: string;
}

export const Auth: FC = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<IValues>({
    mode: "onChange",
  });
  const onSubmit = (data: any) => {
    console.log(data);
    reset();
  };
  return (
    <div className="wrapper_inner_page">
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input
          register={register}
          type="text"
          placeholder="Enter your email"
          name={"email"}
          options={{
            required: "Email is required",
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: "Enter valid email",
            },
          }}
          error={errors?.email?.message}
        />
        <Input
          register={register}
          type="password"
          placeholder="Enter password"
          name={"password"}
          options={{
            required: "Password is required",
            minLength: {
              message: "Enter more than 5 symbols",
              value: 5,
            },
          }}
          error={errors?.password?.message}
        />
        <div className={styles.button__wrapper}>
          <div>
            <Button>Login</Button>
          </div>
          <div>
            <Button>Registration</Button>
          </div>
        </div>
      </form>
    </div>
  );
};
