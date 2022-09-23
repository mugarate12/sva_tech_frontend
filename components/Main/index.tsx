import { HTMLAttributes } from 'react';

interface Props extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  dataTheme?: string;
}

const Main = ({ className, dataTheme, ...rest }: Props) => {
  return <main 
    { ...rest } 
    className={`h-screen w-screen pl-[5px] md:pl-[50px] pt-[70px] md:pt-[5px] pr-[5px] ${className}`}
    data-theme={!!dataTheme ? dataTheme : 'dark'}
  ></main>
}

export default Main;