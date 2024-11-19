'use client'

import { useState, useRef } from 'react'
import siteMetadata from '@/data/siteMetadata'
import headerNavLinks from '@/data/headerNavLinks'
import Logo from '@/data/logo.svg'
import Link from './Link'
import MobileNav from './MobileNav'
import ThemeSwitch from './ThemeSwitch'
import SearchButton from './SearchButton'

const Header = () => {
  const [dropdownOpenIndex, setDropdownOpenIndex] = useState<number | null>(null)
  const timeoutRef = useRef<number | null>(null)

  const handleMouseEnter = (index: number) => {
    // Clear any existing timers and open the dropdown
    if (timeoutRef.current) clearTimeout(timeoutRef.current)
    setDropdownOpenIndex(index)
  }

  const handleMouseLeave = () => {
    // Set a delay before closing the dropdown
    timeoutRef.current = window.setTimeout(() => {
      setDropdownOpenIndex(null)
    }, 200) // 200 ms delay
  }

  const headerClass = `flex items-center w-full bg-white dark:bg-gray-950 justify-between py-10 overflow-visible ${
    siteMetadata.stickyNav ? 'sticky top-0 z-50' : ''
  }`

  return (
    <header className={headerClass}>
      <Link href="/" aria-label={siteMetadata.headerTitle}>
        <div className="flex items-center justify-between">
          <div className="mr-3">
            <Logo />
          </div>
          {typeof siteMetadata.headerTitle === 'string' ? (
            <div className="hidden text-2xl font-semibold sm:block">
              {siteMetadata.headerTitle}
            </div>
          ) : (
            siteMetadata.headerTitle
          )}
        </div>
      </Link>
      <div className="flex items-center space-x-6 leading-5 sm:space-x-8">
        <div className="no-scrollbar hidden items-center space-x-4 overflow-visible sm:flex sm:space-x-6">
          {headerNavLinks.map((link, index) => (
            <div
              key={link.title}
              className="relative"
              onMouseEnter={() => handleMouseEnter(index)}
              onMouseLeave={handleMouseLeave}
            >
              <Link
                href={link.href}
                className="block font-medium text-gray-900 hover:text-primary-500 dark:text-gray-100 dark:hover:text-primary-400"
              >
                {link.title}
              </Link>
              {link.hrefs && dropdownOpenIndex === index && (
                <div
                  className="absolute top-full z-50 mt-2 flex w-40 flex-col rounded-md bg-white shadow-lg dark:bg-gray-800"
                  onMouseEnter={() => timeoutRef.current && clearTimeout(timeoutRef.current)}
                  onMouseLeave={handleMouseLeave}
                >
                  {link.hrefs.map((sublink) => (
                    <Link
                      key={sublink.title}
                      href={sublink.href}
                      className="block font-medium px-4 py-2 text-gray-700 hover:bg-primary-500 dark:text-gray-100 dark:hover:bg-primary-400"
                    >
                      {sublink.title}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
        <SearchButton />
        <ThemeSwitch />
        <MobileNav />
      </div>
    </header>
  )
}

export default Header
