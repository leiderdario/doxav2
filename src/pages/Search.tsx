
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { searchPosts } from "@/data/mockData";
import { Post } from "@/types/model";
import MainLayout from "@/components/layout/MainLayout";
import PostCard from "@/components/post/PostCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search as SearchIcon, Filter } from "lucide-react";

const Search = () => {
  const location = useLocation();
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Post[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const q = searchParams.get("q") || "";
    setQuery(q);
    
    if (q) {
      setIsSearching(true);
      // Simulate API call delay
      setTimeout(() => {
        const searchResults = searchPosts(q);
        setResults(searchResults);
        setIsSearching(false);
      }, 500);
    }
  }, [location.search]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      window.history.pushState(
        {},
        "",
        `${window.location.pathname}?q=${encodeURIComponent(query)}`
      );
      
      setIsSearching(true);
      // Simulate API call delay
      setTimeout(() => {
        const searchResults = searchPosts(query);
        setResults(searchResults);
        setIsSearching(false);
      }, 500);
    }
  };

  return (
    <MainLayout>
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-4">Search</h1>
          <form onSubmit={handleSearch} className="flex gap-2">
            <div className="relative flex-1">
              <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-medium-gray" size={18} />
              <Input
                type="search"
                placeholder="Search for thoughts, topics, or people..."
                className="pl-10"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
            </div>
            <Button type="submit">Search</Button>
            <Button variant="outline" type="button">
              <Filter className="h-4 w-4 mr-2" />
              Filters
            </Button>
          </form>
        </div>

        {query && (
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-2">
              {isSearching
                ? "Searching..."
                : `Found ${results.length} results for "${query}"`}
            </h2>
          </div>
        )}

        {isSearching ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-pulse text-medium-gray">Searching...</div>
          </div>
        ) : (
          <>
            {results.length > 0 ? (
              <div className="space-y-6">
                {results.map((post) => (
                  <PostCard key={post.id} post={post} />
                ))}
              </div>
            ) : (
              query && (
                <div className="text-center py-10">
                  <h3 className="text-xl font-semibold mb-2">No results found</h3>
                  <p className="text-medium-gray">
                    Try different keywords or check your spelling
                  </p>
                </div>
              )
            )}
          </>
        )}

        {!query && (
          <div className="text-center py-10">
            <h3 className="text-xl font-semibold mb-2">Search for something</h3>
            <p className="text-medium-gray">
              Enter keywords above to find thoughts, topics, or people
            </p>
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default Search;
