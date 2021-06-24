import {wordParser} from "../utils";

export const ActionViewGenerator = (name: string): string => {
  const [nameSingular] = wordParser(name);

  return (`
import {createElement, FC} from "react";
import {GridValueGetterParams} from "@material-ui/data-grid";
import {Fade, Link, ListItemIcon, ListItemText, Menu, MenuItem} from "@material-ui/core";
import use${nameSingular}Actions, {${nameSingular}Action} from "./${nameSingular}Actions.hook";

export interface ${nameSingular}ActionsProps {
  params: GridValueGetterParams;
  onSelect: (action: ${nameSingular}Action, params: GridValueGetterParams) => void;
}

const ${nameSingular}Actions: FC<${nameSingular}ActionsProps> = ({params, onSelect}) => {
  const {actions, anchorEl, handleClose, handleOpen, handleSelect} = use${nameSingular}Actions();

  return (
    <>
      <Link
        component="button"
        variant="body2"
        onClick={handleOpen}
      >
        Действие
      </Link>

      <Menu
        open={!!anchorEl}
        anchorEl={anchorEl}
        onClose={handleClose}
        TransitionComponent={Fade}
      >
        {actions.map(({text, icon, code}, index) => (
          <MenuItem onClick={_ => handleSelect({text, icon, code}, params, onSelect)} key={index}>
            <ListItemIcon>
              {createElement(icon, {fontSize: "small"})}
            </ListItemIcon>
            <ListItemText primary={text}/>
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};

export default ${nameSingular}Actions;
  `);
};

export const ActionHookGenerator = (name: string): string => {
  const [nameSingular] = wordParser(name);

  return (`
import {useState, MouseEvent} from "react";
import {SvgIconTypeMap} from "@material-ui/core";
import {Edit, Delete, Visibility} from "@material-ui/icons";
import {GridValueGetterParams} from "@material-ui/data-grid";
import {OverridableComponent} from "@material-ui/core/OverridableComponent";

type ActionMenuIcon = OverridableComponent<SvgIconTypeMap> & {muiName: string};

export enum ${nameSingular}ActionsCode {
  Delete,
  Create,
  Edit,
  Show
}

export interface ${nameSingular}Action {
  text: string;
  icon: ActionMenuIcon;
  code: ${nameSingular}ActionsCode;
}

const use${nameSingular}Actions = () => {
  const actions: Array<${nameSingular}Action> = [
    {text: 'Показать', icon: Visibility, code: ${nameSingular}ActionsCode.Show},
    {text: 'Редактировать', icon: Edit, code: ${nameSingular}ActionsCode.Edit},
    {text: 'Удалить', icon: Delete, code: ${nameSingular}ActionsCode.Delete},
  ];
  const [anchorEl, setAnchorEl] = useState<HTMLAnchorElement | HTMLSpanElement | null>(null);

  const handleOpen = (e: MouseEvent<HTMLAnchorElement> | MouseEvent<HTMLSpanElement>) => {
    if (anchorEl === e.currentTarget) {
      return;
    }

    setAnchorEl(e.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSelect = (
    action: ${nameSingular}Action,
    params: GridValueGetterParams,
    onSelect: (action: ${nameSingular}Action, params: GridValueGetterParams) => void
  ) => {
    handleClose();

    onSelect(action, params);
  };

  return {
    actions,
    anchorEl,
    handleOpen,
    handleClose,
    handleSelect
  };
};

export default use${nameSingular}Actions;
  `);
};

export const ActionStylesGenerator = (name: string): string => {
  const [nameSingular] = wordParser(name);

  return (`
import {Theme} from "@material-ui/core";
import {makeStyles} from '@material-ui/styles';

const use${nameSingular}ActionStyles = makeStyles((theme: Theme) => ({
  root: {

  }
}));

export default use${nameSingular}ActionStyles;
  `);
};
