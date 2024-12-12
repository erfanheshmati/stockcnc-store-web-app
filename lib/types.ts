export type Category = {
  id: number;
  slug: string;
  title: string;
  content: string;
  image: string;
  badge: string;
};

export type Brand = {
  id: number;
  title: string;
  description: string;
  brand: string;
  logo: string;
};

export type Product = {
  id: number;
  slug: string;
  brand: string;
  icon: string;
  country: string;
  image: string;
  title: string;
  description: string;
  tags: string[];
};

export type Help = {
  id: number;
  title: string;
  description: string;
  image: string;
};

export type Blog = {
  id: number;
  image: string;
  title: string;
  description: string;
  author: string;
  date: string;
};

export type Member = {
  id: number;
  name: string;
  position: string;
  image: string;
  twitter: string;
  telegram: string;
  instagram: string;
};

export type Social = {
  id: number;
  title: string;
  description: string;
  href: string;
  icon: string;
};
