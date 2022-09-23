export interface Word {
  word: string;
  phonetic: string;
  phonetics: Array<{
    text: string,
    audio?: string
  }>;
  origin?: string;
  meanings: Array<{
    partOfSpeech: string,
    definitions: Array<{
      definition: string,
      synonyms: Array<string>,
      antonyms: Array<string>,
      example?: string
    }>,
    synonyms: Array<string>;
    antonyms: Array<string>;
  }>;
  license: {
    name: string,
    url: string
  };
  sourceUrls: Array<string>;
};

export type WordData = {
  isFavorite: boolean;
  data: Array<Word>;
};
