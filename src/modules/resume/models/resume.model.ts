import { model, Schema, Types, Document } from "mongoose";

import { UserModel } from "../../user/models/user.model";

export type Experience = {
  company: string;
  position: string;
  startDate: string;
  endDate: string | null;
  duties: string[];
  description?: string;
};

export type Education = {
  institution: string;
  speciality: string;
  startDate: string;
  endDate: string | null;
};

export type ResumeDocument = {
  user: string;
  _id?: string;
  url?: string;
  experience?: Experience[];
  education?: Education[];
  skills?: string[];
} & Document;

const ExperienceSchema = new Schema({
  company: String,
  position: String,
  startDate: Date,
  endDate: Date,
  description: String,
  duties: {
    type: [String],
  },
});

const EducationSchema = new Schema({
  institution: String,
  speciality: String,
  startDate: Date,
  endDate: Date,
});

const ResumeSchema = new Schema({
  user: {
    type: Types.ObjectId,
    ref: UserModel,
  },
  url: {
    type: String,
    required: false,
  },
  experience: [ExperienceSchema],
  education: [EducationSchema],
  skills: {
    type: [String],
  },
});

export const ResumeModel = model<ResumeDocument>("resume", ResumeSchema);
