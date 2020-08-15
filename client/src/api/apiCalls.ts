import { Car } from '../models/car';

export const getCarsList = (
  setCarsList: React.Dispatch<React.SetStateAction<Car[]>>,
  setListToDisplay: React.Dispatch<React.SetStateAction<Car[]>>,
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>
): void => {
  fetch('/cars')
    .then(res => {
      if (!res.ok) throw new Error(res.statusText);
      return res.json();
    })
    .then((data: Car[]) => {
      setCarsList([...data]);
      setListToDisplay([...data]);
    })
    .catch(err => console.error('Error:', err))
    .finally(() => setIsLoading(false));
};
