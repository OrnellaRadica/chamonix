import Link from "next/link"

const Header = ()=> {
  return(
    <header className="p-4 text-center border-b border-zinc-100">
      <h1>
      <Link href="/collection" className="text-4xl font-medium font-bangers tracking-wide"> Chamonix </Link>
    </h1>
    </header>
  )
}

export default Header