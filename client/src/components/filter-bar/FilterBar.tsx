import React, { useState, useEffect } from "react";
import Typography from "@material-ui/core/Typography";
import Slider from "@material-ui/core/Slider";
import Button from "@material-ui/core/Button";
import FilterField from "../filter-field/FilterField";
import { Car } from "../../models/car";
import { useStyles } from "./useStyles";
import { filterItems } from "./filter";

type props = {
  listToDisplay: Car[];
  setListToDisplay: React.Dispatch<React.SetStateAction<Car[]>>;
  carsList: Car[];
};

const FilterBar = ({ listToDisplay, setListToDisplay, carsList }: props) => {
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [selectedModels, setSelectedModels] = useState<string[]>([]);
  const [selectedModelDates, setSelectedModelDates] = useState<string[]>([]);
  const [priceStart, setPriceStart] = useState<any>(0);
  const [priceEnd, setPriceEnd] = useState<number | number[] | undefined>(0);
  const [min, setMin] = useState<number>(0);
  const [max, setMax] = useState<number>(0);
  const classes = useStyles();

  useEffect(() => {
    //set minMaxPrice
    if (!listToDisplay.length) return;
    let min: number = Number(listToDisplay[0].price);
    let max: number = Number(listToDisplay[0].price);
    listToDisplay.forEach((c: Car) => {
      const price: number = Number(c.price);
      if (price < min) min = price;
      if (price > max) max = price;
    });
    setMin(min);
    setMax(max);
    setPriceStart(min);
    setPriceEnd(max);
  }, [listToDisplay]);

  const uniqeValues: Function = (key: string): string[] => {
    const result: string[] = [];
    carsList.forEach((c: Car) => {
      if (!result.includes(c[key])) result.push(c[key]);
    });
    return result;
  };

  const getSelectedBrandModles: Function = (): string[] => {
    if (!selectedBrands.length) return uniqeValues("model");
    const result: string[] = [];
    listToDisplay.forEach((c: Car) => {
      if (selectedBrands.includes(c.brand) && !result.includes(c.model)) {
        result.push(c.model);
      }
    });
    return result;
  };

  const filters: {
    names: string[];
    brand: object;
    color: object;
    modelDate: object;
    model: object;
    [key: string]: any;
  } = {
    names: ["brand", "model", "modelDate", "color"],
    brand: {
      options: uniqeValues("brand"),
      setStateFn: setSelectedBrands,
      label: "Select Brand",
      placeholder: "ex: Ford",
    },
    color: {
      options: uniqeValues("color"),
      setStateFn: setSelectedColors,
      label: "Select Color",
      placeholder: "ex: black",
    },
    modelDate: {
      options: uniqeValues("modelDate").sort(),
      setStateFn: setSelectedModelDates,
      label: "Select ModelDate",
      placeholder: "ex: 2012",
    },
    model: {
      options: getSelectedBrandModles(),
      setStateFn: setSelectedModels,
      label: "Select Model",
      placeholder: "ex: Civic",
    },
  };

  return (
    <div className={classes.root}>
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
        <div>
          <Typography id="non-linear-slider" gutterBottom>
            Price range
          </Typography>
          <Slider
            value={priceStart}
            min={min}
            step={1}
            max={max}
            getAriaValueText={(val) => `$${val}`}
            valueLabelFormat={(val) => `$${val}`}
            onChange={(e, newValue) => {
              setPriceStart(newValue);
            }}
            valueLabelDisplay="auto"
            aria-labelledby="non-linear-slider"
          />
          <Slider
            value={priceEnd}
            min={priceStart + 1}
            step={1}
            max={max}
            getAriaValueText={(val) => `$${val}`}
            valueLabelFormat={(val) => `$${val}`}
            onChange={(e, newValue) => {
              setPriceEnd(newValue);
            }}
            valueLabelDisplay="auto"
            aria-labelledby="non-linear-slider"
          />
        </div>
        <Button
          variant="contained"
          color="secondary"
          onClick={() =>
            filterItems(
              listToDisplay,
              setListToDisplay,
              selectedBrands,
              selectedColors,
              selectedModels,
              selectedModelDates,
              priceStart,
              priceEnd,
              carsList,
              min,
              max
            )
          }
        >
          SUBMIT
        </Button>
      </div>
    </div>
  );
};
export default FilterBar;
