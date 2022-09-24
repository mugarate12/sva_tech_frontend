import type { NextPage } from 'next';
import { GetServerSideProps } from 'next';
import Head from 'next/head';
import {
  useState,
  useEffect,
  useRef
} from 'react';
import { useMedia } from 'use-media';
import InfiniteScroll from 'react-infinite-scroll-component';

import {
  Main
} from './../../components';
import { WordDescription } from './../../containers';
import { useDictionaryOperations } from './../../hooks';
import { Dictionary } from './../../interfaces';
import { userServices } from './../../services';
import { api } from './../../config';
import UsersServices from '../../services/Users.services';

interface Props {
  initialWord: Array<Dictionary.Word>;
}

const Content: NextPage<Props> = ({ initialWord }) => {
  const dictionaryOp = useDictionaryOperations();
  const mediumScreen = useMedia({ maxWidth: 768 });

  const [ word, setWord ] = useState<Dictionary.WordData | undefined>({
    data: initialWord,
    isFavorite: false
  });
  const [ actualTab, setActualTab ] = useState<'word_list' | 'history' | 'favorites'>('word_list');
  
  const [ words, setWords ] = useState<Dictionary.IndexWord>(Dictionary.indexWordDefaultState);
  const [ wordsResults, setWordsResults ] = useState<string[]>([]);

  async function getInitialWords() {
    const words = await dictionaryOp.indexWords({
      limit: 30
    });
    if (words) setWords(words);
    if (words) setWordsResults(words.results);
  }

  async function getInitialHistory() {
    const words = await dictionaryOp.indexFavorites({
      limit: 30
    });

    if (words) setWords(words);
    if (words) setWordsResults(words.results);
  }
  
  async function getInitialFavorites() {
    const words = await dictionaryOp.indexHistory({
      limit: 30
    });

    if (words) setWords(words);
    if (words) setWordsResults(words.results);
  }

  async function getMoreWords() {
    if (words.next) {
      let newWords: Dictionary.IndexWord | undefined = undefined;
      const limit = 30;
      
      if (actualTab === 'word_list') {
        newWords = await dictionaryOp.indexWords({
          limit: limit,
          cursor: words.next,
        });
      } else if (actualTab === 'history') {
        newWords = await dictionaryOp.indexHistory({
          limit: limit,
          cursor: words.next,
        });
      } else {
        newWords = await dictionaryOp.indexFavorites({
          limit: limit,
          cursor: words.next,
        });
      }

      if (newWords) {
        setWords(newWords)
        setWordsResults(wordsResults.concat(newWords.results));
      }
    }
  }

  async function handleSelectWord(word: string) {
    const response = await dictionaryOp.getWord(word);
    setWord(response);
    if (response && window) window.scrollTo(0, 0);
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
  }, []);

  useEffect(() => {
    if (actualTab === 'word_list') {
      getInitialWords();
    } else if (actualTab === 'history') {
      getInitialHistory();
    } else {
      getInitialFavorites();
    }
  }, [ actualTab ]);

  useEffect(() => {
    getInitialWords();
  }, [ mediumScreen ]);

  function renderWords() {
    let wordsHeadquarters: Array<string[]> = [];
    let auxArray: string[] = [];

    for (let index = 0; index < wordsResults.length; index++) {
      const word = wordsResults[index];
      
      if ((index + 1) % 3 === 0) {
        auxArray.push(word);
        wordsHeadquarters.push(auxArray);
        auxArray = [];
        continue;
      }

      if (index === wordsResults.length - 1) {
        auxArray.push(word);
        wordsHeadquarters.push(auxArray);
        continue;
      }

      auxArray.push(word);
    }

    return wordsHeadquarters.map((words, index) => {
      return (
        <div key={index} className='grid grid-cols-3 gap-2 mb-2'>
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

  function renderTab() {
    if (wordsResults.length > 0) {
      return (
        <div className='max-h-[584px] w-80 flex flex-col items-center'>
          <div className="tabs mb-6 md:mb-0">
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

          <h2 className='md:hidden w-full m-0 mb-4 p-0 font-serif text-base text-start'>{formatInformationsTitle()}</h2>

          <div className='w-full flex flex-col gap-4'>
            <InfiniteScroll
              dataLength={wordsResults.length / 3} //This is important field to render the next data
              next={getMoreWords}
              hasMore={true}
              height={mediumScreen ? 232 : 502}
              loader={<p style={{ textAlign: 'center' }}>Carregando mais palavras...</p>}
              endMessage={
                <p style={{ textAlign: 'center' }}>
                  <b>Fim da lista</b>
                </p>
              }
            >
              {renderWords()}
            </InfiniteScroll>
          </div>
        </div>
      )
    }
  }

  return (
    <>
      <Head>
        <title>Bem vindo!</title>
        <meta name="description" content="SVA TECH" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Main className='pt-4 pb-6 
        flex flex-1 flex-col items-center
        md:flex-row md:gap-8 md:justify-center
      '>
        <WordDescription
          className={`w-80 mb-6 ${!word ? 'hidden md:flex' : ''}`}
          word={word}
          onFavoriteWord={() => handleFavoriteWord(word)} 
        />

        
        {renderTab()}
      </Main>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const search = ctx.query.word;

  const word: Array<Dictionary.Word> | undefined = await api.get<Array<Dictionary.Word>>(`/proxy/${search}`)
    .then(response => response.data)
    .catch(error => {
      return undefined;
    });
  
  return {
    props: {
      initialWord: word
    }
  }
}

export default Content;
