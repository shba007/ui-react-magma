import { useRef } from 'react';
// @ts-ignore
import { ReactComponent as IconLogo } from '../assets/logo.svg';

export default function SectionHero() {
  const videoRef = useRef<HTMLVideoElement>(null);

  if (videoRef.current) videoRef.current.disablePictureInPicture = false;

  return (
    <section
      className="relative h-screen -z-10"
      data-scroll
      data-scroll-speed="-5"
    >
      <video
        className="absolute top-0 left-0 w-screen h-screen object-cover -z-10"
        ref={videoRef}
        src="/videos/Hero.mp4"
        preload="auto"
        autoPlay
        loop
        muted
        playsInline
      />
      <header className="absolute top-0 left-0 right-0 px-8 lg:px-32 pt-10 lg:pt-[3.25rem]">
        <nav className="flex justify-between">
          <IconLogo className="w-[3.5rem] lg:w-[4.5rem] xl:w-[6rem] aspect-square text-white" />
        </nav>
      </header>
      <div className="flex flex-col justify-end mt-auto px-[17rem] py-[9rem] h-full">
        <div className="flex flex-col gap-24">
          <h1 className="text-[6rem] lg:text-[12rem] leading-[12rem] font-light">
            Experience Real
            <br /> Estate Agility
          </h1>
          <div className="flex gap-16 items-start">
            <h3 className="max-w-[48rem] text-[2.4rem] font-light">
              Create a digital twin of your existing building and release the
              potential of Web3.
            </h3>
            <button className="rounded-full px-24 py-7 text-[1.8rem] text-[#183bd6] uppercase font-medium bg-white">
              learn more
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
