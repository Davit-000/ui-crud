import {wordParser} from "../utils";

export const FormViewGenerator = (name: string): string => {
  const [nameSingular] = wordParser(name);

  return (`
import {FC} from "react";
import {Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from "@material-ui/core";
import use${nameSingular}Form from "./${nameSingular}Form.hook";
import use${nameSingular}FormStyles from "./${nameSingular}Form.styles";

interface ${nameSingular}FormProps {
  title: string;
  text?: string;
  submitTex?: string;
  cancelText?: string;
  onSubmit?: (values: {}) => void;
}

const ${nameSingular}Form: FC<${nameSingular}FormProps> = ({
 title,
 text,
 submitTex,
 cancelText,
 onSubmit
}) => {
  const {
    open,
    values,
    handleClose,
    handleSubmit,
    handleInputChange
  } = use${nameSingular}Form();
  const clasees = use${nameSingular}FormStyles();

  return (
    <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">{title}</DialogTitle>
      <DialogContent>
        <DialogContentText>{text}</DialogContentText>
        {/* Form items here... */}

      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>{cancelText || 'отменить'}</Button>
        <Button onClick={_ => handleSubmit(onSubmit)}>{submitTex || 'Создать'}</Button>
      </DialogActions>
    </Dialog>
  );
}

export default ${nameSingular}Form;
  `);
};

export const FormHookGenerator = (name: string): string => {
  const [nameSingular] = wordParser(name);

  return (`
import {ChangeEvent, useState} from "react";

const use${nameSingular}Form = () => {
  const [open, setOpen] = useState(false);
  const [values, setValues] = useState<{}>({});

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);

    handleReset();
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement|HTMLTextAreaElement>) => {
    const {name, value} = e.target;

    setValues(oldValues => ({...oldValues, [name]: value}));
  };

  const handleReset = () => {
    setValues({});
  };

  const handleSubmit = (onSubmit?: (values: any) => void) => {
    if (onSubmit) {
      onSubmit(values);
    }

    handleClose();
  };

  return {
    open,
    values,
    handleOpen,
    handleClose,
    handleSubmit,
    handleInputChange
  }
};

export default use${nameSingular}Form;
  `);
};

export const FormStylesGenerator = (name: string): string => {
  const [nameSingular] = wordParser(name);

  return (`
import {Theme} from "@material-ui/core";
import {makeStyles} from '@material-ui/styles';

const use${nameSingular}FormStyles = makeStyles((theme: Theme) => ({
  root: {

  }
}));

export default use${nameSingular}FormStyles;
  `);
};
