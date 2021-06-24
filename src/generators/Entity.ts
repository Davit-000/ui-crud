import {wordParser} from "../utils";

const ViewGenerator = (name: string): string => {
  const [nameSingular, namePlural] = wordParser(name);

  return (`
import {FC} from "react";
import {Container} from "@material-ui/core";
import {DataGrid, GridValueGetterParams} from "@material-ui/data-grid";
import use${namePlural}, {FilterProps} from "./${namePlural}.hook";
import use${namePlural}Styles from "./${namePlural}.styles";
import ${nameSingular}Form from "./${nameSingular}Form/${nameSingular}Form";
import ${nameSingular}Actions from "./${nameSingular}Actions/${nameSingular}Actions";
import ${nameSingular}Filters from "./${nameSingular}Filters/${nameSingular}Filters";
import {${nameSingular}Action} from "./${nameSingular}Actions/${nameSingular}Actions.hook";

interface ${namePlural}Props {
  name?: string
}

const ${namePlural}: FC<${namePlural}Props> = ({name}) => {
  const {
    rows,
    columns,
    rowCount,
    loading,
    filters,
    sortModel,
    rowsPerPageOptions,
    setFilters,
    isCellEditable,
    handlePageChange,
    handlePageSizeChange,
    handleSortModelChange
  } = use${namePlural}({
    actionCell: {
      flex: 1,
      align: "right",
      type: "string",
      field: "action",
      sortable: false,
      editable: false,
      headerName: "Действие",
      headerAlign: "right",
      disableClickEventBubbling: true,
      renderCell: (params: GridValueGetterParams) =>
        <${nameSingular}Actions
          onSelect={handleSelect}
          params={params}
        />,
    }
  });
  const {pageSize} = filters;
  const classes = use${namePlural}Styles();

  const handleSelect = (action: ${nameSingular}Action, params: GridValueGetterParams) => {
    console.log(action, params);
  };

  return (
    <Container className={classes.root}>
      <${nameSingular}Form
        title="Создать пост"
        onSubmit={(values: any) => console.log(values)}
      />

      <DataGrid
        pagination
        autoHeight
        checkboxSelection
        hideFooterRowCount
        rows={rows}
        columns={columns}
        loading={loading}
        pageSize={pageSize}
        rowCount={rowCount}
        sortModel={sortModel}
        sortingMode="server"
        paginationMode="server"
        onPageChange={handlePageChange}
        isCellEditable={isCellEditable}
        onPageSizeChange={handlePageSizeChange}
        onSortModelChange={handleSortModelChange}
        rowsPerPageOptions={rowsPerPageOptions}
        componentsProps={{
          toolbar: {
            onChange: (filters: FilterProps & {}) => setFilters(filters),
            onClickCreate: handleSelect
          },
        }}
        components={{
          Toolbar: ${nameSingular}Filters,
        }}
      />
    </Container>
  );
};

export default ${namePlural};
  `);
};

const HookGenerator = (name: string): string => {
  const [_, namePlural] = wordParser(name);

  return (`
import {useEffect, useState} from "react";
import {
  GridColDef,
  GridRowsProp,
  GridSortModel,
  GridCellParams,
  GridSortModelParams,
  GridPageChangeParams,
} from "@material-ui/data-grid";
import api from "../../app/api";

export interface FilterProps {
  page: number;
  pageSize: number;
}

export interface Use${namePlural}Props {
  actionCell: GridColDef;
}

const use${namePlural} = ({actionCell}: Use${namePlural}Props) => {
  const url = process.env.REACT_APP_API_URL;
  const rowsPerPageOptions = [5, 10, 20];
  const [rows, setRows] = useState<GridRowsProp>([]);
  const [columns, setColumns] = useState<Array<GridColDef>>([
    {field: 'col1', headerName: 'Column 1', width: 150},
    {field: 'col2', headerName: 'Column 2', width: 150},
    {...actionCell}
  ]);
  const [rowCount, setRowCount] = useState<number>(0);
  const [filters, setFilters] = useState<FilterProps & {}>({
    page: 1,
    pageSize: 5
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [sortModel, setSortModel] = useState<GridSortModel>([]);

  const get${namePlural} = (filters: FilterProps) => api
    .get<{ ${namePlural.toLowerCase()}: GridRowsProp; totalCount: number }>(\`\${url!}/measurementLog/template\`, {params: filters})
    .then(() => ({
      ${namePlural.toLowerCase()}: [
        {id: 1, col1: 'Hello', col2: 'World'},
        {id: 2, col1: 'XGrid', col2: 'is Awesome'},
        {id: 3, col1: 'Material-UI', col2: 'is Amazing'},
        {id: 4, col1: 'Hello', col2: 'World'},
        {id: 5, col1: 'XGrid', col2: 'is Awesome'},
        {id: 6, col1: 'Material-UI', col2: 'is Amazing'},
        {id: 7, col1: 'Hello', col2: 'World'},
        {id: 8, col1: 'XGrid', col2: 'is Awesome'},
        {id: 9, col1: 'Material-UI', col2: 'is Amazing'},
        {id: 10, col1: 'Hello', col2: 'World'},
        {id: 12, col1: 'XGrid', col2: 'is Awesome'},
        {id: 13, col1: 'Material-UI', col2: 'is Amazing'},
      ],
      totalCount: 19
    }));

  const isCellEditable = (params: GridCellParams) => !!params.id;

  const handlePageChange = ({page}: GridPageChangeParams) => setFilters((filters) => ({...filters, page}));

  const handlePageSizeChange = ({pageSize}: GridPageChangeParams) => setFilters(filters => ({...filters, pageSize}));

  const handleSortModelChange = ({sortModel}: GridSortModelParams) => setSortModel(sortModel);

  useEffect(() => {
    setLoading(true);

    get${namePlural}(filters)
      .then(({rows, totalCount}) => {
        setRows(rows)
        setRowCount(totalCount);
        setLoading(false);
      });
  }, [filters]);

  return {
    rows,
    columns,
    rowCount,
    filters,
    loading,
    sortModel,
    rowsPerPageOptions,
    get${namePlural},
    setFilters,
    isCellEditable,
    handlePageChange,
    handlePageSizeChange,
    handleSortModelChange
  };
};

export default use${namePlural};
  `);
};

const StylesGenerator = (name: string): string => {
  const [_, namePlural] = wordParser(name);

  return (`
import {Theme} from "@material-ui/core";
import {makeStyles} from '@material-ui/styles';

const use${namePlural}Styles = makeStyles((theme: Theme) => ({
  root: {

  }
}));

export default use${namePlural}Styles;
  `);
};

export {
  ViewGenerator,
  HookGenerator,
  StylesGenerator
};
