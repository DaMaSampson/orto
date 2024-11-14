export interface Resource {
  title: string
  description: string
  href?: string
  imgSrc?: string
}

export interface ResourceList {
  title: string
  data: Resource[]
}

export interface ResourcePost {
  title: string
  data: ResourceList[]
}