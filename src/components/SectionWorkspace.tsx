import { useEffect, useRef } from 'react';
import { gsap as g } from 'gsap';

export default function SectionWorkspace({
  gsap,
  type,
  frameCount,
}: {
  gsap: typeof g;
  type: string;
  frameCount: number;
}) {
  const containerRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const images: HTMLImageElement[] = [];
  const progress = { frame: 1 };

  // Preload the Frames
  for (let i = 1; i < frameCount; i++) {
    const img = new Image();
    img.src = `/ui-react-magma/${type}/frame-${i}.webp`;
    images.push(img);
  }

  function drawFrame(currentFrameIndex: number) {
    const context = canvasRef.current?.getContext('2d');
    if (!context) return;

    const img = images[currentFrameIndex];
    const canvas = context.canvas;
    const hRatio = canvas.width / img.width;
    const vRatio = canvas.height / img.height;
    const ratio = Math.max(hRatio, vRatio);
    const centerShift_x = (canvas.width - img.width * ratio) / 2;
    const centerShift_y = (canvas.height - img.height * ratio) / 2;

    context.clearRect(0, 0, canvas.width, canvas.height);
    context.drawImage(
      img,
      0,
      0,
      img.width,
      img.height,
      centerShift_x,
      centerShift_y,
      img.width * ratio,
      img.height * ratio
    );
  }

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext('2d');
    if (!(containerRef.current && canvas && context)) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const el = `#${type}`;
    gsap.to(progress, {
      frame: frameCount - 2,
      snap: 'frame',
      ease: `none`,
      scrollTrigger: {
        trigger: el,
        start: 'top bottom',
        end: 'bottom bottom',
        scroller: '#main',
        scrub: 0.5,
      },
      onUpdate: () => {
        drawFrame(progress.frame);
      },
    });
  }, []);

  return (
    <section id={type} ref={containerRef} className="h-screen bg-[#183bd6]">
      <canvas
        ref={canvasRef}
        className="relative max-w-[100vw] max-h-[100vh]"
      />
    </section>
  );
}
