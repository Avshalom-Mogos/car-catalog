import { Car } from '../../models/car';

export const filterItems = (
  listToDisplay: Car[],
  setListToDisplay: React.Dispatch<React.SetStateAction<Car[]>>,
  selectedBrands: string[],
  selectedColors: string[],
  selectedModels: string[],
  selectedModelDates: string[],
  priceRange: number[],
  carsList: Car[],
  maxPrice: number
) => {
  //filter
  const filteredItems: Car[] = [];

  for (let i = 0; i < carsList.length; i++) {
    const car: Car = carsList[i];

    let paramsToMatch: number = 0;
    let matchedParams: number = 0;

    if (selectedBrands.length) {
      paramsToMatch++;
      matchedParams = search(selectedBrands, car.brand)
        ? ++matchedParams
        : matchedParams;
    }

    if (selectedColors.length) {
      paramsToMatch++;
      matchedParams = search(selectedColors, car.color)
        ? ++matchedParams
        : matchedParams;
    }

    if (selectedModels.length) {
      paramsToMatch++;
      matchedParams = search(selectedModels, car.model)
        ? ++matchedParams
        : matchedParams;
    }

    if (selectedModelDates.length) {
      paramsToMatch++;
      matchedParams = search(selectedModelDates, car.modelDate)
        ? ++matchedParams
        : matchedParams;
    }

    const [selectedMinPrice, selectedMaxPrice] = priceRange;

    console.log(selectedMinPrice, selectedMaxPrice);
    
    //no params selected
    if (
      paramsToMatch === 0 &&
      0 === selectedMinPrice &&
      maxPrice === selectedMaxPrice &&
      listToDisplay.length !== carsList.length
    ) {
      //set filterd list to all cars
      setListToDisplay(carsList);
      return;
    }

    const inPriceRange: boolean =
      Number(car.price) >= Number(selectedMinPrice) &&
      Number(car.price) <= Number(selectedMaxPrice);
    paramsToMatch++;
    if (inPriceRange) matchedParams++;

    if (paramsToMatch === matchedParams) filteredItems.push(car);
  }

  setListToDisplay([...filteredItems]);
};

function search(arr: string[], item: string): boolean {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === item) return true;
  }
  return false;
}
