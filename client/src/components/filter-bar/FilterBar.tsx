import React, { useState, useEffect } from "react";
import Checkbox from "@material-ui/core/Checkbox";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import CheckBoxOutlineBlankIcon from "@material-ui/icons/CheckBoxOutlineBlank";
import CheckBoxIcon from "@material-ui/icons/CheckBox";
import Typography from "@material-ui/core/Typography";
import Slider from "@material-ui/core/Slider";
import Button from "@material-ui/core/Button";
import { Car } from "../../models/car";
import { useStyles } from "./useStyles";
import { filterItems } from "./filter";

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

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

  console.log("listToDisplay");
  console.log(listToDisplay);

  const resetList = (): void => {
    setListToDisplay([...carsList]);
  };

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

  return (
    <div className={classes.root}>
      {/* brands */}
      <Autocomplete
        multiple
        id="checkboxes-tags-demo"
        options={uniqeValues("brand")}
        disableCloseOnSelect
        onChange={(event: any, selectedArr: string[]) => {
          setSelectedBrands(selectedArr);
        }}
        getOptionLabel={(option: string) => option}
        renderOption={(option, { selected }) => (
          <React.Fragment>
            <Checkbox
              icon={icon}
              checkedIcon={checkedIcon}
              style={{ marginRight: 8 }}
              checked={selected}
            />
            {option}
          </React.Fragment>
        )}
        renderInput={(params) => (
          <TextField
            {...params}
            variant="outlined"
            label="Select Brand"
            placeholder="ex: Ford"
          />
        )}
      />

      {/* colors */}
      <Autocomplete
        multiple
        id="checkboxes-tags-demo"
        options={uniqeValues("color")}
        disableCloseOnSelect
        onChange={(event: any, selectedArr: string[]) => {
          setSelectedColors(selectedArr);
        }}
        getOptionLabel={(option: string) => option}
        renderOption={(option, { selected }) => (
          <React.Fragment>
            <Checkbox
              icon={icon}
              checkedIcon={checkedIcon}
              style={{ marginRight: 8 }}
              checked={selected}
            />
            {option}
          </React.Fragment>
        )}
        renderInput={(params) => (
          <TextField
            {...params}
            variant="outlined"
            label="Select Color"
            placeholder="ex: Black"
          />
        )}
      />

      {/* modelDate */}
      <Autocomplete
        multiple
        id="checkboxes-tags-demo"
        options={uniqeValues("modelDate").sort()}
        disableCloseOnSelect
        onChange={(event: any, selectedArr: string[]) => {
          setSelectedModelDates(selectedArr);
        }}
        getOptionLabel={(option: string) => option}
        renderOption={(option, { selected }) => (
          <React.Fragment>
            <Checkbox
              icon={icon}
              checkedIcon={checkedIcon}
              style={{ marginRight: 8 }}
              checked={selected}
            />
            {option}
          </React.Fragment>
        )}
        renderInput={(params) => (
          <TextField
            {...params}
            variant="outlined"
            label="Select Model Date"
            placeholder="ex: 2010"
          />
        )}
      />

      {/* model */}
      <Autocomplete
        multiple
        id="checkboxes-tags-demo"
        options={getSelectedBrandModles()}
        disableCloseOnSelect
        onChange={(event: any, selectedArr: string[]) => {
          setSelectedModels(selectedArr);
        }}
        getOptionLabel={(option: string) => option}
        renderOption={(option, { selected }) => (
          <React.Fragment>
            <Checkbox
              icon={icon}
              checkedIcon={checkedIcon}
              style={{ marginRight: 8 }}
              checked={selected}
            />
            {option}
          </React.Fragment>
        )}
        renderInput={(params) => (
          <TextField
            {...params}
            variant="outlined"
            label="Select Model"
            placeholder="ex: Civic"
          />
        )}
      />

      {/* price */}

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
              resetList,
              setListToDisplay,
              selectedBrands,
              selectedColors,
              selectedModels,
              selectedModelDates,
              priceStart,
              priceEnd,
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
