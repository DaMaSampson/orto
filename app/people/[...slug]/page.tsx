import { Authors, allAuthors } from 'contentlayer/generated'
import { MDXLayoutRenderer } from 'pliny/mdx-components'
import AuthorLayout from '@/layouts/AuthorLayout'
import { coreContent } from 'pliny/utils/contentlayer'
import { genPageMetadata } from 'app/seo'

export const metadata = genPageMetadata({ title: 'People' })

export default async function Page(props: { params: Promise<{ slug: string[] }> }) {
  const params = await props.params
  const slug = decodeURI(params.slug.join('/'))

  const authors = allAuthors.filter((p: Authors) => p.slug !== 'default' && p.role == slug)

  return (
    <>
      {authors.map((author) => (
        <AuthorLayout key={author.name} content={{ ...coreContent(author), nested: true }}>
          <MDXLayoutRenderer code={author.body.code} />
        </AuthorLayout>
      ))}
    </>
  )
}
