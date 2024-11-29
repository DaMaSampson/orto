import { defineDocumentType, ComputedFields, makeSource } from 'contentlayer2/source-files'
import { writeFileSync } from 'fs'
import readingTime from 'reading-time'
import { slug } from 'github-slugger'
import path from 'path'
import { fromHtmlIsomorphic } from 'hast-util-from-html-isomorphic'
// Remark packages
import remarkGfm from 'remark-gfm'
import remarkMath from 'remark-math'
import { remarkAlert } from 'remark-github-blockquote-alert'
import {
  remarkExtractFrontmatter,
  remarkCodeTitles,
  remarkImgToJsx,
  extractTocHeadings,
} from 'pliny/mdx-plugins/index.js'
// Rehype packages
import rehypeSlug from 'rehype-slug'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import rehypeKatex from 'rehype-katex'
import rehypeKatexNoTranslate from 'rehype-katex-notranslate'
import rehypeCitation from 'rehype-citation'
import rehypePrismPlus from 'rehype-prism-plus'
import rehypePresetMinify from 'rehype-preset-minify'
import siteMetadata from './data/siteMetadata'
import { allCoreContent, sortPosts } from 'pliny/utils/contentlayer.js'

const root = process.cwd()
const isProduction = process.env.NODE_ENV === 'production'

// heroicon mini link
const icon = fromHtmlIsomorphic(
  `
  <span class="content-header-link">
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 linkicon">
  <path d="M12.232 4.232a2.5 2.5 0 0 1 3.536 3.536l-1.225 1.224a.75.75 0 0 0 1.061 1.06l1.224-1.224a4 4 0 0 0-5.656-5.656l-3 3a4 4 0 0 0 .225 5.865.75.75 0 0 0 .977-1.138 2.5 2.5 0 0 1-.142-3.667l3-3Z" />
  <path d="M11.603 7.963a.75.75 0 0 0-.977 1.138 2.5 2.5 0 0 1 .142 3.667l-3 3a2.5 2.5 0 0 1-3.536-3.536l1.225-1.224a.75.75 0 0 0-1.061-1.06l-1.224 1.224a4 4 0 1 0 5.656 5.656l3-3a4 4 0 0 0-.225-5.865Z" />
  </svg>
  </span>
`,
  { fragment: true }
)

const computedFields: ComputedFields = {
  readingTime: { type: 'json', resolve: (doc) => readingTime(doc.body.raw) },
  slug: {
    type: 'string',
    resolve: (doc) => doc._raw.flattenedPath.replace(/^.+?(\/)/, ''),
  },
  path: {
    type: 'string',
    resolve: (doc) => doc._raw.flattenedPath,
  },
  filePath: {
    type: 'string',
    resolve: (doc) => doc._raw.sourceFilePath,
  },
  toc: { type: 'json', resolve: (doc) => extractTocHeadings(doc.body.raw) },
}

/**
 * Count the occurrences of all tags/topics across blog/publication and write to json file
 */
function createRecordCount(files, type="tag") {
  const attrName = `${type}s`
  const recordCount: Record<string, number> = {}
  files.forEach((file) => {
    if (file[attrName] && (!isProduction || file.draft !== true)) {
      file[attrName].forEach((tag) => {
        const formattedTag = slug(tag)
        if (formattedTag in recordCount) {
          recordCount[formattedTag] += 1
        } else {
          recordCount[formattedTag] = 1
        }
      })
    }
  })
  writeFileSync(`./app/${type}-data.json`, JSON.stringify(recordCount))
}

/**
 * Count the occurrences of all topics across resources which has two layers of classification
 */
function createResourceCount(files) {
  const recordCount: Record<string, Record<string, number>> = {};

  files.forEach((file) => {
    // Skip draft files if in production
    if (!isProduction || file.draft !== true) {
      const formattedCategory = slug(file.category);
      const formattedTopic = slug(file.topic);

      // Ensure the category exists
      if (!recordCount[formattedCategory]) {
        recordCount[formattedCategory] = {};
      }

      // Ensure the topic exists
      if (!recordCount[formattedCategory][formattedTopic]) {
        recordCount[formattedCategory][formattedTopic] = 0;
      }

      recordCount[formattedCategory][formattedTopic] += 1;
    }
  });

  writeFileSync(`./app/category-data.json`, JSON.stringify(recordCount));
}

