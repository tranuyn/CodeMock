import { SORT_FIELD } from "../enums/sortField";
import { SORT_ORDER } from "../enums/sortOrder";

export const parseSortOption = (option: string): {
  sortField: SORT_FIELD;
  sortOrder: SORT_ORDER;
} => {
  const [field, order] = option.split("_");

  let sortField: SORT_FIELD;
  switch (field) {
    case "created":
      sortField = SORT_FIELD.CREATED_AT;
      break;
    case "start":
      sortField = SORT_FIELD.START_TIME;
      break;
    default:
      sortField = SORT_FIELD.CREATED_AT;
  }

  const sortOrder =
    order === "asc" ? SORT_ORDER.ASC : SORT_ORDER.DESC;

  return { sortField, sortOrder };
};
