import { Blog, Brand, Category, Help, Member, Product } from "./types";

export const categoriesData: Category[] = [
  {
    id: 1,
    title: "ماشین های تراش",
    content:
      "لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است. چاپگرها و متون بلکه روزنامه و مجله در ستون ...",
    image: "/images/categories/cnc-tarash.png",
    badge: "/icons/badges/badge-blue.png",
  },
  {
    id: 2,
    title: "ماشین های فرز",
    content:
      "لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است. چاپگرها و متون بلکه روزنامه و مجله در ستون ...",
    image: "/images/categories/cnc-ferez.png",
    badge: "",
  },
  {
    id: 3,
    title: "ماشین های بورینگ",
    content:
      "لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است. چاپگرها و متون بلکه روزنامه و مجله در ستون ...",
    image: "/images/categories/cnc-boring.png",
    badge: "",
  },
  {
    id: 4,
    title: "ماشین های سنتر",
    content:
      "لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است. چاپگرها و متون بلکه روزنامه و مجله در ستون ...",
    image: "/images/categories/cnc-center.png",
    badge: "/icons/badges/badge-green.png",
  },
  {
    id: 5,
    title: "ماشین های پانچ",
    content:
      "لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است. چاپگرها و متون بلکه روزنامه و مجله در ستون ...",
    image: "/images/categories/cnc-punch.png",
    badge: "/icons/badges/badge-orange.png",
  },
];

export const brandsData: Brand[] = [
  {
    id: 1,
    title: "برند دائوو ژاپن",
    description: "ماشین آلات و تجهیزات",
    brand: "DOOSAN",
    logo: "/icons/brands/daewoo.png",
  },
  {
    id: 2,
    title: "برند دوسان کره جنوبی",
    description: "ماشین آلات و تجهیزات",
    brand: "DOOSAN",
    logo: "/icons/brands/doosan.png",
  },
  {
    id: 3,
    title: "برند اوکوما ژاپن",
    description: "ماشین آلات و تجهیزات",
    brand: "DOOSAN",
    logo: "/icons/brands/okuma.png",
  },
  {
    id: 4,
    title: "برند دی ام جی چین",
    description: "ماشین آلات و تجهیزات",
    brand: "DOOSAN",
    logo: "/icons/brands/dmg-mori.png",
  },
  {
    id: 5,
    title: "برند دائوو ژاپن",
    description: "ماشین آلات و تجهیزات",
    brand: "DOOSAN",
    logo: "/icons/brands/daewoo.png",
  },
];

export const productsData: Product[] = [
  {
    id: 1,
    brand: "DOOSAN",
    icon: "/icons/countries/japan.png",
    country: "کره",
    image: "/images/products/cnc.png",
    title: "دستگاه سی ان سی تذاش افقی دو محور دوسان کره جنوبی",
    description: "two-axis horizontal CNC turning machine",
    tags: ["محصول استوک", "ساخت سال 2012", "در حد نو"],
  },
  {
    id: 2,
    brand: "DOOSAN",
    icon: "/icons/countries/korea.png",
    country: "کره",
    image: "/images/products/cnc.png",
    title: "دستگاه سی ان سی تذاش افقی دو محور دوسان کره جنوبی",
    description: "two-axis horizontal CNC turning machine",
    tags: ["محصول استوک", "ساخت سال 2012", "در حد نو"],
  },
  {
    id: 3,
    brand: "DOOSAN",
    icon: "/icons/countries/japan.png",
    country: "کره",
    image: "/images/products/cnc.png",
    title: "دستگاه سی ان سی تذاش افقی دو محور دوسان کره جنوبی",
    description: "two-axis horizontal CNC turning machine",
    tags: ["محصول استوک", "ساخت سال 2012", "در حد نو"],
  },
  {
    id: 4,
    brand: "DOOSAN",
    icon: "/icons/countries/japan.png",
    country: "کره",
    image: "/images/products/cnc.png",
    title: "دستگاه سی ان سی تذاش افقی دو محور دوسان کره جنوبی",
    description: "two-axis horizontal CNC turning machine",
    tags: ["محصول استوک", "ساخت سال 2012", "در حد نو"],
  },
  {
    id: 5,
    brand: "DOOSAN",
    icon: "/icons/countries/korea.png",
    country: "کره",
    image: "/images/products/cnc.png",
    title: "دستگاه سی ان سی تذاش افقی دو محور دوسان کره جنوبی",
    description: "two-axis horizontal CNC turning machine",
    tags: ["محصول استوک", "ساخت سال 2012", "در حد نو"],
  },
  {
    id: 6,
    brand: "DOOSAN",
    icon: "/icons/countries/japan.png",
    country: "کره",
    image: "/images/products/cnc.png",
    title: "دستگاه سی ان سی تذاش افقی دو محور دوسان کره جنوبی",
    description: "two-axis horizontal CNC turning machine",
    tags: ["محصول استوک", "ساخت سال 2012", "در حد نو"],
  },
];

