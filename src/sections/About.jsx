import Img from '../components/Img';
import Reveal from '../components/Reveal';
import { CarvedFrame, Divider } from '../components/Ornaments';

const facts = [
  { value: '143 km', label: 'from Kathmandu' },
  { value: '80 km', label: 'from Pokhara' },
  { value: '8 km', label: 'above the Prithvi Highway' },
];

export default function About() {
  return (
    <section id="about" aria-labelledby="about-title" className="relative overflow-hidden bg-ivory py-24 sm:py-32">
      <div className="container-site grid grid-cols-1 items-center gap-16 lg:grid-cols-12 lg:gap-12">
        {/* Imagery */}
        <Reveal className="relative lg:col-span-6">
          <CarvedFrame className="mr-10 sm:mr-24">
            <Img
              slug="our-exterior-03"
              alt="The brick façade of Bandipur Village Inn glowing at night, with rows of traditional windows"
              sizes="(min-width: 1024px) 40vw, 90vw"
              className="aspect-[4/5] w-full object-cover"
            />
          </CarvedFrame>
          <div className="absolute -bottom-10 right-0 w-[46%] border-[10px] border-ivory shadow-xl sm:-bottom-14">
            <Img
              slug="common-areas-19"
              alt="Carved wooden lattice doors at the inn’s entrance"
              sizes="(min-width: 1024px) 20vw, 45vw"
              className="aspect-square w-full object-cover"
            />
          </div>
        </Reveal>

        {/* Copy */}
        <div className="lg:col-span-5 lg:col-start-8">
          <Reveal>
            <p className="eyebrow">About the Inn</p>
            <h2 id="about-title" className="mt-5 text-4xl sm:text-5xl lg:text-[3.4rem]">
              A tribute to the Newars of <em className="text-terracotta">Bhaktapur</em>
            </h2>
          </Reveal>
          <Reveal delay={100}>
            <p className="mt-8 font-serif text-[1.45rem] leading-snug text-umber-800">
              Bandipur Village Inn is a tribute to the architecture, tradition and culture of Bhaktapur and the Newars.
            </p>
            <p className="mt-5 text-umber-700">
              The hotel is conceptualised as a boutique hotel that combines the ambience of traditional architecture with
              the comfort of contemporary hotel amenities. Brick walls, carved timber lattices and terracotta floors meet
              bright, restful rooms made for unhurried days.
            </p>
            <p className="mt-5 text-umber-700">
              The inn sits in the heart of Bandipur, on the corner of the Tudikhel viewpoint — the ideal place to break the
              journey between Kathmandu and Pokhara, or to stay a while and let the mountains do the talking.
            </p>
          </Reveal>

          <Reveal delay={200}>
            <Divider className="mt-10 text-terracotta" />
            <dl className="mt-8 grid grid-cols-3 gap-4">
              {facts.map((f) => (
                <div key={f.label}>
                  <dt className="sr-only">{f.label}</dt>
                  <dd className="font-serif text-3xl text-umber sm:text-4xl">{f.value}</dd>
                  <dd className="mt-1 text-[0.7rem] uppercase leading-snug tracking-[0.14em] text-umber-600">{f.label}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
