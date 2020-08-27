import React from "react";
import Checkbox from "@material-ui/core/Checkbox";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import CheckBoxOutlineBlankIcon from "@material-ui/icons/CheckBoxOutlineBlank";
import CheckBoxIcon from "@material-ui/icons/CheckBox";

type Props = {
  options: string[];
  setStateFn: React.Dispatch<React.SetStateAction<string[]>>;
  label: string;
  placeholder: string;
};

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

const FilterField = ({ options, setStateFn, label, placeholder }: Props) => {
  return (
    <div>
      <Autocomplete
        multiple
        options={options}
        disableCloseOnSelect
        onChange={(event: any, selectedArr: string[]) => {
          setStateFn(selectedArr);
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
            label={label}
            placeholder={placeholder}
          />
        )}
      />
    </div>
  );
};

export default FilterField;
