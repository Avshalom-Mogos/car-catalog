export interface Car {
  _id: string;
  bodyType: string;
  brand: string;
  color: string;
  fuelType: string;
  image: string;
  model: string;
  modelDate: string;
  price: string;
  vehicleInteriorColor: string;
  [key: string]: any; // make interface indexable;
}
