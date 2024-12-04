export type Category = {
  id: number;
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
