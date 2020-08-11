import { Car } from "../../models/car";

export const filterItems = (
  listToDisplay: Car[],
  resetList: Function,
  setListToDisplay: React.Dispatch<React.SetStateAction<Car[]>>,
  selectedBrands: string[],
  selectedColors: string[],
  selectedModels: string[],
  selectedModelDates: string[],
  priceStart: any,
  priceEnd: number | number[] | undefined,
  min: number,
  max: number
) => {
  //filter
  const filteredItems: Car[] = [];

  for (let i = 0; i < listToDisplay.length; i++) {
    const car: Car = listToDisplay[i];

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

    //no params selected
    console.log("min,max");
    console.log(min, max);

    if (
      paramsToMatch === 0 &&
      min === Number(priceStart) &&
      max === Number(priceEnd)
    ) {
      console.error("RESET");
      resetList();
      return;
    }

    console.log(i);
    

    const inRange: boolean =
      Number(car.price) > Number(priceStart) &&
      Number(car.price) < Number(priceEnd);
    paramsToMatch++;
    if (inRange) matchedParams++;

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
