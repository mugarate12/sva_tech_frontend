import { 
  XIcon
} from '@heroicons/react/solid';

import {
  Button
} from './../../components';

import {
  Dictionary
} from './../../interfaces';

interface Props {
  word?: Dictionary.WordData;
}

const WordDescription = ({
  word
}: Props) => {
  return (
    <div className='h-fit w-80'>
      <div className='w-full flex-row items-center'>
        <Button 
          className='btn btn-circle btn-outline'
        >
          <XIcon className="h-7 w-7 text-black-500"/>
        </Button>
      </div>
    </div>
  )
};

export default WordDescription;
