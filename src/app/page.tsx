import Link from "next/link";

export default function Home() {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Social Media Manager</h1>
      <Link href="/youtube-search" className="text-blue-500 hover:underline">
        YouTube Search
      </Link>
    </div>
  );
}
