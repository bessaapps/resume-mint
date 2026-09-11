import Link from "next/link";
import { STATUSES } from "@/lib/constants";
import dayjs from "dayjs";
import { Prospect } from "@/generated/prisma/client";

export default function Row({ prospect }: { prospect: Prospect }) {
  const { id, company, position, website, status, updatedAt } = prospect;

  let url;

  if (website)
    try {
      url = new URL(website);
    } catch (error) {
      console.log(error);
    }

  return (
    <tr key={id}>
      <th>{company}</th>
      <td>{position}</td>
      <td>
        {url && (
          <p className={"line-clamp-1"}>
            <Link href={url} target={"_blank"}>
              {url.hostname}
            </Link>
          </p>
        )}
      </td>
      <td className={"w-50"}>
        <select
          value={status || "Researching"}
          className={"select select-ghost"}
        >
          {STATUSES.map((status) => (
            <option key={status}>{status}</option>
          ))}
        </select>
      </td>
      <td>{dayjs(updatedAt).format("M/D/YY")}</td>
      <td>
        <div className={"flex justify-center gap-2"}>
          <Link href={`/${id}/cover-letter`}>
            <button className={"btn btn-secondary btn-sm text-nowrap"}>
              Cover Letter
            </button>
          </Link>
          <Link href={`/${id}/follow-up`}>
            <button className={"btn btn-secondary btn-sm text-nowrap"}>
              Follow-Up
            </button>
          </Link>
        </div>
      </td>
    </tr>
  );
}
