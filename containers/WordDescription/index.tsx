import { 
  XIcon,
  HeartIcon
} from '@heroicons/react/solid';
import {
  useState,
  useEffect
} from 'react';

import {
  Button
} from './../../components';

import {
  Dictionary
} from './../../interfaces';

interface Props {
  word?: Dictionary.WordData;
  onFavoriteWord?: Function;
  className?: string;
}

interface Meanings {
  text: string;
  antonyms: string;
  synonyms: string;
}

const WordDescription = ({
  word,
  onFavoriteWord,

  className
}: Props) => {
  const [ wordTitle, setWordTitle ] = useState<string>('');
  const [ phoneticsText, setPhoneticsText ] = useState<string[]>([]);
  const [ audioSource, setAudioSource ] = useState<string>('');
  const [ meanings, setMeanings ] = useState<Meanings[]>([]);

  useEffect(() => {
    if (word && word.data.length > 0) {
      setWordTitle(word.data[0].word);

      // set phonetics text
      let wordPhoneticsText: string[] = [];
      word.data.forEach(wordItem => {
        const pronetics = wordItem.phonetics;
        pronetics.forEach(pronetic => {
          if (pronetic.text) wordPhoneticsText.push(pronetic.text);

          if (pronetic.audio) setAudioSource(pronetic.audio);
        });
      });

      setPhoneticsText(wordPhoneticsText);

      // set meanings
      let meaningsText: Meanings[] = [];
      word.data.forEach(wordItem => {
        const meanings = wordItem.meanings;
        meanings.forEach(meaning => {
          let text = '';
          let antonyms = '';
          let synonyms = '';

          text += meaning.partOfSpeech;
          if (meaning.definitions.length > 0) {
            text += ' - ';
            const definition = meaning.definitions[0].definition;
            text += definition;

            antonyms = meaning.antonyms.map(antonym => antonym).join(', ');
            synonyms = meaning.synonyms.map(synonym => synonym).join(', ');
          }

          meaningsText.push({
            text,
            antonyms,
            synonyms
          });
        });
      });

      setMeanings(meaningsText);
    }
  }, [ word ]);

  function renderMeanings() {
    return meanings.map((meaning, index) => {
      let includeMarginBotton = true;
      if (index === meanings.length - 1) includeMarginBotton = false;

      return (
        <div className={`w-full flex flex-col ${includeMarginBotton ? 'mb-2' : ''}`} key={`meaning_${index}`}>
          <p key={index} className='w-full font-serif text-sm text-start'>Definition: {meaning.text}</p>
          {meaning.antonyms ? <p className='w-full font-serif text-sm text-start'>Antonyms: {meaning.antonyms}</p> : null}
          {meaning.synonyms ? <p className='w-full font-serif text-sm text-start'>Synonyms: {meaning.synonyms}</p> : null}
        </div>
      );
    })
  }

  return (
    <div className={`h-fit w-80 flex flex-col gap-4 ${className}`}>
      <div className='md:hidden w-full flex flex-row items-center'>
        <Button 
          className='btn btn-circle btn-outline'
        >
          <XIcon className="h-7 w-7 text-black-500"/>
        </Button>
      </div>

      <div className='min-h-[150px] h-fit w-full pb-6 pt-6 flex flex-col items-center justify-center gap-2 border-2 border-solid border-current'>
        <h2 className='w-full m-0 p-0 font-serif text-base text-center'>{wordTitle}</h2>
        {phoneticsText.map((text, index) => (<p key={index} className='w-full font-serif text-sm text-center'>{text}</p>))}
      </div>

      <audio src={audioSource} controls className='self-center'>
      </audio>

      <div className='w-full flex flex-col gap-0'>
        <h1 className='w-full m-0 p-0 font-serif text-lg text-start'>{meanings.length > 0 ? 'Meanings' : ''}</h1>
        {renderMeanings()}
      </div>

      <div className='w-full flex flex-row justify-end items-center'>
        <Button 
          className='btn btn-circle btn-link' 
          title='Adicionar favorito'
          onClick={() => onFavoriteWord && onFavoriteWord(word)}
        >
          <HeartIcon className={`h-7 w-7 ${ !!word && word.isFavorite ? 'text-red-500' : 'text-black-500' }`}/>
        </Button>
      </div>

      <div className='w-full flex flex-row justify-between items-center'>
        <Button className='btn-info'>
          Voltar
        </Button>
        
        <Button className='btn-info'>
          Próximo
        </Button>
      </div>
    </div>
  )
};

export default WordDescription;
