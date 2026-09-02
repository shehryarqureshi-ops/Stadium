import { ReactNode } from "react"
import PageHero from "./PageHero"
import PageClose from "../PageClose"
import SiteHeader from "../SiteHeader"

interface PageLayoutProps {
  title: string;
  children: ReactNode;
}

const PageLayout = ({ title, children = 'page_content' }: PageLayoutProps) => {
  return (
    <>
      <SiteHeader />
      <main id="main" tabIndex={-1} className="overflow-x-clip">
        <PageHero title={title} />
        <div className="w-full max-w-content mx-auto py-12 lg:py-20 prose md:prose-lg md:px-0 -mt-96 md:-mt-72">
          <div className="card px-6 pt-12 md:p-24 bg-white rounded-t-2xl md:rounded-t-4xl">
            {children}
          </div>
        </div>
      </main>
      <PageClose />
    </>
  )
}

export default PageLayout