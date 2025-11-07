import { getService } from "../configs/FetchRequest";
import { env } from '../constants/common';
  
  
  const HomeService = {};

  HomeService.homePage = () => getService('home', `${env.ACCESS_TOKEN}`)
  HomeService.expertPage = () => getService('get-experts', `${env.ACCESS_TOKEN}`)
  HomeService.careerPage = () => getService('get-careers', `${env.ACCESS_TOKEN}`)
  HomeService.menuCareerPage = () => getService('get-menu-careers', `${env.ACCESS_TOKEN}`)
  HomeService.menuAboutusPage = () => getService('get-menu-aboutus', `${env.ACCESS_TOKEN}`)
  HomeService.menuIndustryPage = () => getService('get-menu-industries', `${env.ACCESS_TOKEN}`)
  HomeService.menuServicePage = () => getService('get-menu-services', `${env.ACCESS_TOKEN}`)
  HomeService.projectPage = () => getService('get-projects', `${env.ACCESS_TOKEN}`)
  HomeService.individualProjectPage = (id) => getService(`get-individual-project?id=${id}`, `${env.ACCESS_TOKEN}`)
  HomeService.contactPage = () => getService('get-contact', `${env.ACCESS_TOKEN}`)
  HomeService.menuSkillPage = () => getService('get-menu-skills', `${env.ACCESS_TOKEN}`)
  HomeService.menuProjectPage = () => getService('get-menu-casestudy', `${env.ACCESS_TOKEN}`)
  HomeService.commonaboutusPage = () => getService('get-common-aboutus', `${env.ACCESS_TOKEN}`)
  

  
  export default HomeService;
  