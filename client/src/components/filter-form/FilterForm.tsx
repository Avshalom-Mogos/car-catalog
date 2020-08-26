import React, { useState, useEffect } from 'react';
import Slider from '@material-ui/core/Slider';
import Button from '@material-ui/core/Button';
import FilterField from './filter-field/FilterField';
import { Car } from '../../models/car';
import { useStyles } from './useStyles';
import { filterItems } from './filter';
import { numberWithCommas } from '../../utils/utlis';

type props = {
  listToDisplay: Car[];
  setListToDisplay: React.Dispatch<React.SetStateAction<Car[]>>;
  carsList: Car[];
};

const FilterForm = ({ listToDisplay, setListToDisplay, carsList }: props) => {
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [selectedModels, setSelectedModels] = useState<string[]>([]);
  const [selectedModelDates, setSelectedModelDates] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<number[]>([0, 0]);
  const [maxPrice, setMaxPrice] = useState<number>(0);
  const classes = useStyles();

  useEffect(() => {
    //get & set Max Price
    if (!carsList.length) return;
    const allPricesArr = carsList.map(car => Number(car.price));
    const max = Math.max(...allPricesArr);
    setMaxPrice(max);
    setPriceRange([0, max]);
  }, [carsList]);

  const getUniqeValues: Function = (key: string): string[] => {
    const allValues = carsList.map(c => c[key]);
    const uniqeValues = Array.from(new Set(allValues));
    return uniqeValues;
  };

  const getSelectedBrandModles: Function = (): string[] => {
    if (!selectedBrands.length) return getUniqeValues('model');
    const result: string[] = [];
    listToDisplay.forEach((c: Car) => {
      const brandInSelected: boolean = selectedBrands.includes(c.brand);
      const modelNotInResult: boolean = !result.includes(c.model);
      if (brandInSelected && modelNotInResult) result.push(c.model);
    });
    return result;
  };

  const formSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    filterItems(
      listToDisplay,
      setListToDisplay,
      selectedBrands,
      selectedColors,
      selectedModels,
      selectedModelDates,
      priceRange,
      carsList,
      maxPrice
    );
  };

  const filters: {
    names: string[];
    brand: object;
    color: object;
    modelDate: object;
    model: object;
    [key: string]: any;
  } = {
    names: ['brand', 'model', 'modelDate', 'color'],
    brand: {
      options: getUniqeValues('brand'),
      setStateFn: setSelectedBrands,
      label: 'Select Brand',
      placeholder: 'ex: Ford',
    },
    color: {
      options: getUniqeValues('color'),
      setStateFn: setSelectedColors,
      label: 'Select Color',
      placeholder: 'ex: black',
    },
    modelDate: {
      options: getUniqeValues('modelDate').sort(),
      setStateFn: setSelectedModelDates,
      label: 'Select Model Date',
      placeholder: 'ex: 2012',
    },
    model: {
      options: getSelectedBrandModles(),
      setStateFn: setSelectedModels,
      label: 'Select Model',
      placeholder: 'ex: Civic',
    },
  };

  return (
    <form onSubmit={formSubmit} className={classes.root}>
      {filters.names.map((filterName: string, i: number) => (
        <FilterField
          key={i}
          options={filters[filterName].options}
          setStateFn={filters[filterName].setStateFn}
          label={filters[filterName].label}
          placeholder={filters[filterName].placeholder}
        />
      ))}

      <div className={classes.slider}>
        <Slider
          value={priceRange}
          onChange={(e, newValue) => setPriceRange(newValue as number[])}
          min={0}
          max={maxPrice}
          valueLabelDisplay='on'
          aria-labelledby='range-slider'
          getAriaValueText={val => numberWithCommas(val.toString())}
          valueLabelFormat={val => numberWithCommas(val.toString())}
        />
      </div>
      <Button
        className={classes.filterBtn}
        variant='contained'
        color='secondary'
        type='submit'
      >
        FILTER
      </Button>
    </form>
  );
};
export default FilterForm;
