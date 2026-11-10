import Nav from './components/Nav'
import Footer from './components/Footer'
import Hero from './sections/Hero'
import { Overview, Problem } from './sections/Overview'
import Research from './sections/Research'
import Process from './sections/Process'
import Solution from './sections/Solution'
import Outcomes from './sections/Outcomes'

export default function App() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Overview />
        <Problem />
        <Research />
        <Process />
        <Solution />
        <Outcomes />
      </main>
      <Footer />
    </>
  )
}
