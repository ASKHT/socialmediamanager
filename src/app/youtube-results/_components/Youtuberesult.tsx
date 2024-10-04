"use client";
import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"; // Adjust the import path as necessary

export default function YouTubeResults({ query }) {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [nextPageToken, setNextPageToken] = useState(null);

  const fetchResults = async (pageToken = "") => {
    setLoading(true);
    try {
      const response = await fetch(
        `/api/youtube-search?q=${encodeURIComponent(
          query
        )}&pageToken=${pageToken}`
      );
      const data = await response.json();
      console.log(data);
      setResults((prevResults) =>
        pageToken ? [...prevResults, ...data.items] : data.items
      );
      setNextPageToken(data.nextPageToken);
    } catch (error) {
      console.error("Error fetching YouTube results:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchResults();
  }, [query]);

  const loadMore = () => {
    if (nextPageToken) {
      fetchResults(nextPageToken);
    }
  };

  if (loading && results.length === 0)
    return <div className="text-center">Loading...</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-center">
        YouTube Search Results
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {results.map((video, index) => (
          <Card key={index} className="shadow-lg">
            <CardHeader>
              <CardTitle>{video.snippet.title}</CardTitle>
              <CardDescription>{video.snippet.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="aspect-w-16 aspect-h-9">
                <iframe
                  src={`https://www.youtube.com/embed/${video.id.videoId}`}
                  allow="autoplay; encrypted-media"
                  allowFullScreen
                  className="w-full h-full"
                ></iframe>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      {nextPageToken && (
        <button
          onClick={loadMore}
          className="bg-blue-500 text-white p-2 rounded mt-4 hover:bg-blue-600 transition duration-300"
          disabled={loading}
        >
          {loading ? "Loading..." : "Load More"}
        </button>
      )}
    </div>
  );
}
