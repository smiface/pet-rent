export interface Example {
  id: number;
}

export type TCategory = {
  id: number;
  title: string;
  img: string;
};

export type TCar = {
  id: number;
  title: string;
  img: string;
  city: string;
  price: number;
  category: string;
};

export type TCardItem = {
  id: number;
  title: string;
  img: string;
};

export type TPayCard = {
  number: number;
  cvv: number;
  addDate: number;
};

export type TPayCardToAdd = {
  number: number;
  cvv: number;
};

export type TAlert = {
  id: number,
  title: string
}