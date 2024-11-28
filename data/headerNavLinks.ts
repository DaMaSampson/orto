const headerNavLinks = [
  { href: '/about', title: 'Home' },
  { href: '/latest', title: 'News' },
  { href: '/publication',
    title: 'Publications',
    // hrefs: [
    //   { title: 'OPEN-SOURCE SOFTWARE TOOLS', href: '/topics/next-js' },
    //   { title: 'OPEN-SOURCE DATABASES', href: '/tags/markdown' },
    //   { title: 'PROTOCOLS', href: '/tags/github' },
    // ]
  },
  { href: '/resource',
    title: 'Resources',
    hrefs: [
      { title: 'OPEN-SOURCE SOFTWARE TOOLS', href: '/resource/openSourceSoftwareTools' },
      { title: 'OPEN-SOURCE DATABASES', href: '/resource/openSourceDatabases' },
      { title: 'PROTOCOLS AND INITIATIVES', href: '/resource/protocolsAndInitiatives' },
    ]
  },
  { href: '/contact', title: 'Contact' },
  { href: '/people/member',
    title: 'People',
    hrefs: [
      { title: 'Members', href: '/people/member' },
      { title: 'Collaborators', href: '/people/collaborator' },
    ]
  },
]

export default headerNavLinks
