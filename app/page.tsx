import Link from "next/link";

export default function HomePage() {
  return (
    <main className={"content-center h-screen max-w-4xl mx-auto p-4"}>
      <div className={"flex flex-col gap-4"}>
        <div className={"flex gap-2"}>
          <h1 className={"font-extrabold"}>Resume Mint</h1>
        </div>
        <p className={"text-4xl"}>
          Land More Interviews with Smarter Tracking & AI-Generated Resumes
        </p>
        <p>
          Stay ahead in a competitive market. Track your applications and cold
          outreach in an easy-to-use dashboard. Generate targeted resumes, cover
          letters, follow-ups, and cold emails based on your skills, experience,
          and more.
        </p>
        <div className={"flex gap-4"}>
          <Link href={"/register"}>
            <button className={"btn btn-primary"}>Get Started for FREE!</button>
          </Link>
          <Link href={"/login"}>
            <button className={"btn btn-outline"}>Login</button>
          </Link>
        </div>
        <Link href={"/dashboard/prospects"}>
          <button className={"btn btn-primary"}>Dashboard</button>
        </Link>
        <p className={"text-neutral-700 text-sm"}>
          Proudly created by{" "}
          <Link
            href={"https://bessaapps.com"}
            title={"Bessa Community Apps | React Native App Developer"}
            className={"underline"}
          >
            Bessa Community Apps
          </Link>
        </p>
      </div>
    </main>
  );
}
