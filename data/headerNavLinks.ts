const headerNavLinks = [
  { href: '/about', title: 'Home' },
  { href: '/latest', title: 'News' },
  {
    href: '/publication',
    title: 'Publications',
    // hrefs: [
    //   { title: 'OPEN-SOURCE SOFTWARE TOOLS', href: '/topics/next-js' },
    //   { title: 'OPEN-SOURCE DATABASES', href: '/tags/markdown' },
    //   { title: 'PROTOCOLS', href: '/tags/github' },
    // ]
  },
  {
    href: '/resource/open-source-software-tools',
    title: 'Resources',
    hrefs: [
      {
        title: 'OPEN-SOURCE SOFTWARE TOOLS',
        href: '/resource/open-source-software-tools',
        hrefs: [
          { title: 'OPTICAL COHERENCE TOMOGRAPHY ANGIOGRAPHY', href: '/resource/open-source-software-tools/optical-coherence-tomography-angiography' },
          {
            title: 'ANTERIOR CHAMBER',
            href: '/resource/open-source-software-tools/anterior-chamber',
          },
        ],
      },
      {
        title: 'OPEN-SOURCE DATABASES',
        href: '/resource/open-source-databases',
        hrefs: [
          { title: 'RETINA',
            href: '/resource/open-source-databases/retina'
          },
          {
            title: 'ANTERIOR CHAMBER',
            href: '/resource/open-source-databases/anterior-chamber',
          },
        ],
      },
      {
        title: 'PROTOCOLS AND INITIATIVES',
        href: '/resource/protocols-and-initiatives',
        hrefs: [
          {
            title: 'PROTOCOLS AND INITIATIVES',
            href: '/resource/protocols-and-initiatives/protocols-and-initiatives',
          },
        ],
      },
      {
        title: 'OPEN-SCIENCE GENERAL RESOURCES',
        href: '/resource/open-science-general-resources',
        hrefs: [
          {
            title: 'OPEN-SCIENCE GENERAL RESOURCES',
            href: '/resource/open-science-general-resources/open-science-general-resources',
          },
        ],
      },
    ],
  },
  { href: '/contact', title: 'Contact' },
  {
    href: '/people/member',
    title: 'People',
    hrefs: [
      { title: 'Members', href: '/people/member' },
      { title: 'Collaborators', href: '/people/collaborator' },
    ],
  },
]

export default headerNavLinks
