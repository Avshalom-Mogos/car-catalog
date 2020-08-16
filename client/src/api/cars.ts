import { Car } from '../models/car';

export const getCarsList = async (): Promise<Car[]> => {
  const res: Response = await fetch('/cars');
  if (!res.ok) throw new Error(res.statusText);
  const carsList: Car[] = await res.json();
  return carsList;
};
