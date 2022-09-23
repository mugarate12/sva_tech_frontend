import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import {
  useState
} from 'react';
import { useMedia } from 'use-media';

import styles from '../styles/Home.module.css';

import {
  Main,
  Form,
  Input,
  Button
} from './../components';

const Home: NextPage = () => {
  const theme = 'dark';
  const cardTheme = 'black';

  const mediumScreen = useMedia({ maxWidth: 768 });

  const [user, setUser] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  async function handleLogin() {
    // const login = await clientOP.login(user, password);

    // if (Object.keys(login.data).includes('error')) {
    //   if (login.data.error.message) alert.notify(login.data.error.message, 'error');
    //   else alert.notify(login.data.message, 'error');
    // } else {
    //   alert.notify(login.data.message, 'success');


    //   router.push('/clients/anomalias');
    // }
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Login</title>
        <meta name="description" content="SVA TECH" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Main
        dataTheme={mediumScreen ? theme : cardTheme}
        className='flex flex-1 flex-col items-center justify-center'
      >
        <div 
          className='h-screen w-screen flex flex-1 flex-col items-center justify-center
            md:max-h-[500px] md:max-w-fit md:p-8 md:rounded'
          data-theme={theme}
        >
          <div className='mb-16'>
            <Image
              src='/vercel.svg'
              alt='logo'
              width={150}
              height={150}
              layout='fixed'
              className='rounded-full'
            />
          </div>

          <Form
            onSubmit={(e) => {
              e.preventDefault();
              handleLogin();
            }}
          >
            <h2 className='font-serif self-start text-2xl mb-1' data-theme={theme}>Bem vindo!</h2>
            <p className='font-serif self-start text-base mb-5' data-theme={theme}>Prazer em vê-lo, como está hoje?</p>
          
            <Input 
              type='text' 
              placeholder='Usuário' 
              className='' 
              belowLabelLeft='Nunca compartilhe seu usuário!' 
              data-theme={theme}
              value={user}
              onChange={(e) => setUser(e.target.value)}
            /> 
            
            <Input 
              type='password' 
              placeholder='Senha' 
              className='mb-2.5' 
              data-theme={theme}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            /> 

            <Button data-theme={theme} >ENTRAR</Button>
          </Form>
        </div>
      </Main>
    </div>
  )
}

export default Home
