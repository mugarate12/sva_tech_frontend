import { HTMLAttributes } from 'react';

interface Props extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  dataTheme?: string;
}

const Main = ({ className, dataTheme, ...rest }: Props) => {
  return <main 
    { ...rest } 
    className={`h-screen w-screen ${className}`}
    data-theme={!!dataTheme ? dataTheme : 'dark'}
  ></main>
}

export default Main;