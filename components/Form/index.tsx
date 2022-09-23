import {
  FormHTMLAttributes
} from 'react';

interface Props extends FormHTMLAttributes<HTMLFormElement> {
  className?: string;
}

const Form = ({ className, ...rest }: Props) => {
  return (
    <form { ...rest } className={`form-control w-full max-w-xs ${className}`} ></form>
  )
}

export default Form;