import { Resource, ResourceList, ResourcePost } from './classes' // Adjust path as needed

const resourceData1: Resource[] = [
  {
    title: 'OCTA-500',
    description: `a dataset of OCT and OCTA images: 33-mm (200 subjects) and 66-mm (300 subjects) a combination of healthy and diseased eyes, i.e., AMD, DR, CNV and RVO. The dataset provides images and annotations, six different maximum intensity projection images (covering various retinal depths), four types of text labels (age/gender/eye/disease) and seven types of segmentation labels (large vessels/capillary/artery/vein/2D FAZ/3D FAZ/retinal layers). Images are collected with RTVue-XR, Optovue, CA). The OCT and OCTA datasets are available here. Publication: Li et al. OCTA-500: A retinal dataset for optical coherence tomography angiography study. Medical Image Analysis 93 103092 (2024). https://www.sciencedirect.com/science/article/pii/S1361841524000173`,
    imgSrc: '/static/images/google.png',
    href: 'https://www.google.com',
  },
  {
    title: 'ROSE',
    description: `a dataset comprising 229 OCTA images with vessel annotations at either centerline-level or pixel-level. ROSE-1 consists of 117, OCTA images from 13 healthy controls and 26 subjects with Alzheimer’s disease collected with RTVue XR Avanti (Optovue). The image size is 33-mm. The dataset includes images from the superficial vascular plexus, deep vascular plexus and combined superficial and deep capillary plexus. ROSE-2 consists of 112 OCTA images taken from 112 eyes with various macular diseases with the Heidelberg OCT2 system (Heidelberg). The image size is 33-mm. The datasets are available here. Publication: Ma Y, et al. ROSE: A Retinal OCT-angiography vessel segmentation dataset and new model. IEEE Trans Med Imaging. 40(3):928-939 (2021). https://ieeexplore.ieee.org/document/9284503 `,
    imgSrc: '/static/images/time-machine.jpg',
    href: '/blog/the-time-machine',
  },
  {
    title: 'OCTAGON',
    description: `Lorem`,
    imgSrc: '/static/images/time-machine.jpg',
    href: '/blog/the-time-machine',
  },
  {
    title: 'GIARRATANO',
    description: `An open dataset of retinal parafoveal optical coherence tomography angiography (OCTA) 3×3-mm images (RTVue-XR Avanti, Optovue) from 11 participants (both eyes) not presenting ocular disease, age 44-59) with associated ground truth manual segmentations. The dataset includes maximum-intensity projection images. For each OCTA image, five sub-images were extracted and binarised. The OCTA dataset is available here. The associate source code is on GitHub. Publication: Giarratano Y, et al. Automated segmentation of optical coherence tomography angiography images: benchmark data and clinically relevant metrics. Transl Vis Sci Technol. 9(13):5 (2020) doi: 10.1167/tvst.9.13.5. https://pubmed.ncbi.nlm.nih.gov/33344049/`,
    imgSrc: '/static/images/time-machine.jpg',
    href: '/blog/the-time-machine',
  },
  {
    title: 'Multicentre normative data for mesopic microperimetry',
    description: `a normative dataset for the Macular Integrity Assessment (MAIA) microperimetry, featuring data from healthy eyes from 1137 tests across five independent study groups. Publication: Pfau M, et. al. Multicenter normative data for mesopic microperimetry. Invest Ophthalmol Vis Sci 65(27) (2024). doi:https://doi.org/10.1167/iovs.65.12.27. https://iovs.arvojournals.org/article.aspx?articleid=2802148 `,
    imgSrc: '/static/images/time-machine.jpg',
    href: '/blog/the-time-machine',
  },
]

const resourceData2: Resource[] = []

const resourceListData: ResourceList[] = [
  {
    title: 'RETINA',
    data: resourceData1
  },
  {
    title: 'ANTERIOR CHAMBER',
    data: resourceData2
  },
]

const resourcePost: ResourcePost = {
  title: "OPEN-SOURCE DATABASES",
  data: resourceListData
}

export default resourcePost
