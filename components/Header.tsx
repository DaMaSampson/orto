'use client'

import { useState, useEffect, useRef } from 'react'
import siteMetadata from '@/data/siteMetadata'
import headerNavLinks from '@/data/headerNavLinks'
import Logo from '@/data/logo.svg'
import Link from './Link'
import MobileNav from './MobileNav'
import ThemeSwitch from './ThemeSwitch'
import SearchButton from './SearchButton'

const Header = () => {
  const [activeIndex, setActiveIndex] = useState(null)
  const [activeSubIndex, setActiveSubIndex] = useState(null)
  const menuRef = useRef<HTMLDivElement | null>(null)

  const handleMainClick = (index) => {
    setActiveIndex(activeIndex === index ? null : index) // Toggle main dropdown
    setActiveSubIndex(null) // Close any open submenus
  }

  const handleSubClick = (subIndex) => {
    // if there is no third menu, jump
    setActiveSubIndex(activeSubIndex === subIndex ? null : subIndex) // Toggle sub-dropdown
  }

  const resetMenu = () => {
    setActiveIndex(null)
    setActiveSubIndex(null)
  }

  // Hide dropdowns on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        resetMenu()
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

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
            <div className="hidden text-2xl font-semibold sm:block">{siteMetadata.headerTitle}</div>
          ) : (
            siteMetadata.headerTitle
          )}
        </div>
      </Link>
      <div className="flex items-center space-x-6 leading-5 sm:space-x-8">
        <div
          ref={menuRef}
          className="no-scrollbar hidden items-center space-x-4 overflow-visible sm:flex sm:space-x-6"
        >
          {headerNavLinks.map((link, index) => (
            <div key={link.title} className="relative">
              {/* First Level Main Menu */}
              {link.hrefs ? (
                <button
                  onClick={() => handleMainClick(index)}
                  className="block font-medium text-gray-900 hover:text-primary-500 dark:text-gray-100 dark:hover:text-primary-400"
                >
                  {link.title}
                </button>
              ) : (
                <Link
                  key={link.title}
                  href={link.href}
                  className="block font-medium text-gray-900 hover:text-primary-500 dark:text-gray-100 dark:hover:text-primary-400"
                >
                  {link.title}
                </Link>
              )}

              {/* Second Level Dropdown */}
              {link.hrefs && activeIndex === index && (
                <div className="absolute top-full z-50 mt-2 flex w-40 flex-col rounded-md bg-white shadow-lg dark:bg-gray-800">
                  {link.hrefs.map((secondLink, subIndex) => (
                    <div key={secondLink.title} className="relative">
                      {secondLink.hrefs ? (
                        <button
                          onClick={() => handleSubClick(subIndex)}
                          className="block w-full px-4 py-2 text-left font-medium text-gray-700 hover:bg-primary-500 dark:text-gray-100 dark:hover:bg-primary-400"
                        >
                          {secondLink.title}
                        </button>
                      ) : (
                        <Link
                          key={secondLink.title}
                          href={secondLink.href}
                          className="block px-4 py-2 font-medium text-gray-700 hover:bg-primary-500 dark:text-gray-100 dark:hover:bg-primary-400"
                        >
                          {secondLink.title}
                        </Link>
                      )}

                      {/* Third Level Dropdown */}
                      {secondLink.hrefs && activeSubIndex === subIndex && (
                        <div className="top-0 z-50 mt-0 flex w-40 flex-col rounded-md bg-white shadow-lg dark:bg-gray-800">
                          {secondLink.hrefs.map((thirdLink) => (
                            <Link
                              key={thirdLink.title}
                              href={thirdLink.href}
                              className="block px-4 py-2 font-medium text-gray-700 hover:bg-primary-500 dark:text-gray-100 dark:hover:bg-primary-400"
                            >
                              &nbsp;&#10551;&nbsp;{thirdLink.title}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
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