// TODO maybe include publications/topics in the future
function createSearchIndex(allBlogs) {
  if (
    siteMetadata?.search?.provider === 'kbar' &&
    siteMetadata.search.kbarConfig.searchDocumentsPath
  ) {
    writeFileSync(
      `public/${path.basename(siteMetadata.search.kbarConfig.searchDocumentsPath)}`,
      JSON.stringify(allCoreContent(sortPosts(allBlogs)))
    )
    console.log('Local search index generated...')
  }
}

// Data model for news
export const Blog = defineDocumentType(() => ({
  name: 'Blog',
  filePathPattern: 'blog/**/*.mdx',
  contentType: 'mdx',
  fields: {
    title: { type: 'string', required: true },
    date: { type: 'date', required: true },
    tags: { type: 'list', of: { type: 'string' }, default: [] },
    lastmod: { type: 'date' },
    draft: { type: 'boolean' },
    summary: { type: 'string' },
    images: { type: 'json' },
    authors: { type: 'list', of: { type: 'string' } },
    layout: { type: 'string' },
    bibliography: { type: 'string' },
    canonicalUrl: { type: 'string' },
  },
  computedFields: {
    ...computedFields,
    structuredData: {
      type: 'json',
      resolve: (doc) => ({
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        headline: doc.title,
        datePublished: doc.date,
        dateModified: doc.lastmod || doc.date,
        description: doc.summary,
        image: doc.images ? doc.images[0] : siteMetadata.socialBanner,
        url: `${siteMetadata.siteUrl}/${doc._raw.flattenedPath}`,
      }),
    },
  },
}))

// Data model for publications
export const Publication = defineDocumentType(() => ({
  name: 'Publication',
  filePathPattern: 'publication/**/*.mdx',
  contentType: 'mdx',
  fields: {
    authors: { type: 'string', required: true },
    date: { type: 'date', required: true },
    year: { type: 'number' },
    topics: { type: 'list', of: { type: 'string' }, default: [] },
    draft: { type: 'boolean' },
    doi: { type: 'string' },
    pmid: { type: 'string' },
  },
  computedFields: {
    code: { // expose code for rendering content in list layout
      type: 'string',
      resolve: (doc) => doc.body?.code
    },
  },
}))

// Data model for resources
export const Resource = defineDocumentType(() => ({
  name: 'Resource',
  filePathPattern: 'resource/**/*.mdx',
  contentType: 'mdx',
  fields: {
    title: { type: 'string', required: true },
    date: { type: 'date', required: true },
    topic: { type: 'string', required: true },
    category: { type: 'string', required: true },
    href: { type: 'string' },
    draft: { type: 'boolean' },
  },
  computedFields: {
    code: { // expose code for rendering content in list layout
      type: 'string',
      resolve: (doc) => doc.body?.code
    },
  },
}))

// data model for contact and people
export const Authors = defineDocumentType(() => ({
  name: 'Authors',
  filePathPattern: 'authors/**/*.mdx',
  contentType: 'mdx',
  fields: {
    name: { type: 'string', required: true },
    avatar: { type: 'string' },
    occupation: { type: 'string' },
    company: { type: 'string' },
    email: { type: 'string' },
    twitter: { type: 'string' },
    linkedin: { type: 'string' },
    github: { type: 'string' },
    layout: { type: 'string' },
    role: { type: 'string', default: 'member' },
    nested: { type: 'boolean', default: false },
  },
  computedFields,
}))

export default makeSource({
  contentDirPath: 'data',
  documentTypes: [Blog, Publication, Resource, Authors],
  mdx: {
    cwd: process.cwd(),
    remarkPlugins: [
      remarkExtractFrontmatter,
      remarkGfm,
      remarkCodeTitles,
      remarkMath,
      remarkImgToJsx,
      remarkAlert,
    ],
    rehypePlugins: [
      rehypeSlug,
      [
        rehypeAutolinkHeadings,
        {
          behavior: 'prepend',
          headingProperties: {
            className: ['content-header'],
          },
          content: icon,
        },
      ],
      rehypeKatex,
      rehypeKatexNoTranslate,
      [rehypeCitation, { path: path.join(root, 'data') }],
      [rehypePrismPlus, { defaultLanguage: 'js', ignoreMissing: true }],
      rehypePresetMinify,
    ],
  },
  onSuccess: async (importData) => {
    const { allBlogs, allPublications, allResources } = await importData()
    createRecordCount(allBlogs, "tag")
    createRecordCount(allPublications, "topic")
    createResourceCount(allResources)
    createSearchIndex(allBlogs)
  },
})
