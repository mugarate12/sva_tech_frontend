import {
  ButtonHTMLAttributes,
} from 'react';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
}

const Button = ({ className, ...rest }: Props) => {
  return <button {...rest} className={`btn btn-sm ${className}`}></button>
}

export default Button;