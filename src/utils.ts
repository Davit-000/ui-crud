import {startCase} from "lodash";
import * as pluralize from "pluralize";

type wordParserResult = [string, string];

export const wordParser = (word: string): wordParserResult => {
  return [
    startCase(pluralize.singular(word)),
    startCase(pluralize.plural(word))
  ];
};
