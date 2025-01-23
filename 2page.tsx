import Link from 'next/link'
import { Button } from "@/components/ui/button"
import Logo from './components/Logo'
import { montserrat } from './lib/fonts'

export default function HomePage() {
  const categories = [
    { name: 'Professional', sports: ['NBA', 'MLB', 'NFL', 'NHL'] },
    { name: 'College', sports: ['Basketball', 'Baseball', 'Football', 'Hockey'] },
  ]

  return (
    <div className={`min-h-screen ${montserrat.className} bg-gradient-to-br from-blue-900 via-blue-600 to-blue-400`}>
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]"></div>
      
      <header className="relative z-10 bg-black/10 backdrop-blur-sm border-b border-white/10 p-4">
        <Logo />
      </header>

      <main className="relative z-10 flex flex-col items-center justify-center p-8">
        <div className="max-w-7xl mx-auto text-center mb-12">
          <h1 className="text-5xl font-bold text-white mb-4 tracking-tight">
            AuraSports
          </h1>
          <p className="text-xl text-blue-100">
            Monitor injuries and performance across professional and collegiate sports
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-12 max-w-7xl mx-auto w-full">
          {categories.map((category) => (
            <div key={category.name} className="flex-1 flex flex-col items-center">
              <h2 className="text-3xl font-bold text-white mb-6 text-center">{category.name}</h2>
              <div className="backdrop-blur-sm bg-white/10 rounded-lg p-6 border border-white/20 w-full">
                <div className="grid grid-cols-2 gap-4">
                  {category.sports.map((sport) => (
                    <Link 
                      key={sport} 
                      href={`/${category.name.toLowerCase()}/${sport.toLowerCase()}`}
                      className="block w-full"
                    >
                      <Button 
                        className="w-full h-16 text-lg bg-white/10 hover:bg-white/20 active:bg-white/30 backdrop-blur-sm border border-white/20 text-white transition-all hover:scale-105 focus:outline-none focus:ring-2 focus:ring-white/50 focus:ring-offset-2 focus:ring-offset-blue-600"
                      >
                        {sport}
                      </Button>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        <footer className="relative z-10 mt-16 text-center text-blue-100">
          <p>Created By: Dr. James Utley, Cade Butera</p>
        </footer>
      </main>
    </div>
  )
}

