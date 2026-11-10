import Img from '../components/Img';
import Reveal from '../components/Reveal';
import SectionHeading from '../components/SectionHeading';
import { experiences } from '../data/site';

const NUMERALS = ['I', 'II', 'III', 'IV', 'V'];

export default function Experiences() {
  const [first, ...rest] = experiences;
  return (
    <section id="experiences" aria-labelledby="experiences-title" className="bg-ivory py-24 sm:py-32">
      <div className="container-site">
        <SectionHeading
          id="experiences-title"
          align="center"
          eyebrow="Experiences"
          title={<>Days measured in <em className="text-terracotta">views &amp; footsteps</em></>}
          intro="Bandipur is best discovered slowly — on foot, through its lanes and trails, and from the quiet of a hill crest at dawn."
        />

        {/* Feature */}
        <Reveal className="mt-16 grid grid-cols-1 items-center gap-10 lg:grid-cols-12">
          <div className="overflow-hidden lg:col-span-7">
            <Img slug={first.slug} alt={first.alt} sizes="(min-width: 1024px) 55vw, 100vw" className="aspect-[3/2] w-full object-cover transition duration-1000 hover:scale-[1.03]" />
          </div>
          <div className="lg:col-span-4 lg:col-start-9">
            <span className="font-serif text-6xl italic text-terracotta/80">{NUMERALS[0]}</span>
            <h3 className="mt-3 text-4xl">{first.title}</h3>
            <p className="mt-5 text-umber-700">{first.text}</p>
          </div>
        </Reveal>

        {/* Grid */}
        <ul className="mt-20 grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-4">
          {rest.map((exp, i) => (
            <Reveal as="li" key={exp.title} delay={i * 100} className={i % 2 ? 'lg:mt-16' : ''}>
              <div className="overflow-hidden">
                <Img slug={exp.slug} alt={exp.alt} sizes="(min-width: 1024px) 24vw, (min-width: 640px) 46vw, 100vw" className="aspect-[3/4] w-full object-cover transition duration-1000 hover:scale-[1.04]" />
              </div>
              <div className="mt-6 flex items-baseline gap-4">
                <span className="font-serif text-2xl italic text-terracotta">{NUMERALS[i + 1]}</span>
                <h3 className="text-[1.65rem]">{exp.title}</h3>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-umber-700">{exp.text}</p>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
