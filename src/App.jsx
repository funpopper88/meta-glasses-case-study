import Nav from './components/Nav'
import Footer from './components/Footer'
import Hero from './sections/Hero'
import Research from './sections/Research'
import Action from './sections/Action'
import Communication from './sections/Communication'
import Evaluation from './sections/Evaluation'
import FAQ from './sections/FAQ'

function Backdrop() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden" aria-hidden>
      <div className="bg-grid absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,black_20%,transparent_75%)]" />
      <div className="absolute -top-40 left-1/2 h-[600px] w-[1000px] -translate-x-1/2 rounded-full bg-[#0b1d4a]/50 blur-[140px]" />
      <div className="absolute -bottom-40 -right-40 h-[500px] w-[700px] rounded-full bg-[#0a1a40]/50 blur-[140px]" />
    </div>
  )
}

export default function App() {
  return (
    <>
      <Backdrop />
      <Nav />
      <main>
        <Hero />
        <Research />
        <Action />
        <Communication />
        <Evaluation />
        <FAQ />
      </main>
      <Footer />
    </>
  )
}
