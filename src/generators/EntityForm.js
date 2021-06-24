"use strict";
exports.__esModule = true;
exports.FormStylesGenerator = exports.FormHookGenerator = exports.FormViewGenerator = void 0;
var utils_1 = require("../utils");
var FormViewGenerator = function (name) {
    var nameSingular = utils_1.wordParser(name)[0];
    return ("\nimport {FC} from \"react\";\nimport {Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from \"@material-ui/core\";\nimport use" + nameSingular + "Form from \"./" + nameSingular + "Form.hook\";\nimport use" + nameSingular + "FormStyles from \"./" + nameSingular + "Form.styles\";\n\ninterface " + nameSingular + "FormProps {\n  title: string;\n  text?: string;\n  submitTex?: string;\n  cancelText?: string;\n  onSubmit?: (values: {}) => void;\n}\n\nconst " + nameSingular + "Form: FC<" + nameSingular + "FormProps> = ({\n title,\n text,\n submitTex,\n cancelText,\n onSubmit\n}) => {\n  const {\n    open,\n    values,\n    handleClose,\n    handleSubmit,\n    handleInputChange\n  } = use" + nameSingular + "Form();\n  const clasees = use" + nameSingular + "FormStyles();\n\n  return (\n    <Dialog open={open} onClose={handleClose} aria-labelledby=\"form-dialog-title\">\n      <DialogTitle id=\"form-dialog-title\">{title}</DialogTitle>\n      <DialogContent>\n        <DialogContentText>{text}</DialogContentText>\n        {/* Form items here... */}\n\n      </DialogContent>\n      <DialogActions>\n        <Button onClick={handleClose}>{cancelText || '\u043E\u0442\u043C\u0435\u043D\u0438\u0442\u044C'}</Button>\n        <Button onClick={_ => handleSubmit(onSubmit)}>{submitTex || '\u0421\u043E\u0437\u0434\u0430\u0442\u044C'}</Button>\n      </DialogActions>\n    </Dialog>\n  );\n}\n\nexport default " + nameSingular + "Form;\n  ");
};
exports.FormViewGenerator = FormViewGenerator;
var FormHookGenerator = function (name) {
    var nameSingular = utils_1.wordParser(name)[0];
    return ("\nimport {ChangeEvent, useState} from \"react\";\n\nconst use" + nameSingular + "Form = () => {\n  const [open, setOpen] = useState(false);\n  const [values, setValues] = useState<{}>({});\n\n  const handleOpen = () => {\n    setOpen(true);\n  };\n\n  const handleClose = () => {\n    setOpen(false);\n\n    handleReset();\n  };\n\n  const handleInputChange = (e: ChangeEvent<HTMLInputElement|HTMLTextAreaElement>) => {\n    const {name, value} = e.target;\n\n    setValues(oldValues => ({...oldValues, [name]: value}));\n  };\n\n  const handleReset = () => {\n    setValues({});\n  };\n\n  const handleSubmit = (onSubmit?: (values: any) => void) => {\n    if (onSubmit) {\n      onSubmit(values);\n    }\n\n    handleClose();\n  };\n\n  return {\n    open,\n    values,\n    handleOpen,\n    handleClose,\n    handleSubmit,\n    handleInputChange\n  }\n};\n\nexport default use" + nameSingular + "Form;\n  ");
};
exports.FormHookGenerator = FormHookGenerator;
var FormStylesGenerator = function (name) {
    var nameSingular = utils_1.wordParser(name)[0];
    return ("\nimport {Theme} from \"@material-ui/core\";\nimport {makeStyles} from '@material-ui/styles';\n\nconst use" + nameSingular + "FormStyles = makeStyles((theme: Theme) => ({\n  root: {\n\n  }\n}));\n\nexport default use" + nameSingular + "FormStyles;\n  ");
};
exports.FormStylesGenerator = FormStylesGenerator;
