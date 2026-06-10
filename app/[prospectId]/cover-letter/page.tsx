"use client";

import React, { useEffect, useState } from "react";
import { Prospect } from "@/generated/prisma/client";
import {
  background,
  education,
  experience,
  projects,
  skills,
} from "@/lib/profile";
import { getProspect } from "@/app/actions";
import ReactMarkdown from "react-markdown";
import { generateContent } from "@/lib/helpters";

export default function CoverLetterPage({
  params,
}: {
  params: Promise<{ prospectId: string }>;
}) {
  const [activeProspect, setActiveProspect] = useState<Prospect | null>();
  const [isFetchingProspect, setIsFetchingProspect] = useState(true);
  const [coverLetter, setCoverLetter] = useState("");
  const [isThinking, setIsThinking] = useState(true);
  const { prospectId } = React.use(params);

  useEffect(() => {
    if (!prospectId) return;

    getProspect(parseInt(prospectId)).then((prospect) => {
      setActiveProspect(prospect);
      setIsFetchingProspect(false);
    });
  }, [activeProspect?.id, prospectId]);

  useEffect(() => {
    if (
      !activeProspect?.position ||
      !activeProspect?.company ||
      !activeProspect?.jobDescription
    )
      return setIsThinking(false);

    const prompt =
      `Write me the body of a cover letter with no salutation or signature. It should be 3 paragraphs and should highlight my relevant skills. The company I'm applying to  is ${activeProspect.company}. ` +
      `${
        activeProspect?.companyDescription
          ? `Here is some information about the company: "${activeProspect.companyDescription}" `
          : ""
      }` +
      `The position is ${activeProspect.position}. ` +
      `${
        activeProspect?.jobDescription
          ? `Here is some information about the position I'm applying to: "${activeProspect.jobDescription}" `
          : ""
      }` +
      `My professional background is as follows: "${background}" My skills include the following: "${skills}" My experience includes the following: "${experience}" My educational background is as follows: "${education}" My projects include the following: "${projects}" Do not append suggestions, follow-up questions, or offers to help.`;

    generateContent(prompt, { setCoverLetter, setIsThinking });
  }, [activeProspect, background, skills, experience, education, projects]);

  return (
    <div className={"w-full max-w-7xl mx-auto p-4"}>
      <div className={"card bg-base-100 shadow-sm w-full"}>
        <div className={"card-body"}>
          {!isFetchingProspect &&
          !isThinking &&
          (!activeProspect?.position ||
            !activeProspect?.company ||
            !activeProspect?.jobDescription) ? (
            <div role={"alert"} className={"alert alert-warning"}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 shrink-0 stroke-current"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
              <span>
                Make sure the prospect includes the company, position, and job
                description.
              </span>
            </div>
          ) : (
            <>
              <div className={"flex justify-between"}>
                <h1
                  className={
                    "text-2xl font-semibold flex items-center gap-2 mb-2"
                  }
                >
                  Cover Letter{" "}
                  {isThinking && (
                    <span className={"loading loading-dots loading-xl"}></span>
                  )}
                </h1>
              </div>
              {coverLetter && <ReactMarkdown>{coverLetter}</ReactMarkdown>}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
