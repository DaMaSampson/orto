import { Resource, ResourceList, ResourcePost } from './classes'
const resourceData1: Resource[] = [
  {
    title: 'UNICORN',
    description: `UNICORN (<span class="font-red">uni</span>fied <span class="font-red">co<span>mmentatory of the committee of international experts on the nomenclature for <span class="font-red">n</span>eovascular AMD in OCTA) – the international group that first have reviewed OCTA descriptors for the OCTA in neovascular AMD published up to date and tested agreement of these terms among retinal imaging experts.`,
    imgSrc: '/static/images/google.png',
    href: 'https://pubmed.ncbi.nlm.nih.gov/33359557/',
  },
  {
    title: 'COIN',
    description: `<span class="font-red">COIN</span> is a global research consortium established in 2019 as a common platform connecting researchers worldwide to contribute to the progress of eye research. They provide updates on the research progress of ocular imaging biomarkers, including choroid vascularity index (CVI), vitreous haze index (VHI), retinal vascularity index (RVI);`,
    imgSrc: '/static/images/time-machine.jpg',
    href: 'https://www.ocularimaging.net/home',
  },
  {
    title: 'MarkVCID',
    description: `<span class="font-red">MarkVCID</span> cerebral small vessel consortium of institutions US and Canada based – formed under cooperative agreements with the National Institute of Neurologic Diseases and Stroke and National Institute on Ageing with the goals of developing and validating biomarkers for the cerebral small vessel diseases. Study protocol available <a href="https://markvcid.partners.org/sites/default/files/external/protocols/MarkVCID_OCTA_VSD_Biomarker_Kit_Protocol_v6.11.20_Final.pdf">here</a>. <span class="font-bold">Publications</span>: Wilcock D, et al.; MarkVCID Consortium. “MarkVCID cerebral small vessel consortium: I. Enrollment, clinical, fluid protocols.” Alzheimers Dement. 2021 Apr;17(4):704-715. doi: 10.1002/alz.12215. Epub 2021 Jan 21. PMID: 33480172; PMCID: PMC8122220. | DOI: 10.1002/alz.12215; <a href="https://pubmed.ncbi.nlm.nih.gov/33480172/">https://pubmed.ncbi.nlm.nih.gov/33480172/</a> and Lu H, et al.; MarkVCID Consortium. “MarkVCID cerebral small vessel consortium: II. Neuroimaging protocols.” Alzheimers Dement. 2021 Apr;17(4):716-725. doi: 10.1002/alz.12216. Epub 2021 Jan 21. PMID: 33480157 | DOI: 10.1002/alz.12216; <a href="https://pubmed.ncbi.nlm.nih.gov/33480157/">https://pubmed.ncbi.nlm.nih.gov/33480157/</a>`,
    imgSrc: '/static/images/time-machine.jpg',
    href: '',
  },
]

const resourceListData: ResourceList[] = [
  {
    title: '',
    data: resourceData1
  },
]

const resourcePost: ResourcePost = {
  title: "PROTOCOLS AND INITIATIVES",
  data: resourceListData
}

export default resourcePost
