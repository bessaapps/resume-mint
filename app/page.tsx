import AddProspectButton from "@/components/AddProspectButton";

export default function HomePage() {
  return (
    <main className={"w-full max-w-7xl mx-auto p-4"}>
      <AddProspectButton />
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
            <tr>
              <th>Microsoft</th>
              <td>Software Engineer</td>
              <td>Researching</td>
              <td>2/6/26</td>
            </tr>
            <tr>
              <th>Microsoft</th>
              <td>Software Engineer</td>
              <td>Researching</td>
              <td>2/6/26</td>
            </tr>
            <tr>
              <th>Microsoft</th>
              <td>Software Engineer</td>
              <td>Researching</td>
              <td>2/6/26</td>
            </tr>
            <tr>
              <th>Microsoft</th>
              <td>Software Engineer</td>
              <td>Researching</td>
              <td>2/6/26</td>
            </tr>
          </tbody>
        </table>
      </div>
    </main>
  );
}
