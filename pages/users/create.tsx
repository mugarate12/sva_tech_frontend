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
  Input,
} from './../../components';

import {
  useAlert,
  useUsersOperations
} from './../../hooks';

const Home: NextPage = () => {
  const theme = 'dark';
  const cardTheme = 'black';

  const mediumScreen = useMedia({ maxWidth: 768 });
  const alert = useAlert();
  const router = useRouter();
  const usersOp = useUsersOperations();

  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  async function handleCreate() {
    if (!!name || !!email || !!password) {
      const create = await usersOp.signUP(name, email, password); 
      
      if (create) {
        alert.notify('Usuário criado com sucesso!', 'success');
        router.push('/users');
      } else {
        alert.notify('Erro ao criar usuário, por favor, verifique as informações e tente novamente!', 'error');
      }
    } else {
      alert.notify('Preencha todos os campos!', 'error');
    }
  }

  return (
    <>
      <Head>
        <title>CRIAR CONTA</title>
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
              handleCreate();
            }}
          >
            <h2 className='font-serif self-start text-2xl mb-1'>Bem vindo!</h2>
            <p className='font-serif self-start text-base mb-5'>Como gostaria de se indentificar?</p>
          
            <Input 
              type='text' 
              placeholder='Nome' 
              className='mb-2.5'
              aria-describedby='name'
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <Input 
              type='text' 
              placeholder='Email' 
              aria-describedby='email'
              belowLabelLeft='Nunca compartilhe seu email!' 
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

            <Button>Criar conta</Button>
            <Label 
              className='mt-3 w-fit self-center'
              onClick={() => router.push('/')}
            >Já tem uma conta? Faça login!</Label>
          </Form>
        </div>
      </Main>
    </>
  )
}

export default Home
