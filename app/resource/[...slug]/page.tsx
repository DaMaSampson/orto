import openSourceSoftwareTools from '@/data/resource/openSourceSoftwareTools'
import openSourceDatabases from '@/data/resource/openSourceDatabases'
import protocolsAndInitiatives from '@/data/resource/protocolsAndInitiatives'
import PostLayout from '@/layouts/PostLayout'
import PostBanner from '@/layouts/PostBanner'

import Card from '@/components/Card'
import { genPageMetadata } from 'app/seo'

const defaultResource = 'openSourceSoftwareTools'
const resources = {
  openSourceSoftwareTools,
  openSourceDatabases,
  protocolsAndInitiatives,
}

export const metadata = genPageMetadata({ title: 'Projects' })

export default async function Projects(props: { params: Promise<{ slug: string[] }> }) {
  const params = await props.params
  const slug = decodeURI(params.slug.join('/'))

  const resourcePost = resources[slug || defaultResource]

  return (
    <>
      <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
        {resourcePost.title}
      </h1>
      {resourcePost.data.map((resourceList) => (
        <div key={resourceList.title} className="divide-y divide-gray-200 dark:divide-gray-700">
          <div className="space-y-2 pb-8 pt-6 md:space-y-5">
            <p className="text-lg leading-7 text-gray-500 dark:text-gray-400">
              {resourceList.title}
            </p>
          </div>
          <div className="container py-12">
            <div className="-m-4 flex flex-wrap">
              {resourceList.data.map((resourceData) => (
                <Card
                  key={resourceData.title}
                  title={resourceData.title}
                  description={resourceData.description}
                  imgSrc={resourceData.imgSrc}
                  href={resourceData.href}
                />
              ))}
            </div>
          </div>
        </div>
      ))}
    </>
  )
}
