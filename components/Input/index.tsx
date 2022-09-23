import {
  InputHTMLAttributes
} from 'react';

interface Props extends InputHTMLAttributes<HTMLInputElement>{
  aboveLabelLeft?: string,
  aboveLabelRight?: string,

  belowLabelLeft?: string,
  belowLabelRight?: string,

  className?: string,	
}

const Input = ({ 
  aboveLabelLeft, 
  aboveLabelRight, 
  belowLabelLeft, 
  belowLabelRight, 
  className, 
  ...rest
}: Props) => {
  function renderAboveLabel() {
    if (aboveLabelRight || aboveLabelLeft) {
      return (
        <label className="label">
          <span className="label-text">{aboveLabelLeft}</span>
          <span className="label-text-alt">{aboveLabelRight}</span>
        </label>
      )
    }
  }
  
  function renderBellowLabel() {
    if (belowLabelLeft || belowLabelRight) {
      return (
        <label className="label">
          <span className="label-text-alt">{belowLabelLeft}</span>
          <span className="label-text-alt">{belowLabelRight}</span>
        </label>
      )
    }
  }

  return (
    <>
      {renderAboveLabel()}

      <input {...rest} className={`input input-bordered w-full max-w-xs input-sm ${className}`} />
    
      {renderBellowLabel()}
    </>
  )
}

export default Input;