import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import {
  useState
} from 'react';
import { useMedia } from 'use-media';
import { useRouter } from 'next/router';

import {
  Button,
  Form,
  Label,
  Main,
  Input
} from './../components';

import {
  useAlert,
  useUsersOperations
} from './../hooks';

const Home: NextPage = () => {
  const theme = 'dark';
  const cardTheme = 'black';

  const mediumScreen = useMedia({ maxWidth: 768 });
  const alert = useAlert();
  const router = useRouter();
  const usersOp = useUsersOperations();

  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  async function handleLogin() {
    if (!!email || !!password) {
      const login = await usersOp.signIn(email, password); 
      
      if (login) {
        alert.notify('Login realizado com sucesso!', 'success');
        router.push('/content');
      } else {
        alert.notify('Erro ao realizar login, por favor, verifique as informações e tente novamente!', 'error');
      }
    } else {
      alert.notify('Preencha todos os campos!', 'error');
    }
  }

  return (
    <>
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
            <h2 className='font-serif self-start text-2xl mb-1'>Bem vindo!</h2>
            <p className='font-serif self-start text-base mb-5'>Prazer em vê-lo, como está hoje?</p>
          
            <Input 
              type='text' 
              placeholder='Email' 
              belowLabelLeft='Nunca compartilhe seu email!'
              aria-describedby='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            /> 
            
            <Input 
              type='password' 
              placeholder='Senha' 
              aria-describedby='password'
              className='mb-2.5' 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            /> 

            <Button>ENTRAR</Button>
            <Label 
              className='mt-3 w-fit self-center'
              onClick={() => router.push('/users/create')}
            >Você ainda não tem uma conta? Crie uma!</Label>
          </Form>
        </div>
      </Main>
    </>
  )
}

export default Home
