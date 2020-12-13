import { parse } from "date-fns";
import { DATE_FORMAT } from "../modules/resume/resume.consts";

export const parseDate = (date: string | null | undefined, format = "dd.mm.yyyy") => {
  if (!date || !DATE_FORMAT.test(date)) {
    return null;
  }

  return parse(date, format, new Date());
}
