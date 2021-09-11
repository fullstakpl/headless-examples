import Head from 'next/head'
import Link from 'next/link'

export default function Layout({children}) {
  return (
    <div className="mx-auto w-full lg:w-3/5">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="navbar shadow-lg bg-neutral text-neutral-content">
        <div className="px-2 mx-2 navbar-start">
        <Link href="/">
          <a className="text-lg font-bold">
            Headless Examples
          </a>
        </Link>
        </div>
        <div className="hidden px-2 mx-2 navbar-center lg:flex">
          <div className="flex items-stretch">
            <Link href="/graphcms">
              <a className="btn btn-ghost btn-sm rounded-btn">
                GraphCMS
              </a>
            </Link>
            <Link href="/strapi">
              <a className="btn btn-ghost btn-sm rounded-btn">
                Strapi
              </a>
            </Link>
            <Link href="/wordpress">
              <a className="btn btn-ghost btn-sm rounded-btn">
                Wordpress
              </a>
            </Link>
          </div>
        </div>
        <div className="navbar-end">
          <a href="">
            <img src="/ghlogowhite.png" className="max-h-10" />
          </a>
        </div>
      </div>

      <main className="bg-indigo-50 px-2 min-h-screen">
        {children}
      </main>

    </div>
  )
}
