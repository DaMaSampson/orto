import { Resource, ResourceList, ResourcePost } from './classes' // Adjust path as needed

const resourceData1: Resource[] = [
  {
    title: 'Erlangen-Angio-Tool (EA-Tool)',
    description: `a semi-automated tool coded in Matlab and designed as stand-alone software with a graphical user interface. The software applies the Frangi vesselness filter and Otsu thresholding algorithm for vessel segmentation. After uploading the OCTA image, the user marks the centre of the macular region. It helps to divide the image into 11 sub-regions for analysis. The software delivers microvascular metrics such as vessel area density and foveal avascular zone area. The details can be found here`,
    imgSrc: '/static/images/google.png',
    href: 'https://www.google.com',
  },
  {
    title: 'OCTAVA',
    description: `OCTA-ReVA – a semi-automated tool coded in Matlab and designed as stand-alone software with a graphical user interface. It supports single and batch processing. Enables saving of analysis results directly into Excel format and exporting of the images. The software applies the Frangi vesselness filter and five different segmentation methods (Otsu thresholding algorithm, fixed thresholding, mean thresholding, median thresholding, and the 3-sigma method). The software delivers several metrics, including blood vessel density (BVD), blood vessel tortuosity (BVT), blood vessel calibre (BVC), perfusion intensity density, vessel area flux and normalised blood flow index, fovea avascular zone area (FAZA), FAZ perimeter, FAZ irregularity. `,
    imgSrc: '/static/images/time-machine.jpg',
    href: '/blog/the-time-machine',
  },
]

const resourceData2: Resource[] = [
  {
    title: 'DEMO',
    description: `For demonstration purposes, here are some example descriptions`,
    imgSrc: '/static/images/time-machine.jpg',
    href: '/blog/the-time-machine',
  },
]

const resourceListData: ResourceList[] = [
  {
    title: 'OPTICAL COHERENCE TOMOGRAPHY ANGIOGRAPHY',
    data: resourceData1
  },
  {
    title: 'ANTERIOR CHAMBER',
    data: resourceData2
  },
]

const resourcePost: ResourcePost = {
  title: "OPEN-SOURCE SOFTWARE TOOLS",
  data: resourceListData
}

export default resourcePost
