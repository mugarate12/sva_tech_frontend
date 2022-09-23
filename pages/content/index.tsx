import type { NextPage } from 'next';
import Head from 'next/head';
import {
  useState,
  useEffect
} from 'react';

import {
  Main
} from './../../components';

import {
  WordDescription
} from './../../containers';

import {
  useDictionaryOperations
} from './../../hooks';

import {
  Dictionary
} from './../../interfaces';

const Content: NextPage = () => {
  const dictionaryOp = useDictionaryOperations();

  const [ word, setWord ] = useState<Dictionary.WordData | undefined>(undefined);

  async function handleSelectWord(word: string) {
    const response = await dictionaryOp.getWord(word);
    setWord(response);
  }

  useEffect(() => {
    handleSelectWord('hello');
  }, []);

  return (
    <>
      <Head>
        <title>Bem vindo!</title>
        <meta name="description" content="SVA TECH" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Main className='pt-4 flex flex-1 flex-col items-center'>
        <WordDescription word={word} />
      </Main>
    </>
  )
}

export default Content;
