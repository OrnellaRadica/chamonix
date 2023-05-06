import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="bg-white">
      <div aria-hidden="true" className="absolute inset-0 overflow-hidden h-full w-full">
        <Image
          src={"/images/snowboard.jpeg"}
          alt="Hero section"
          fill
          className="object-cover object-center"
          quality={100}
          priority
        />
      </div>
      <div className="relative mx-auto flex bg-black/20 flex-col items-center justify-center min-h-screen px-6 py-32 text-center sm:py-64 lg:px-0">
        <h1 className="text-4xl font-bold tracking-tight text-white lg:text-6xl">
          New arrivals are here
        </h1>
        <h2 className="mt-4 text-xl text-white">
          The new arrivals have, well, newly arrived. <br />
          Check out the best options for the winter season.
        </h2>
        <Link
          href="/collection"
          className="uppercase mt-8 inline-block rounded-md border border-transparent bg-white px-8 py-3 text-base font-medium text-zinc-900 hover:bg-zinc-100"
        >
          Discover
        </Link>
      </div>
    </div>
  );
}
