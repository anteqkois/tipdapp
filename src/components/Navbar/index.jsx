import React, { useState } from 'react';
import Link from 'next/link';
import Hamburger from './Hamburger';
import Button from '../utils/Button';
import Navlink from './Navlink';
import useMediaQuery from 'src/hooks/useMediaQuery';
import useUser from 'src/hooks/useUser';

//TODO add tabindex to desktop version

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const isMobile = useMediaQuery('(max-width: 1024px)', true);
  const { logout } = useUser();

  return isMobile ? (
    <>
      <div className="fixed top-0 left-0 w-full h-12 bg-stone-50 px-2 grid grid-cols-[50px_auto_45px] gap-5 items-center z-50">
        <div className="flex-center">LOGO</div>
        <p className="flex-center text-lg underline decoration-2 decoration-purple-700">anteqkois</p>
        <Hamburger isOpen={isOpen} setIsOpen={setIsOpen} />
      </div>
      <nav
        className={`fixed top-12 -left-full p-2 w-full bg-stone-50 duration-300 ${isOpen ? 'translate-x-full' : 'translate-y-0'}`}
      >
        <ul>
          <li onClick={() => setIsOpen(false)}>
            <Navlink
              href="/dashboard"
              className="flex gap-3 p-4 uppercase font-semibold group rounded-xl text-zinc-600 hover:text-zinc-900 hover:cursor-pointer hover:bg-stone-300"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm7.753 18.305c-.261-.586-.789-.991-1.871-1.241-2.293-.529-4.428-.993-3.393-2.945 3.145-5.942.833-9.119-2.489-9.119-3.388 0-5.644 3.299-2.489 9.119 1.066 1.964-1.148 2.427-3.393 2.945-1.084.25-1.608.658-1.867 1.246-1.405-1.723-2.251-3.919-2.251-6.31 0-5.514 4.486-10 10-10s10 4.486 10 10c0 2.389-.845 4.583-2.247 6.305z" />
              </svg>
              dashboard
            </Navlink>
          </li>
          <li onClick={() => setIsOpen(false)}>
            <Navlink
              href="/tips"
              className="flex gap-3 p-4 uppercase font-semibold group rounded-xl text-zinc-600 hover:text-zinc-900 hover:cursor-pointer hover:bg-stone-300"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                <path d="M12 3c5.514 0 10 3.592 10 8.007 0 4.917-5.145 7.961-9.91 7.961-1.937 0-3.383-.397-4.394-.644-1 .613-1.595 1.037-4.272 1.82.535-1.373.723-2.748.602-4.265-.838-1-2.025-2.4-2.025-4.872-.001-4.415 4.485-8.007 9.999-8.007zm0-2c-6.338 0-12 4.226-12 10.007 0 2.05.738 4.063 2.047 5.625.055 1.83-1.023 4.456-1.993 6.368 2.602-.47 6.301-1.508 7.978-2.536 1.418.345 2.775.503 4.059.503 7.084 0 11.91-4.837 11.91-9.961-.001-5.811-5.702-10.006-12.001-10.006zm-3.5 10c0 .829-.671 1.5-1.5 1.5-.828 0-1.5-.671-1.5-1.5s.672-1.5 1.5-1.5c.829 0 1.5.671 1.5 1.5zm3.5-1.5c-.828 0-1.5.671-1.5 1.5s.672 1.5 1.5 1.5c.829 0 1.5-.671 1.5-1.5s-.671-1.5-1.5-1.5zm5 0c-.828 0-1.5.671-1.5 1.5s.672 1.5 1.5 1.5c.829 0 1.5-.671 1.5-1.5s-.671-1.5-1.5-1.5z" />
              </svg>
              tips
            </Navlink>
          </li>
          <li onClick={() => setIsOpen(false)}>
            <Navlink
              href="/creator"
              className="flex gap-3 p-4 uppercase font-semibold group rounded-xl text-zinc-600 hover:text-zinc-900 hover:cursor-pointer hover:bg-stone-300"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                <path d="M12 2c5.514 0 10 4.486 10 10s-4.486 10-10 10-10-4.486-10-10 4.486-10 10-10zm0-2c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm-3.994 12.964l3.106 3.105-4.112.931 1.006-4.036zm9.994-3.764l-5.84 5.921-3.202-3.202 5.841-5.919 3.201 3.2z" />
              </svg>
              creator
            </Navlink>
          </li>
          <li onClick={() => setIsOpen(false)}>
            <Navlink
              href="/token"
              className="flex gap-3 p-4 uppercase font-semibold group rounded-xl text-zinc-600 hover:text-zinc-900 hover:cursor-pointer hover:bg-stone-300"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                <path d="M12 2c5.514 0 10 4.486 10 10s-4.486 10-10 10-10-4.486-10-10 4.486-10 10-10zm0-2c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm0 18v-1.511h-.5v1.511h-1v-1.511h-2.484l.25-1.489h.539c.442 0 .695-.425.695-.854v-4.444c0-.416-.242-.702-.683-.702h-.817v-1.5h2.5v-1.5h1v1.5h.5v-1.5h1v1.526c2.158.073 3.012.891 3.257 1.812.29 1.09-.429 2.005-1.046 2.228.75.192 1.789.746 1.789 2.026 0 1.742-1.344 2.908-4 2.908v1.5h-1zm-.5-5.503v2.503c1.984 0 3.344-.188 3.344-1.258 0-1.148-1.469-1.245-3.344-1.245zm0-.997c1.105 0 2.789-.078 2.789-1.25 0-1-1.039-1.25-2.789-1.25v2.5z" />
              </svg>
              your token
            </Navlink>
          </li>
          <li onClick={() => setIsOpen(false)}>
            <Navlink
              href="/balance"
              className="flex gap-3 p-4 uppercase font-semibold group rounded-xl text-zinc-600 hover:text-zinc-900 hover:cursor-pointer hover:bg-stone-300"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                <path d="M12.324 7.021l.154.345c.237-.041.52-.055.847-.025l.133.577c-.257-.032-.53-.062-.771-.012l-.092.023c-.464.123-.316.565.098.672.682.158 1.494.208 1.815.922.258.578-.041.973-.541 1.163l.154.346-.325.068-.147-.329c-.338.061-.725.053-1.08-.041l-.1-.584c.294.046.658.087.938.03l.186-.06c.333-.165.231-.582-.264-.681-.367-.083-1.342-.021-1.705-.831-.205-.458-.053-.936.535-1.154l-.161-.361.326-.068m3.82 1.614c-.706-1.648-2.681-2.751-4.409-2.463-1.728.288-2.557 1.857-1.85 3.506.746 1.739 2.888 2.853 4.651 2.414 1.562-.388 2.28-1.887 1.608-3.457zm4.05-5.635l3.766 8.233c-5.433 4.223-12.654-.038-17.951 4.461l-3.766-8.233c4.944-4.779 11.773-.45 17.951-4.461zm3.806 12.014c-6.857 3.939-12.399-1.424-19.5 5.986l-4.5-9.964 1.402-1.462 3.807 8.401-.002.008c7.445-5.592 11.195-1.175 18.109-4.561.294.647.565 1.33.684 1.592z" />
              </svg>
              balance
            </Navlink>
          </li>
          <li onClick={() => setIsOpen(false)}>
            <Navlink
              href="/settings"
              className="flex gap-3 p-4 uppercase font-semibold group rounded-xl text-zinc-600 hover:text-zinc-900 hover:cursor-pointer hover:bg-stone-300"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                <path d="M24 14.187v-4.374c-2.148-.766-2.726-.802-3.027-1.529-.303-.729.083-1.169 1.059-3.223l-3.093-3.093c-2.026.963-2.488 1.364-3.224 1.059-.727-.302-.768-.889-1.527-3.027h-4.375c-.764 2.144-.8 2.725-1.529 3.027-.752.313-1.203-.1-3.223-1.059l-3.093 3.093c.977 2.055 1.362 2.493 1.059 3.224-.302.727-.881.764-3.027 1.528v4.375c2.139.76 2.725.8 3.027 1.528.304.734-.081 1.167-1.059 3.223l3.093 3.093c1.999-.95 2.47-1.373 3.223-1.059.728.302.764.88 1.529 3.027h4.374c.758-2.131.799-2.723 1.537-3.031.745-.308 1.186.099 3.215 1.062l3.093-3.093c-.975-2.05-1.362-2.492-1.059-3.223.3-.726.88-.763 3.027-1.528zm-4.875.764c-.577 1.394-.068 2.458.488 3.578l-1.084 1.084c-1.093-.543-2.161-1.076-3.573-.49-1.396.581-1.79 1.693-2.188 2.877h-1.534c-.398-1.185-.791-2.297-2.183-2.875-1.419-.588-2.507-.045-3.579.488l-1.083-1.084c.557-1.118 1.066-2.18.487-3.58-.579-1.391-1.691-1.784-2.876-2.182v-1.533c1.185-.398 2.297-.791 2.875-2.184.578-1.394.068-2.459-.488-3.579l1.084-1.084c1.082.538 2.162 1.077 3.58.488 1.392-.577 1.785-1.69 2.183-2.875h1.534c.398 1.185.792 2.297 2.184 2.875 1.419.588 2.506.045 3.579-.488l1.084 1.084c-.556 1.121-1.065 2.187-.488 3.58.577 1.391 1.689 1.784 2.875 2.183v1.534c-1.188.398-2.302.791-2.877 2.183zm-7.125-5.951c1.654 0 3 1.346 3 3s-1.346 3-3 3-3-1.346-3-3 1.346-3 3-3zm0-2c-2.762 0-5 2.238-5 5s2.238 5 5 5 5-2.238 5-5-2.238-5-5-5z" />
              </svg>
              settings
            </Navlink>
          </li>
          <li
            onClick={() => {
              setIsOpen(false);
              logout();
            }}
          >
            <div
              href="/settings"
              className="flex gap-3 p-4 uppercase font-semibold group rounded-xl text-zinc-600 hover:text-zinc-900 hover:cursor-pointer hover:bg-stone-300"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                <path d="M16 9v-4l8 7-8 7v-4h-8v-6h8zm-2 10v-.083c-1.178.685-2.542 1.083-4 1.083-4.411 0-8-3.589-8-8s3.589-8 8-8c1.458 0 2.822.398 4 1.083v-2.245c-1.226-.536-2.577-.838-4-.838-5.522 0-10 4.477-10 10s4.478 10 10 10c1.423 0 2.774-.302 4-.838v-2.162z" />
              </svg>
              logout
            </div>
          </li>
        </ul>
      </nav>
    </>
  ) : (
    <div className="fixed top-0 left-0 w-full h-22 bg-stone-50 px-2 grid grid-cols-[50px_auto_100px] gap-5 place-items-center z-50">
      <div className="flex-center">LOGO</div>
      <nav>
        <ul className="flex w-fit rounded-xl m-3 p-1 bg-stone-200">
          <li>
            <Navlink
              href="/dashboard"
              classActive="bg-purple-700 hover:bg-purple-700 hover:text-zinc-900"
              className="flex p-4 uppercase font-semibold group rounded-xl text-zinc-600 hover:text-zinc-900 hover:cursor-pointer hover:bg-stone-300"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm7.753 18.305c-.261-.586-.789-.991-1.871-1.241-2.293-.529-4.428-.993-3.393-2.945 3.145-5.942.833-9.119-2.489-9.119-3.388 0-5.644 3.299-2.489 9.119 1.066 1.964-1.148 2.427-3.393 2.945-1.084.25-1.608.658-1.867 1.246-1.405-1.723-2.251-3.919-2.251-6.31 0-5.514 4.486-10 10-10s10 4.486 10 10c0 2.389-.845 4.583-2.247 6.305z" />
              </svg>
            </Navlink>
          </li>
          <li>
            <Navlink
              href="/tips"
              classActive="bg-purple-700 hover:bg-purple-700 hover:text-zinc-900"
              className="flex p-4 uppercase font-semibold group rounded-xl text-zinc-600 hover:text-zinc-900 hover:cursor-pointer hover:bg-stone-300"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                <path d="M12 3c5.514 0 10 3.592 10 8.007 0 4.917-5.145 7.961-9.91 7.961-1.937 0-3.383-.397-4.394-.644-1 .613-1.595 1.037-4.272 1.82.535-1.373.723-2.748.602-4.265-.838-1-2.025-2.4-2.025-4.872-.001-4.415 4.485-8.007 9.999-8.007zm0-2c-6.338 0-12 4.226-12 10.007 0 2.05.738 4.063 2.047 5.625.055 1.83-1.023 4.456-1.993 6.368 2.602-.47 6.301-1.508 7.978-2.536 1.418.345 2.775.503 4.059.503 7.084 0 11.91-4.837 11.91-9.961-.001-5.811-5.702-10.006-12.001-10.006zm-3.5 10c0 .829-.671 1.5-1.5 1.5-.828 0-1.5-.671-1.5-1.5s.672-1.5 1.5-1.5c.829 0 1.5.671 1.5 1.5zm3.5-1.5c-.828 0-1.5.671-1.5 1.5s.672 1.5 1.5 1.5c.829 0 1.5-.671 1.5-1.5s-.671-1.5-1.5-1.5zm5 0c-.828 0-1.5.671-1.5 1.5s.672 1.5 1.5 1.5c.829 0 1.5-.671 1.5-1.5s-.671-1.5-1.5-1.5z" />
              </svg>
            </Navlink>
          </li>
          <li>
            <Navlink
              href="/creator"
              classActive="bg-purple-700 hover:bg-purple-700 hover:text-zinc-900"
              className="flex p-4 uppercase font-semibold group rounded-xl text-zinc-600 hover:text-zinc-900 hover:cursor-pointer hover:bg-stone-300"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                <path d="M12 2c5.514 0 10 4.486 10 10s-4.486 10-10 10-10-4.486-10-10 4.486-10 10-10zm0-2c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm-3.994 12.964l3.106 3.105-4.112.931 1.006-4.036zm9.994-3.764l-5.84 5.921-3.202-3.202 5.841-5.919 3.201 3.2z" />
              </svg>
            </Navlink>
          </li>
          <li>
            <Navlink
              href="/token"
              classActive="bg-purple-700 hover:bg-purple-700 hover:text-zinc-900"
              className="flex p-4 uppercase font-semibold group rounded-xl text-zinc-600 hover:text-zinc-900 hover:cursor-pointer hover:bg-stone-300"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                <path d="M12 2c5.514 0 10 4.486 10 10s-4.486 10-10 10-10-4.486-10-10 4.486-10 10-10zm0-2c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm0 18v-1.511h-.5v1.511h-1v-1.511h-2.484l.25-1.489h.539c.442 0 .695-.425.695-.854v-4.444c0-.416-.242-.702-.683-.702h-.817v-1.5h2.5v-1.5h1v1.5h.5v-1.5h1v1.526c2.158.073 3.012.891 3.257 1.812.29 1.09-.429 2.005-1.046 2.228.75.192 1.789.746 1.789 2.026 0 1.742-1.344 2.908-4 2.908v1.5h-1zm-.5-5.503v2.503c1.984 0 3.344-.188 3.344-1.258 0-1.148-1.469-1.245-3.344-1.245zm0-.997c1.105 0 2.789-.078 2.789-1.25 0-1-1.039-1.25-2.789-1.25v2.5z" />
              </svg>
            </Navlink>
          </li>
          <li>
            <Navlink
              href="/balance"
              classActive="bg-purple-700 hover:bg-purple-700 hover:text-zinc-900"
              className="flex p-4 uppercase font-semibold group rounded-xl text-zinc-600 hover:text-zinc-900 hover:cursor-pointer hover:bg-stone-300"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                <path d="M12.324 7.021l.154.345c.237-.041.52-.055.847-.025l.133.577c-.257-.032-.53-.062-.771-.012l-.092.023c-.464.123-.316.565.098.672.682.158 1.494.208 1.815.922.258.578-.041.973-.541 1.163l.154.346-.325.068-.147-.329c-.338.061-.725.053-1.08-.041l-.1-.584c.294.046.658.087.938.03l.186-.06c.333-.165.231-.582-.264-.681-.367-.083-1.342-.021-1.705-.831-.205-.458-.053-.936.535-1.154l-.161-.361.326-.068m3.82 1.614c-.706-1.648-2.681-2.751-4.409-2.463-1.728.288-2.557 1.857-1.85 3.506.746 1.739 2.888 2.853 4.651 2.414 1.562-.388 2.28-1.887 1.608-3.457zm4.05-5.635l3.766 8.233c-5.433 4.223-12.654-.038-17.951 4.461l-3.766-8.233c4.944-4.779 11.773-.45 17.951-4.461zm3.806 12.014c-6.857 3.939-12.399-1.424-19.5 5.986l-4.5-9.964 1.402-1.462 3.807 8.401-.002.008c7.445-5.592 11.195-1.175 18.109-4.561.294.647.565 1.33.684 1.592z" />
              </svg>
            </Navlink>
          </li>
          <li>
            <Navlink
              href="/settings"
              classActive="bg-purple-700 hover:bg-purple-700 hover:text-zinc-900"
              className="flex p-4 uppercase font-semibold group rounded-xl text-zinc-600 hover:text-zinc-900 hover:cursor-pointer hover:bg-stone-300"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                <path d="M24 14.187v-4.374c-2.148-.766-2.726-.802-3.027-1.529-.303-.729.083-1.169 1.059-3.223l-3.093-3.093c-2.026.963-2.488 1.364-3.224 1.059-.727-.302-.768-.889-1.527-3.027h-4.375c-.764 2.144-.8 2.725-1.529 3.027-.752.313-1.203-.1-3.223-1.059l-3.093 3.093c.977 2.055 1.362 2.493 1.059 3.224-.302.727-.881.764-3.027 1.528v4.375c2.139.76 2.725.8 3.027 1.528.304.734-.081 1.167-1.059 3.223l3.093 3.093c1.999-.95 2.47-1.373 3.223-1.059.728.302.764.88 1.529 3.027h4.374c.758-2.131.799-2.723 1.537-3.031.745-.308 1.186.099 3.215 1.062l3.093-3.093c-.975-2.05-1.362-2.492-1.059-3.223.3-.726.88-.763 3.027-1.528zm-4.875.764c-.577 1.394-.068 2.458.488 3.578l-1.084 1.084c-1.093-.543-2.161-1.076-3.573-.49-1.396.581-1.79 1.693-2.188 2.877h-1.534c-.398-1.185-.791-2.297-2.183-2.875-1.419-.588-2.507-.045-3.579.488l-1.083-1.084c.557-1.118 1.066-2.18.487-3.58-.579-1.391-1.691-1.784-2.876-2.182v-1.533c1.185-.398 2.297-.791 2.875-2.184.578-1.394.068-2.459-.488-3.579l1.084-1.084c1.082.538 2.162 1.077 3.58.488 1.392-.577 1.785-1.69 2.183-2.875h1.534c.398 1.185.792 2.297 2.184 2.875 1.419.588 2.506.045 3.579-.488l1.084 1.084c-.556 1.121-1.065 2.187-.488 3.58.577 1.391 1.689 1.784 2.875 2.183v1.534c-1.188.398-2.302.791-2.877 2.183zm-7.125-5.951c1.654 0 3 1.346 3 3s-1.346 3-3 3-3-1.346-3-3 1.346-3 3-3zm0-2c-2.762 0-5 2.238-5 5s2.238 5 5 5 5-2.238 5-5-2.238-5-5-5z" />
              </svg>
            </Navlink>
          </li>
        </ul>
      </nav>
      <Button onClick={logout}>LOGOUT</Button>
    </div>
  );
};

export default Navbar;
