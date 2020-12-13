import { COMPANY_NAME, DATE_FORMAT, RESUME_URL } from "../resume.consts";
import { Education, Experience } from "../models/resume.model";
import { parseDate } from "../../../utils/date-helpers";

export const isSkillsValid = (skills: string[] | undefined) => {
  if (!skills) {
    return true;
  }

  return skills.every((skill) => skill.length > 2);
};

export const isUrlValid = (url: string | undefined) => {
  if (typeof url === "undefined") {
    return true;
  }
  return RESUME_URL.test(url);
};

export const isExperienceArrayValid = (
  experienceList: Experience[] | undefined
) => {
  if (!experienceList || !experienceList.length) {
    return false;
  }

  return experienceList.every((experience) => isExperienceValid(experience));
};

const isExperienceValid = (experience: Experience) => {
  let error = false;

  if (!experience) {
    error = true;
  }

  if (!COMPANY_NAME.test(experience.company)) {
    error = true;
  }

  if (experience.description && experience.description.length > 1000) {
    error = true;
  }

  if (experience.position && experience.position.length > 100) {
    error = true;
  }

  error = !parseDate(experience.startDate);

  if (experience.endDate && !isDateValid(experience.endDate)) {
    error = true;
  }

  const startDate = parseDate(experience.startDate);
  const endDate = parseDate(experience.endDate);

  error = !startDate;

  if (startDate && endDate && startDate > endDate) {
    error = true;
  }

  return !error;
};

export const isEducationArrayValid = (
  educationList: Education[] | undefined
) => {
  if (!educationList || !educationList.length) {
    return true;
  }

  return educationList.every((education) => isEducationValid(education));
};

const isEducationValid = (education: Education) => {
  let error: boolean = false;

  if (!COMPANY_NAME.test(education.institution)) {
    error = true;
  }

  if (education.speciality && education.speciality.length > 100) {
    error = true;
  }

  error = !parseDate(education.startDate);

  if (education.endDate && !isDateValid(education.endDate)) {
    error = true;
  }

  const startDate = parseDate(education.startDate);
  const endDate = parseDate(education.endDate);

  if (startDate && endDate && startDate > endDate) {
    console.log("error date");
    error = true;
  }

  return !error;
};

const isDateValid = (date: string) => DATE_FORMAT.test(date);