export const helpsData: Help[] = [
  {
    id: 1,
    title: "بهترین دستگاه برای برش چوب و پلاستیک چیست ؟",
    description:
      "لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم تست شده از صنعت چاپ و با استفاده از طراحان گرافیک است",
    image: "/images/helps/cnc-help.png",
  },
  {
    id: 2,
    title: "بهترین دستگاه برای برش چوب و پلاستیک چیست ؟",
    description:
      "لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم تست شده از صنعت چاپ و با استفاده از طراحان گرافیک است",
    image: "/images/helps/cnc-help.png",
  },
  {
    id: 3,
    title: "بهترین دستگاه برای برش چوب و پلاستیک چیست ؟",
    description:
      "لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم تست شده از صنعت چاپ و با استفاده از طراحان گرافیک است",
    image: "/images/helps/cnc-help.png",
  },
  {
    id: 4,
    title: "بهترین دستگاه برای برش چوب و پلاستیک چیست ؟",
    description:
      "لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم تست شده از صنعت چاپ و با استفاده از طراحان گرافیک است",
    image: "/images/helps/cnc-help.png",
  },
];

export const blogsData: Blog[] = [
  {
    id: 1,
    image: "/images/blogs/blog-1.png",
    title: "دستگاه سی ان سی پلاس شرکت ژاپنی معرفی شد",
    description:
      "لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم تست شده از صنعت چاپ و با استفاده از طراحان گرافیک است که در میان همه متن ها استفاده های روزمره ای را به عنوان تست",
    author: "محمدرضا",
    date: "23 اردیبهشت 1403",
  },
  {
    id: 2,
    image: "/images/blogs/blog-2.png",
    title: "تصاویر جدیدترین نمایشگاه بین المللی تهران + فیلم",
    description:
      "لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم تست شده از صنعت چاپ و با استفاده از طراحان گرافیک است که در میان همه متن ها استفاده های روزمره ای را به عنوان تست",
    author: "محمدرضا",
    date: "23 اردیبهشت 1403",
  },
  {
    id: 3,
    image: "/images/blogs/blog-1.png",
    title: "دستگاه سی ان سی پلاس شرکت ژاپنی معرفی شد",
    description:
      "لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم تست شده از صنعت چاپ و با استفاده از طراحان گرافیک است که در میان همه متن ها استفاده های روزمره ای را به عنوان تست",
    author: "محمدرضا",
    date: "23 اردیبهشت 1403",
  },
  {
    id: 4,
    image: "/images/blogs/blog-2.png",
    title: "تصاویر جدیدترین نمایشگاه بین المللی تهران + فیلم",
    description:
      "لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم تست شده از صنعت چاپ و با استفاده از طراحان گرافیک است که در میان همه متن ها استفاده های روزمره ای را به عنوان تست",
    author: "محمدرضا",
    date: "23 اردیبهشت 1403",
  },
];

export const membersData: Member[] = [
  {
    id: 1,
    name: "محمدرضا اسپروز",
    position: "مدیر عامل سی ان سی استوک",
    image: "/images/members/member-1.png",
    twitter: "#",
    telegram: "#",
    instagram: "#",
  },
  {
    id: 2,
    name: "محمدرضا اسپروز",
    position: "مدیر عامل سی ان سی استوک",
    image: "/images/members/member-2.png",
    twitter: "#",
    telegram: "#",
    instagram: "#",
  },
  {
    id: 3,
    name: "محمدرضا اسپروز",
    position: "مدیر عامل سی ان سی استوک",
    image: "/images/members/member-3.png",
    twitter: "#",
    telegram: "#",
    instagram: "#",
  },
  {
    id: 4,
    name: "محمدرضا اسپروز",
    position: "مدیر عامل سی ان سی استوک",
    image: "/images/members/member-4.png",
    twitter: "#",
    telegram: "#",
    instagram: "#",
  },
];
