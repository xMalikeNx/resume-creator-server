import { isValidObjectId } from "mongoose";

import { UserModel } from "../user/models/user.model";
import { ResumeDocument, ResumeModel } from "./models/resume.model";
import { HttpError } from "../../utils/HttpError";
import { ResumeDtoPayload } from "./resume.dto";
import { parseDate } from "../../utils/date-helpers";

export class ResumeService {
  getUser = async (userId: string) => {
    const user = await UserModel.findOne({ _id: userId });
    if (!user) {
      throw new HttpError("User not found", 404);
    }
    return user;
  };

  createResume = async (userId: string, createResumeDto: ResumeDtoPayload) => {
    const user = await this.getUser(userId);
    console.log(user);

    const { url } = createResumeDto;
    if (url) {
      const resumeWithUrl = await ResumeModel.findOne({ url });
      if (resumeWithUrl) {
        throw new HttpError(`Resume with url ${url} already exists`, 400);
      }
    }

    const payloadData = {
      ...createResumeDto,
      education: createResumeDto.education?.map((item) => ({
        ...item,
        startDate: parseDate(item.startDate),
        endDate: item.endDate ? parseDate(item.endDate) : null,
      })),
      experience: createResumeDto.experience?.map((item) => ({
        ...item,
        startDate: parseDate(item.startDate),
        endDate: item.endDate ? parseDate(item.endDate) : null,
      })),
      user: user._id as string,
    };

    const resume = await ResumeModel.create(payloadData as ResumeDocument);
    resume.save();

    return resume;
  };

  getResumes = async (userId: string) => {
    const user = await this.getUser(userId);
    console.log(user);

    const resumes = await ResumeModel.find({ user: user._id });
    return resumes;
  };

  updateResume = async (
    userId: string,
    resumeId: string,
    updateResumeDto: ResumeDtoPayload
  ) => {
    const resume = await ResumeModel.findOne({ _id: resumeId, user: userId });
    if (!resume) {
      throw new HttpError("Resume not found", 404);
    }
    await resume.set(updateResumeDto);
    await resume.save();
    return resume;
  };

  getResume = async (userLogin: string, resumeUrl: string) => {
    const user = await UserModel.findOne({ login: userLogin });
    if (!user) {
      throw new HttpError("Resume not found", 404);
    }

    let resume;
    if (isValidObjectId(resumeUrl)) {
      resume = await ResumeModel.findOne({ _id: resumeUrl, user: user._id });
    } else {
      resume = await ResumeModel.findOne({ url: resumeUrl, user: user._id });
    }

    if (!resume) {
      throw new HttpError("Resume not found", 404);
    }

    return resume;
  };

  deleteResume = async (userId: string, resumeId: string) => {
    const resume = await ResumeModel.findOne({ _id: resumeId, user: userId });
    if (!resume) {
      throw new HttpError("Resume not found", 404);
    }
    await resume.delete();
  };
}
