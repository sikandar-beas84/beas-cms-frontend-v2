import { getService, postService } from "../configs/FetchRequest";
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
  HomeService.individualProjectPage = (slug) => postService('get-casestudy-by-slug', `${env.ACCESS_TOKEN}`,slug)
  HomeService.contactPage = () => getService('get-contact', `${env.ACCESS_TOKEN}`)
  HomeService.menuSkillPage = () => getService('get-menu-skills', `${env.ACCESS_TOKEN}`)
  HomeService.menuProjectPage = () => getService('get-menu-casestudy', `${env.ACCESS_TOKEN}`)
  HomeService.commonaboutusPage = () => getService('get-common-aboutus', `${env.ACCESS_TOKEN}`)
  HomeService.faqPage = () => getService('get-faq', `${env.ACCESS_TOKEN}`)
  HomeService.commonPage = () => getService('get-all-common', `${env.ACCESS_TOKEN}`)
  HomeService.seobyslug = (slug) => postService('get-seo-by-slug', `${env.ACCESS_TOKEN}`, slug)
  HomeService.individualBlogPage = (slug) => postService('get-blog-by-slug', `${env.ACCESS_TOKEN}`,slug)

  
  export default HomeService;
  