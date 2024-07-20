import { Package2 } from 'lucide-react'
import './App.css'
import InicioProductos from './paginas/productos/InicioProductos'
import { Toaster } from "@/components/ui/toaster"

const App = () => {
  return (
    <>
      <header className="top-0 flex h-16 items-center gap-4 border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 px-4 md:px-14">
        <nav className="flex flex-col md:flex-row items-center gap-6 text-lg font-medium md:text-sm">
          <div className="flex items-center gap-2 text-lg font-semibold md:text-base">
            <Package2 className="h-6 w-6 me-1" />
            <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
              CoMinVi Test
            </h4>
          </div>
        </nav>
      </header>
      <main className="flex justify-center items-center py-6 px-4 lg:px-14">
        <InicioProductos />
      </main>
      <Toaster />
    </>
  )
}

export default App
