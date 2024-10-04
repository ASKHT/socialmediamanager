import YouTubeResults from "@/app/youtube-results/_components/Youtuberesult";

export default function YouTubeResultsPage({ searchParams }: any) {
  const query = searchParams.q;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">YouTube Results for: {query}</h1>
      <YouTubeResults query={query} />
    </div>
  );
}
