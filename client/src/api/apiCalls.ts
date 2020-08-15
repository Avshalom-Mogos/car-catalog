import { Car } from '../models/car';

export const getCarsList = (
  setCarsList: React.Dispatch<React.SetStateAction<Car[]>>,
  setListToDisplay: React.Dispatch<React.SetStateAction<Car[]>>,
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>
): void => {
  fetch('/cars')
    .then(res => res.json())
    .then(data => {
      setCarsList([...data]);
      setListToDisplay([...data]);
      setIsLoading(false);
    })
    .catch(error => {
      setIsLoading(false);
      console.error('Error:', error);
    });
};
