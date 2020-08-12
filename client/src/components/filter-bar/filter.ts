import { Car } from "../../models/car";

export const filterItems = (
  listToDisplay: Car[],
  setListToDisplay: React.Dispatch<React.SetStateAction<Car[]>>,
  selectedBrands: string[],
  selectedColors: string[],
  selectedModels: string[],
  selectedModelDates: string[],
  priceStart: any,
  priceEnd: number | number[] | undefined,
  carsList: Car[],
  max: number
) => {
  //filter
  const filteredItems: Car[] = [];

  for (let i = 0; i < carsList.length; i++) {
    const car: Car = carsList[i];


    console.log("#".repeat(25));
    

    let paramsToMatch: number = 0;
    let matchedParams: number = 0;

    if (selectedBrands.length) {
      paramsToMatch++;
      matchedParams = search(selectedBrands, car.brand)
        ? ++matchedParams
        : matchedParams;

        console.error("brand",search(selectedBrands, car.brand));
        
    }

    if (selectedColors.length) {
      paramsToMatch++;
      matchedParams = search(selectedColors, car.color)
        ? ++matchedParams
        : matchedParams;

        console.error("color",search(selectedBrands, car.color));
    }

    if (selectedModels.length) {
      paramsToMatch++;
      matchedParams = search(selectedModels, car.model)
        ? ++matchedParams
        : matchedParams;

        console.error("model",search(selectedBrands, car.model));
    }

    if (selectedModelDates.length) {
      paramsToMatch++;
      matchedParams = search(selectedModelDates, car.modelDate)
        ? ++matchedParams
        : matchedParams;

        console.error("model",search(selectedBrands, car.modelDate));
    }

    //no params selected
    console.log("max");
    console.log(max);

    if (
      paramsToMatch === 0 &&
      0 === Number(priceStart) &&
      max === Number(priceEnd)
    ) {
      //set filterd list to all cars
      console.error('RESET')
      setListToDisplay(carsList);
      return;
    }

    const inRange: boolean =
      Number(car.price) > Number(priceStart) &&
      Number(car.price) < Number(priceEnd);
    paramsToMatch++;
    if (inRange) matchedParams++;
    else console.error("NOT IN PRICE RANGE");
    

    if (paramsToMatch === matchedParams) filteredItems.push(car);
  }
console.error(filteredItems);
  setListToDisplay([...filteredItems]);
};

function search(arr: string[], item: string): boolean {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === item) return true;
  }
  return false;
}
