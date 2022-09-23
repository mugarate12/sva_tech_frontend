import { 
  MenuIcon
} from '@heroicons/react/solid';
import { useRouter } from 'next/router';

const Header = () => {
  const router = useRouter();

  return (
    <header 
      data-theme='dark'
      className={`
        md:hidden
        h-[60px] w-full absolute top-0 left-0
        pl-2 pr-2 md:pl-[47px]
        flex justify-between items-center
        z-30
        ${router.pathname === '/' || router.pathname.includes('login') ? 'hidden' : ''}
      `}
    >
      <nav className='flex justify-between items-center'>
        <button className="btn btn-circle btn-outline md:hidden" data-theme='dark' onClick={() => {}}>
          <MenuIcon className="h-7 w-7 text-black-500"/>
        </button>
      </nav>

      <div className="avatar">
        <div className="w-10 rounded-full">
          <img src="https://placeimg.com/192/192/people" title='imagem do usuário' />
        </div>
      </div>
    </header>
  )
}

export default Header;