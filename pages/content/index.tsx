import type { NextPage } from 'next';
import { GetStaticProps } from 'next';
import Head from 'next/head';
import {
  useState,
  useEffect
} from 'react';

import {
  Main
} from './../../components';
import { WordDescription } from './../../containers';
import { useDictionaryOperations } from './../../hooks';
import { Dictionary } from './../../interfaces';
import { userServices } from './../../services';
import { api } from './../../config';

const Content: NextPage = () => {
  const dictionaryOp = useDictionaryOperations();

  const [ word, setWord ] = useState<Dictionary.WordData | undefined>(undefined);
  const [ actualTab, setActualTab ] = useState<'word_list' | 'history' | 'favorites'>('word_list');
  
  const [ words, setWords ] = useState<Dictionary.IndexWord>(Dictionary.indexWordDefaultState);

  async function getInitialWords() {
    const words = await dictionaryOp.indexWords({
      limit: 12
    });
    if (words) setWords(words);
  }

  async function handleSelectWord(word: string) {
    const response = await dictionaryOp.getWord(word);
    setWord(response);
  }

  async function handleFavoriteWord(word: Dictionary.WordData | undefined) {
    if (word && word.data.length > 0) {
      if (word.isFavorite) {
        const request = await dictionaryOp.unfavoriteWord(word.data[0].word);
        if (request) await handleSelectWord(word.data[0].word);
      } else {
        const request = await dictionaryOp.favoriteWord(word.data[0].word);
        if (request) await handleSelectWord(word.data[0].word);
      }
    }
  }

  function formatInformationsTitle() {
    if (actualTab === 'word_list') {
      return 'Word List';
    } else if (actualTab === 'history') {
      return 'History';
    } else {
      return 'Favorites';
    }
  }

  useEffect(() => {
    getInitialWords();
    handleSelectWord('hello');
  }, []);

  function renderWords() {
    let wordsHeadquarters: Array<string[]> = [];
    let auxArray: string[] = [];

    for (let index = 0; index < words.results.length; index++) {
      const word = words.results[index];
      
      if ((index + 1) % 3 === 0) {
        auxArray.push(word);
        wordsHeadquarters.push(auxArray);
        auxArray = [];
        continue;
      }

      if (index === words.results.length - 1) {
        auxArray.push(word);
        wordsHeadquarters.push(auxArray);
        continue;
      }

      auxArray.push(word);
    }

    return wordsHeadquarters.map((words, index) => {
      return (
        <div key={index} className='grid grid-cols-3'>
          {words.map((word, index) => {
            return <span 
              key={index} 
              className='h-[50px] w-full btn text-center bg-black rounded'
              onClick={() => handleSelectWord(word)}
            >{word}</span>
          })}
        </div>
      )
    });
  }

  return (
    <>
      <Head>
        <title>Bem vindo!</title>
        <meta name="description" content="SVA TECH" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Main className='pt-4 pb-6 flex flex-1 flex-col items-center'>
        <WordDescription
          className='w-80 mb-6' 
          word={word}
          onFavoriteWord={() => handleFavoriteWord(word)} 
        />

        <div className='w-80 flex flex-col items-center'>
          <div className="tabs mb-6">
            <a 
              className={`tab md:tab-lifted ${actualTab === 'word_list' ? 'tab-active' : ''}`}
              onClick={() => setActualTab('word_list')}
            >Word list</a> 
            <a 
              className={`tab md:tab-lifted ${actualTab === 'history' ? 'tab-active' : ''}`}
              onClick={() => setActualTab('history')}
            >History</a> 
            <a 
              className={`tab md:tab-lifted ${actualTab === 'favorites' ? 'tab-active' : ''}`}
              onClick={() => setActualTab('favorites')}
            >Favorites</a>
          </div>

          <h2 className='w-full m-0 mb-4 p-0 font-serif text-base text-start'>{formatInformationsTitle()}</h2>

          <div className='max-h-[162px] w-full flex flex-col gap-4 overflow-scroll'>
            {renderWords()}
            {/* <div className='grid grid-cols-3'>
              <span className='h-[50px] w-full btn text-center bg-black rounded'>02</span>
              <span className='h-[50px] w-full btn text-center bg-black rounded'>03</span>
              <span className='h-[50px] w-full btn text-center bg-black rounded'>04</span>
            </div>
            <div className='grid grid-cols-3'>
              <span className='h-[50px] w-full btn text-center bg-black rounded'>02</span>
              <span className='h-[50px] w-full btn text-center bg-black rounded'>03</span>
              <span className='h-[50px] w-full btn text-center bg-black rounded'>04</span>
            </div>
            
            <div className='grid grid-cols-3'>
              <span className='h-[50px] w-full btn text-center bg-black rounded'>02</span>
              <span className='h-[50px] w-full btn text-center bg-black rounded'>03</span>
              <span className='h-[50px] w-full btn text-center bg-black rounded'>04</span>
            </div>

            <div className='grid grid-cols-3'>
              <span className='h-[50px] w-full btn text-center bg-black rounded'>02</span>
              <span className='h-[50px] w-full btn text-center bg-black rounded'>03</span>
              <span className='h-[50px] w-full btn text-center bg-black rounded'>04</span>
            </div> */}
            {/* <span className='h-[50px] w-full btn text-center bg-black rounded'>01</span>
            <span className='h-[50px] w-full btn text-center bg-black rounded'>05</span>
            <span className='h-[50px] w-full btn text-center bg-black rounded'>06</span>
            <span className='h-[50px] w-full btn text-center bg-black rounded'>07</span>
            <span className='h-[50px] w-full btn text-center bg-black rounded'>08</span>
            <span className='h-[50px] w-full btn text-center bg-black rounded'>09</span>
            <span className='h-[50px] w-full btn text-center bg-black rounded'>10</span>
            <span className='h-[50px] w-full btn text-center bg-black rounded'>11</span>
            <span className='h-[50px] w-full btn text-center bg-black rounded'>12</span>
            <span className='h-[50px] w-full btn text-center bg-black rounded'>13</span>
            <span className='h-[50px] w-full btn text-center bg-black rounded'>14</span>
            <span className='h-[50px] w-full btn text-center bg-black rounded'>15</span> */}
          </div>
        </div>

      </Main>
    </>
  )
}

export default Content;
