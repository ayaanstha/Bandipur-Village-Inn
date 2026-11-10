import Reveal from './Reveal';

export default function SectionHeading({ eyebrow, title, intro, align = 'left', tone = 'dark', id, className = '' }) {
  const centered = align === 'center';
  const light = tone === 'light';
  return (
    <Reveal className={`${centered ? 'mx-auto text-center' : ''} max-w-2xl ${className}`}>
      {eyebrow && <p className={`eyebrow ${light ? '!text-terracotta-400' : ''} ${centered ? 'justify-center' : ''}`}>{eyebrow}</p>}
      <h2 id={id} className={`mt-5 text-4xl sm:text-5xl lg:text-[3.5rem] ${light ? 'text-ivory-50' : 'text-umber'}`}>
        {title}
      </h2>
      {intro && (
        <p className={`mt-6 text-[1.05rem] leading-relaxed ${light ? 'text-ivory/75' : 'text-umber-700'}`}>{intro}</p>
      )}
    </Reveal>
  );
}
