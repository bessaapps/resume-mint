"use client";

import { Prospect } from "@/generated/prisma/client";
import { createProspect, getProspects } from "@/app/actions";
import { SubmitEvent, useEffect, useRef, useState } from "react";
import dayjs from "dayjs";

export default function HomePage() {
  const [prospects, setProspects] = useState<Prospect[]>([]);
  const [company, setCompany] = useState<string>();
  const [position, setPosition] = useState<string>();
  const [website, setWebsite] = useState<string>();
  const [status, setStatus] = useState<string>();
  const [companyDescription, setCompanyDescription] = useState<string>();
  const [jobDescription, setJobDescription] = useState<string>();
  const modalRef = useRef<HTMLDialogElement>(null);

  const handleSubmit = (event: SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!company || !position) return;

    createProspect({
      company,
      position,
      website,
      status,
      companyDescription,
      jobDescription,
      createdAt: new Date(),
    }).then((prospect) => {
      setProspects([prospect, ...prospects]);
    });
  };

  useEffect(() => {
    getProspects().then((prospects) => setProspects(prospects));
  }, []);

  return (
    <main className={"w-full max-w-7xl mx-auto p-4"}>
      <div className={"flex flex-row justify-end"}>
        <button
          className={"btn btn-primary btn-lg"}
          onClick={() => modalRef?.current && modalRef.current.showModal()}
        >
          Add Prospect
        </button>
        <dialog ref={modalRef} className={"modal"}>
          <div className={"modal-box"}>
            <h3 className="font-bold text-lg">Add Prospect</h3>
            <p className="py-4">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit.
              Accusantium at atque, earum facilis fuga in ipsa laboriosam
              officia possimus quasi, reprehenderit rerum ut! Commodi ducimus
              expedita soluta? Fuga, recusandae, sint.
            </p>
            <form onSubmit={handleSubmit} className={"flex flex-col gap-4"}>
              <fieldset className={"fieldset"}>
                <legend className={"fieldset-legend"}>Company Name</legend>
                <input
                  value={company}
                  onChange={(event) => setCompany(event.currentTarget.value)}
                  className={"input w-full"}
                  required
                />
                <legend className={"fieldset-legend"}>Position</legend>
                <input
                  value={position}
                  onChange={(event) => setPosition(event.currentTarget.value)}
                  className={"input w-full"}
                  required
                />
                <legend className={"fieldset-legend"}>Website</legend>
                <input
                  value={website}
                  onChange={(event) => setWebsite(event.currentTarget.value)}
                  className={"input w-full"}
                />
                <legend className={"fieldset-legend"}>
                  Company Description
                </legend>
                <textarea
                  value={companyDescription}
                  onChange={(event) =>
                    setCompanyDescription(event.currentTarget.value)
                  }
                  className={"textarea h-24 w-full"}
                />
                <legend className={"fieldset-legend"}>Job Description</legend>
                <textarea
                  value={jobDescription}
                  onChange={(event) =>
                    setJobDescription(event.currentTarget.value)
                  }
                  className={"textarea h-24 w-full"}
                />
              </fieldset>
              <button type={"submit"} className={"btn btn-primary"}>
                Submit
              </button>
            </form>
          </div>
          <form method={"dialog"} className={"modal-backdrop"}>
            <button>close</button>
          </form>
        </dialog>
      </div>
      <div className={"overflow-x-auto"}>
        <table className={"table table-zebra"}>
          <thead>
            <tr>
              <th>Company</th>
              <th>Position</th>
              <th>Status</th>
              <th>Last Activity</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {prospects?.map(({ id, company, position, updatedAt }) => (
              <tr key={id}>
                <th>{company}</th>
                <td>{position}</td>
                <td>Researching</td>
                <td>{dayjs(updatedAt).format("MM/DD/YYYY")}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}
