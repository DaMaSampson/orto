'use client'

import { Dialog, Transition } from '@headlessui/react'
import { disableBodyScroll, enableBodyScroll, clearAllBodyScrollLocks } from 'body-scroll-lock'
import { Fragment, useState, useEffect, useRef } from 'react'
import Link from './Link'
import headerNavLinks from '@/data/headerNavLinks'

const MobileNav = () => {
  const [navShow, setNavShow] = useState(false)
  const [activeIndex, setActiveIndex] = useState<number | null>(null)
  const [activeSubIndex, setActiveSubIndex] = useState<number | null>(null)
  const navRef = useRef(null)

  interface link {
    href: string
    title: string
    hrefs?: baseLink[]
  }

  interface baseLink {
    href: string
    title: string
  }

  const onToggleNav = () => {
    resetMenu()
    setNavShow((status) => {
      if (status) {
        enableBodyScroll(navRef.current)
      } else {
        // Prevent scrolling
        disableBodyScroll(navRef.current)
      }
      return !status
    })
  }

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

  useEffect(() => {
    return clearAllBodyScrollLocks
  })

  return (
    <>
      <button aria-label="Toggle Menu" onClick={onToggleNav} className="sm:hidden">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          className="h-8 w-8 text-gray-900 hover:text-primary-500 dark:text-gray-100 dark:hover:text-primary-400"
        >
          <path
            fillRule="evenodd"
            d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
            clipRule="evenodd"
          />
        </svg>
      </button>
      <Transition appear show={navShow} as={Fragment} unmount={false}>
        <Dialog as="div" onClose={onToggleNav} unmount={false}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
            unmount={false}
          >
            <div className="fixed inset-0 z-60 bg-black/25" />
          </Transition.Child>

          <Transition.Child
            as={Fragment}
            enter="transition ease-in-out duration-300 transform"
            enterFrom="translate-x-full opacity-0"
            enterTo="translate-x-0 opacity-95"
            leave="transition ease-in duration-200 transform"
            leaveFrom="translate-x-0 opacity-95"
            leaveTo="translate-x-full opacity-0"
            unmount={false}
          >
            <Dialog.Panel className="fixed left-0 top-0 z-70 h-full w-full bg-white opacity-95 duration-300 dark:bg-gray-950 dark:opacity-[0.98]">
              <nav
                ref={navRef}
                className="mt-8 flex h-full basis-0 flex-col items-start overflow-y-auto pl-12 pt-2 text-left"
              >
                {headerNavLinks.map((link: link, index) => (
                  <div key={link.title} className="mb-4">
                    {/* First Level Menu */}
                    {link.hrefs ? (
                      <button
                        onClick={() => handleMainClick(index)}
                        className="w-full text-left text-2xl font-bold tracking-widest text-gray-900 outline outline-0 hover:text-primary-500 dark:text-gray-100 dark:hover:text-primary-400"
                      >
                        {link.title}
                      </button>
                    ) : (
                      <Link
                        key={link.title}
                        href={link.href}
                        onClick={onToggleNav}
                        className="w-full text-left text-2xl font-bold tracking-widest text-gray-900 outline outline-0 hover:text-primary-500 dark:text-gray-100 dark:hover:text-primary-400"
                      >
                        {link.title}
                      </Link>
                    )}

                    {link.hrefs && activeIndex === index && (
                      <div className="ml-4 mt-2 space-y-2">
                        {link.hrefs.map((secondLink: link, subIndex) => (
                          <div key={secondLink.title}>
                            {/* Second Level Menu */}
                            {secondLink.hrefs ? (
                              <button
                                onClick={() => handleSubClick(subIndex)}
                                className="block text-lg font-normal text-gray-600 hover:text-primary-500 dark:text-gray-300 dark:hover:text-primary-400"
                              >
                                {secondLink.title}
                              </button>
                            ) : (
                              <Link
                                key={secondLink.title}
                                href={secondLink.href}
                                onClick={onToggleNav}
                                className="block text-lg font-normal text-gray-600 hover:text-primary-500 dark:text-gray-300 dark:hover:text-primary-400"
                              >
                                {secondLink.title}
                              </Link>
                            )}

                            {secondLink.hrefs && activeSubIndex === subIndex && (
                              <div className="ml-4 mt-2 space-y-2">
                                {secondLink.hrefs.map((thirdLink) => (
                                  <Link
                                    key={thirdLink.title}
                                    href={thirdLink.href}
                                    onClick={onToggleNav}
                                    className="block text-lg font-normal text-gray-600 hover:text-primary-500 dark:text-gray-300 dark:hover:text-primary-400"
                                  >
                                    {thirdLink.title}
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
              </nav>

              <button
                className="fixed right-4 top-7 z-80 h-16 w-16 p-4 text-gray-900 hover:text-primary-500 dark:text-gray-100 dark:hover:text-primary-400"
                aria-label="Toggle Menu"
                onClick={onToggleNav}
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </Dialog.Panel>
          </Transition.Child>
        </Dialog>
      </Transition>
    </>
  )
}

export default MobileNav
