"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function YouTubeSearch() {
  const [query, setQuery] = useState("");
  const router = useRouter();

  const handleSearch = (e: any) => {
    e.preventDefault();
    router.push(`/youtube-results?q=${encodeURIComponent(query)}`);
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">YouTube Search</h1>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="border p-2 mr-2"
          placeholder="Enter search query"
        />
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">
          Search
        </button>
      </form>
    </div>
  );
}
