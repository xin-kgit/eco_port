import Navbar from './components/navbar'
import Hero from './components/hero'
import About from './components/about'
import Skills from './components/skills'
import Footer from './components/footer'


function App() {
  return (
    <>
      <Navbar />
      
      
      <main>
        <Hero />
        <About />
        <Skills />
      </main>
      
      
      <Footer />
    </>
  )
}

export default App