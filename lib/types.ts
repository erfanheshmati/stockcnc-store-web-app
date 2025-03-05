export interface Category {
  _id: string;
  image: string;
  seoTitle: string;
  metaData: string;
  title: string;
  description: string;
  sellerPhone: string;
  view: number;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface MostSearch {
  _id: string;
  title: string;
  url: string;
  imageMobile: string;
  imageWeb: string;
  live: boolean;
  sort: number;
  type: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface Brand {
  _id: string;
  logo: string;
  title: string;
  enTitle: string;
  summary: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface Country {
  _id: string;
  logo: string;
  title: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface Product {
  _id: string;
  primaryImage: string;
  gallery: string[];
  seoTitle: string;
  metaData: string;
  title: string;
  enTitle: string;
  description: string;
  country: Country;
  brand: Brand;
  category: Category;
  typeOfLathe: string;
  options: string;
  available: boolean;
  condition: string;
  yearOfManufacture: string;
  appearanceHealth: number;
  electricHealth: number;
  technicalHealth: number;
  attributes: Attribute[];
  view: number;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface Attribute {
  _id: string;
  attribute: AttributeType;
  value: string;
}

export interface AttributeType {
  _id: string;
  title: string;
  type: string;
  values: string[];
  isFilter: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
  requiredAttribute?: string;
}

export interface FilterOption {
  value: string;
  count: number;
}

export interface NumberFilter {
  id: string;
  title: string;
  type: "number";
  count: number;
  min: number;
  max: number;
  requiredAttribute?: string;
}

export interface StringFilter {
  id: string;
  title: string;
  type: "string";
  value: FilterOption[];
  requiredAttribute?: string;
}

export type Filter = NumberFilter | StringFilter;

export interface ProductArchiveFilterResponse {
  totalProducts: number;
  filters: Filter[];
}

export interface Blog {
  _id: number;
  seoTitle: string;
  metaData: string;
  image: string;
  title: string;
  metaTitle: string;
  content: string;
  author: string;
  createdAt: string;
  summary: string;
  tutorial: boolean;
}

export interface Social {
  id: number;
  title: string;
  description: string;
  href: string;
  icon: string;
}

// *********************************************************************************************************************

export interface Root {
  _id: string;
  favicon: string;
  logo: string;
  colorPrimary: string;
  colorAccent: string;
  colorSecond: string;
  defaultMetaData: string;
  address: string;
  telephone: string;
  mobile: string;
  supportTelephone: string;
  telegram: string;
  instagram: string;
  whatsapp: string;
  footerAboutUs: string;
  contactUsTitle: string;
  contactUsSeoTitle: string;
  contactUsMetaData: string;
  latitude: number;
  longitude: string;
  aboutUsTitle: string;
  aboutUsSeoTitle: string;
  aboutUsMetaData: string;
  aboutUsHtmlContent: string;
  archiveProductTitle: string;
  archiveProductSeoTitle: string;
  archiveProductMetaData: string;
  archiveBlogTitle: string;
  archiveBlogSeoTitle: string;
  archiveBlogMetaData: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
  headerMenu: HeaderMenu[];
  footerProducts: FooterProduct[];
  footerBrands: FooterBrand[];
  footerQuickAccess: FooterQuickAccess[];
  banners: BannerSlider[];
  aboutUsMembers: AboutUsMember[];
}

export interface HeaderMenu {
  _id: string;
  title: string;
  url: string;
  imageMobile: string;
  imageWeb: string;
  live: boolean;
  sort: number;
  type: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface FooterProduct {
  _id: string;
  title: string;
  url: string;
  imageMobile: string;
  imageWeb: string;
  live: boolean;
  sort: number;
  type: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface FooterBrand {
  _id: string;
  title: string;
  url: string;
  imageMobile: string;
  imageWeb: string;
  live: boolean;
  sort: number;
  type: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface FooterQuickAccess {
  _id: string;
  title: string;
  url: string;
  imageMobile: string;
  imageWeb: string;
  live: boolean;
  sort: number;
  type: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface BannerSlider {
  _id: string;
  title: string;
  url: string;
  imageMobile: string;
  imageWeb: string;
  live: boolean;
  sort: number;
  type: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface AboutUsMember {
  _id: string;
  avatar: string;
  name: string;
  position: string;
  instagram: string;
  telegram: string;
  tweeter: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}
