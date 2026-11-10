import { BookingProvider } from './components/BookingContext';
import BookingDialog from './components/BookingDialog';
import Header from './components/Header';
import Footer from './components/Footer';
import Hero from './sections/Hero';
import About from './sections/About';
import Destination from './sections/Destination';
import Accommodation from './sections/Accommodation';
import Experiences from './sections/Experiences';
import BookingBand from './sections/BookingBand';
import Gallery from './sections/Gallery';
import Contact from './sections/Contact';

export default function App() {
  return (
    <BookingProvider>
      <Header />
      <main id="main">
        <Hero />
        <About />
        <Destination />
        <Accommodation />
        <Experiences />
        <BookingBand />
        <Gallery />
        <Contact />
      </main>
      <Footer />
      <BookingDialog />
    </BookingProvider>
  );
}
