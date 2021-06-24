import {wordParser} from "../utils";

export const FiltersViewGenerator = (name: string): string => {
  const [nameSingular] = wordParser(name);

  return (`
import {isEqual} from "lodash";
import {FC, FormEvent, MouseEvent} from "react";
import {DateRangePicker} from "@material-ui/lab";
import {Search as SearchIcon, Add as AddIcon} from '@material-ui/icons';
import {Box, Button, CircularProgress, Divider, MenuItem, Stack} from "@material-ui/core"
import {Autocomplete, FormControl, IconButton, InputLabel, Select, TextField} from "@material-ui/core";
import AdapterMoment from "@material-ui/lab/AdapterMoment";
import LocalizationProvider from "@material-ui/lab/LocalizationProvider";
import use${nameSingular}Filters from "./${nameSingular}Filters.hook";
import use${nameSingular}Styles from "./${nameSingular}Filters.styles";
import {${nameSingular}ActionsCode, ${nameSingular}Action} from "../${nameSingular}Actions/${nameSingular}Actions.hook";

interface ${nameSingular}FilterProps {
  onChange: (filters: {}) => void;
  onClickCreate: (action: ${nameSingular}Action) => void;
}

const ${nameSingular}Filters: FC<${nameSingular}FilterProps> = ({onChange, onClickCreate}) => {
  const {
    filters,
    options,
    autocompleteValue,
    autocompleteLoading,
    handleAgeChange,
    handleDateRangeChange,
    handleAutocompleteChange,
    handleAutocompleteInputChange
  } = use${nameSingular}Filters();
  const classes = use${nameSingular}Styles();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    onChange(filters);
  };

  const handleCreateClick = (e: MouseEvent<HTMLAnchorElement> | MouseEvent<HTMLButtonElement>) => {
    onClickCreate({text: 'Создать', icon: AddIcon, code: ${nameSingular}ActionsCode.Create});
  };

  return (
    <form onSubmit={handleSubmit}>
      <Stack direction="row" alignItems="center" spacing={2}>
        <Autocomplete
          autoComplete
          includeInputInList
          filterSelectedOptions
          sx={{width: 300}}
          options={options}
          value={autocompleteValue}
          filterOptions={(x) => x}
          getOptionLabel={option => option.label}
          isOptionEqualToValue={(option, value) => isEqual(option, value)}
          onChange={handleAutocompleteChange}
          onInputChange={handleAutocompleteInputChange}
          renderInput={(params) => (
            <TextField
              {...params}
              InputProps={{
                ...params.InputProps,
                name: 'name',
                endAdornment: (
                  <>
                    {autocompleteLoading ? <CircularProgress color="inherit" size={20}/> : null}
                    {params.InputProps.endAdornment}
                  </>
                ),
              }}
              label="Name"
              fullWidth
            />
          )}
        />

        <LocalizationProvider dateAdapter={AdapterMoment}>
          <DateRangePicker
            startText="Дата начала"
            endText="Дата окончания"
            value={filters.range || [null, null]}
            onChange={handleDateRangeChange}
            renderInput={(startProps, endProps) => (
              <>
                <TextField {...startProps} helperText={undefined}/>
                <Box sx={{mx: 2}}/>
                <TextField {...endProps} helperText={undefined}/>
              </>
            )}
          />
        </LocalizationProvider>

        <FormControl sx={{m: 1, minWidth: 80}}>
          <InputLabel>Age</InputLabel>
          <Select
            autoWidth
            name="age"
            label="Age"
            size="medium"
            onChange={handleAgeChange}
            value={filters?.age?.toString() || ''}
          >
            <MenuItem value={10}>Ten</MenuItem>
            <MenuItem value={20}>Twenty</MenuItem>
            <MenuItem value={30}>Thirty</MenuItem>
          </Select>
        </FormControl>

        {/* Add your filer controls here...*/}

        <IconButton
          className={classes.submitBtn}
          color="primary"
          type="submit"
        >
          <SearchIcon/>
        </IconButton>

        <Divider orientation="vertical"/>

        <Button
          onClick={handleCreateClick}
          variant="contained"
          color="primary"
        >
          Создать
        </Button>
      </Stack>
    </form>
  );
};

export default ${nameSingular}Filters;
  `);
};

export const FiltersHookGenerator = (name: string): string => {
  const [nameSingular] = wordParser(name);

  return (`
import {ChangeEvent, SyntheticEvent, useState} from "react";
import {DateRange} from "@material-ui/lab";
import {Moment} from "moment";

/* add your filter object keys & types. */
interface Filters {
  name?: string;
  range?: DateRange<Moment>;
  age?: number;
}

/* Replace interface name & keys with your response type. */
interface Movie {
  label: string;
  year: number;
}

const use${nameSingular}Filters = () => {
  const [filters, setFilters] = useState<Filters>({} as Filters);
  const [options, setOptions] = useState<Array<Movie>>([]);
  const [autocompleteValue, setAutocompleteValue] = useState<Movie|null>(null);
  const [autocompleteLoading, setAutocompleteLoading] = useState<boolean>(false);

  const handleFiltersChange = (filter: {}) => setFilters(oldFilters => ({...oldFilters, ...filter}));

  const handleDateRangeChange = (range: DateRange<Moment>) => handleFiltersChange({range});

  const handleAutocompleteChange = (_: any, value: object|null) => setAutocompleteValue(value as Movie);

  const handleAutocompleteInputChange = (_: SyntheticEvent, value: string) => {
    setAutocompleteLoading(true);

    // Replace with api request
    Promise.resolve(options)
      .then(options => options.filter(option => (new RegExp(value, 'gi')).test(option.label)))
      .then(options => options.map(option => ({...option})))
      .then(options => setTimeout(() => setOptions(options), 1000))
      .then(() => handleFiltersChange({name: value}))
      .then(() => setAutocompleteLoading(false));
  };

  const handleAgeChange = (e: ChangeEvent<{ name?: string; value: string; event: Event | SyntheticEvent }>) => {
    const {name, value} = e.target;

    handleFiltersChange({[name!]: +value});
  };

  return {
    filters,
    options,
    autocompleteValue,
    autocompleteLoading,
    handleAgeChange,
    handleFiltersChange,
    handleDateRangeChange,
    handleAutocompleteChange,
    handleAutocompleteInputChange
  };
}

export default use${nameSingular}Filters;
  `);
};

export const FiltersStylesGenerator = (name: string): string => {
  const [nameSingular] = wordParser(name);

  return (`
import {makeStyles} from "@material-ui/styles";
import {Theme} from "@material-ui/core/styles";

const use${nameSingular}Styles = makeStyles((theme: Theme) => ({
  root: {

  }
}));

export default use${nameSingular}Styles;
  `);
};
