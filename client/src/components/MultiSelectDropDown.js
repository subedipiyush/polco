import React, { useState, useEffect } from "react";

import {
        InputLabel,
        OutlinedInput,
        FormControl, 
        Select, 
        MenuItem, 
        Checkbox, 
        ListItemText } from "@material-ui/core";

// import { makeStyles } from "@material-ui/core/styles";

// const useStyles = makeStyles(() => ({
// }));

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

/* couldn't make id work, using name instead: TODO*/
const MultiSelectDropDown = (props) => {
    // const classes = useStyles();

    const [ selectedValue, setSelectedValue ] = useState([]);
    
    const { label, values, onChange } = props;

    useEffect(() => {
        // set all selected
        setSelectedValue(values);

    }, [values]);


    const handleChange = (event) => {
        const {
            target: { value },
        } = event;

        const selValue = typeof value === 'string' ? value.split(',') : value;

        setSelectedValue(selValue);

        onChange({ [label] : selValue });
    };

    return ( 
            <FormControl fullWidth>
                <InputLabel>{label}</InputLabel>
                <Select
                      multiple
                      value={selectedValue}
                      onChange={handleChange}
                      input={<OutlinedInput label={label}/>}
                      renderValue={(selected) => selected.join(', ')}
                      MenuProps={MenuProps}
                >
                    { values.map((value) => (
                        <MenuItem key={value} value={value}>
                            <Checkbox checked={selectedValue.indexOf(value) > -1} />
                            <ListItemText primary={value} />
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
    );
};


export default MultiSelectDropDown;