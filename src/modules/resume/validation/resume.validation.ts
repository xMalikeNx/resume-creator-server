import { parse } from "date-fns";

import { COMPANY_NAME, DATE_FORMAT, RESUME_URL } from "../resume.consts";
import { Education, Experience } from "../models/resume.model";

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

  if (!experience.startDate || !isDateValid(experience.startDate)) {
    error = true;
  }

  if (experience.endDate && !isDateValid(experience.endDate)) {
    error = true;
  }

  if (
    experience.startDate &&
    experience.endDate &&
    +experience.startDate > +experience.endDate
  ) {
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
  let error = false;

  if (!COMPANY_NAME.test(education.institution)) {
    error = true;
  }

  if (education.speciality && education.speciality.length > 100) {
    error = true;
  }

  if (!education.startDate || !isDateValid(education.startDate)) {
    error = true;
  }

  if (education.endDate && !isDateValid(education.endDate)) {
    error = true;
  }

  if (
    education.startDate &&
    education.endDate &&
    +education.startDate > +education.endDate
  ) {
    error = true;
  }

  return !error;
};

const isDateValid = (date: string) => DATE_FORMAT.test(date);
