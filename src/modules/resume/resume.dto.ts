import { Education, Experience } from "./models/resume.model";

export interface ResumeDtoPayload {
  url?: string;
  experience?: Experience[];
  education?: Education[];
  skills?: string[];
}
