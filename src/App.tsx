import { useEffect, useRef, useState, Fragment } from 'react';
import LocomotiveScroll from 'locomotive-scroll';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import 'locomotive-scroll/dist/locomotive-scroll.css';

import SectionHero from './components/SectionHero';
import SectionBrief from './components/SectionBrief';
import SectionWorkspace from './components/SectionWorkspace';
import AppFooter from './components/AppFooter';

function App() {
  // const scrollRef = useLocomotiveScroll();
  const videoRef = useRef<HTMLVideoElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [globalGsap, setGlobalGsap] = useState<typeof gsap | null>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    setGlobalGsap(gsap);
    // Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll
    const locoScroll = new LocomotiveScroll({
      el: scrollContainerRef.current!,
      smooth: true,
    });
    // Each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
    locoScroll.on('scroll', ScrollTrigger.update);

    // Tell ScrollTrigger to use proxy methods for the "#main" element
    ScrollTrigger.scrollerProxy('#main', {
      scrollTop(value?: number): number | void {
        // Provide type annotations for arguments and return value
        arguments.length
          ? // @ts-ignore
            locoScroll.scrollTo(value!, 0, 0) // Use the non-null assertion operator to handle undefined value
          : // @ts-ignore
            locoScroll.scroll.instance.scroll.y;
      },
      getBoundingClientRect(): DOMRect {
        // Provide type annotation for the return value
        return {
          top: 0,
          left: 0,
          width: window.innerWidth,
          height: window.innerHeight,
        } as DOMRect; // Use type assertion to match the return type
      },
      pinType: scrollContainerRef.current?.style.transform
        ? 'transform'
        : 'fixed', // Use optional chaining and conditional operator
    });

    // Each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll.
    // @ts-ignore
    ScrollTrigger.addEventListener('refresh', () => locoScroll.update());

    // After everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
    ScrollTrigger.refresh();
  }, []);

  if (videoRef.current) videoRef.current.disablePictureInPicture = false;

  return (
    <main id="main" className="relative h-fit font-jost bg-[#183bd6]">
      <video
        className="absolute top-0 left-0 w-screen h-screen object-cover"
        ref={videoRef}
        src="/videos/Hero.mp4"
        preload="auto"
        autoPlay
        loop
        muted
        playsInline
      />
      <div ref={scrollContainerRef} data-scroll data-scroll-speed="-5">
        <SectionHero />
        {!!globalGsap ? (
          <Fragment>
            <SectionBrief
              gsap={globalGsap}
              title="CERTIFY YOUR BUILDING AS A DIGITAL TWIN TOKEN (DTT®)"
              content="The Digital Twin Token is a unique digital asset backed by property
        data. Magma combines your building’s components and systems essential
        information into a DTT®."
            />
            <SectionWorkspace
              gsap={globalGsap}
              type="workshop"
              frameCount={67}
            />
            <SectionBrief
              gsap={globalGsap}
              title="CONNECT THE BUILDING'S TWIN TO YOUR STAKEHOLDERS"
              content="Users connect directly to the DTT® without any intermediaries. 
              As Stakeholder, they have the power to upload and verify information 
              that enriches the Digital Twin Token. A Stakeholder's ability to access 
              validated-data to perform tasks depends on their specific role."
            />
            <SectionWorkspace gsap={globalGsap} type="bridge" frameCount={55} />
            <SectionBrief
              gsap={globalGsap}
              title="INCREASE YOUR DIGITAL TWIN TOKEN’S VALUE"
              content="DTT® data increases the value of your digital asset by 
              lowering operational costs, improving energy use, assisting 
              commercialization, and boosting the liquidity of your building."
            />
            <SectionWorkspace gsap={globalGsap} type="bridge" frameCount={55} />
            <section className="h-screen">
              <video preload="auto" playsInline autoPlay loop muted>
                <source src="videos/Feature.webm" type="video/webm" />
                <source src="videos/Feature.mp4" type="video/mp4" />
              </video>
            </section>
            <AppFooter />
          </Fragment>
        ) : null}
      </div>
    </main>
  );
}

export default App;
