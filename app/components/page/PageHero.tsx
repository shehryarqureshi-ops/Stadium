interface PageHeroProps {
  title: string;
}

const PageHero = ({ title = 'page_title' }: PageHeroProps) => {
  return (
    <div className="bg-linear-to-b from-black via-[#2178F5] to-white text-white py-44 md:py-54 px-6 md:px-0 h-screen">
      <div className="w-full max-w-content mx-auto">
        <h1 className="text-4xl md:text-6xl font-bold font-display md:w-2/3 md:text-center mx-auto">{title}</h1>
      </div>
    </div>
  )
}

export default PageHero