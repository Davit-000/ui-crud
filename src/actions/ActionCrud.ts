const fs = require("fs");
const path = require("path");

const ActionCrud = (name: string): void => {
  const appDir = path.dirname(require.main?.filename);

  console.log(appDir);

  if (fs.existsSync(`${appDir}/src/components`)) {
    console.log(name);
  }
};

export default ActionCrud;
