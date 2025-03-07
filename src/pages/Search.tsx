
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
      <div className="content-container">
        <div className="max-w-4xl mx-auto">
          <div className="mb-10">
            <h1 className="heading-lg mb-6">Search</h1>
            <form onSubmit={handleSearch} className="flex gap-3">
              <div className="relative flex-1">
                <SearchIcon className="absolute left-3.5 top-1/2 transform -translate-y-1/2 text-medium-gray" size={18} />
                <Input
                  type="search"
                  placeholder="Search for thoughts, topics, or people..."
                  className="pl-11 py-2.5 text-base border-blue-gray/20"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                />
              </div>
              <Button type="submit" className="px-5 py-2.5">Search</Button>
              <Button variant="outline" type="button" className="px-5">
                <Filter className="h-4 w-4 mr-2" />
                Filters
              </Button>
            </form>
          </div>

          {query && (
            <div className="mb-8">
              <h2 className="heading-md mb-4">
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
                  <div className="text-center py-12 bg-pale-blue/50 rounded-lg">
                    <h3 className="heading-sm mb-3">No results found</h3>
                    <p className="text-medium-gray leading-relaxed">
                      Try different keywords or check your spelling
                    </p>
                  </div>
                )
              )}
            </>
          )}

          {!query && (
            <div className="text-center py-16 bg-pale-blue/50 rounded-lg">
              <h3 className="heading-sm mb-3">Search for something</h3>
              <p className="text-medium-gray leading-relaxed max-w-md mx-auto">
                Enter keywords above to find thoughts, topics, or people
              </p>
            </div>
          )}
        </div>
      </div>
    </MainLayout>
  );
};

export default Search;
