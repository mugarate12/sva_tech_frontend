import {
  LabelHTMLAttributes
} from 'react';

const Label = (props: LabelHTMLAttributes<HTMLLabelElement>) => {
  return (
    <label {...props}></label>
  )
}

export default Label;