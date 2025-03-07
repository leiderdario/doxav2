
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { getPostsByTag, mockTags } from "@/data/mockData";
import { Post } from "@/types/model";
import MainLayout from "@/components/layout/MainLayout";
import PostCard from "@/components/post/PostCard";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

const Topics = () => {
  const { tag } = useParams<{ tag?: string }>();
  const [posts, setPosts] = useState<Post[]>([]);
  const [tagFilter, setTagFilter] = useState("");
  
  const filteredTags = tagFilter
    ? mockTags.filter(t => t.name.toLowerCase().includes(tagFilter.toLowerCase()))
    : mockTags;
  
  useEffect(() => {
    if (tag) {
      const filteredPosts = getPostsByTag(tag);
      setPosts(filteredPosts);
    }
  }, [tag]);

  return (
    <MainLayout>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          {tag ? (
            <>
              <div className="mb-6">
                <h1 className="text-3xl font-bold mb-2">#{tag}</h1>
                <p className="text-medium-gray">
                  Explore thoughts related to {tag}
                </p>
              </div>
              
              {posts.length > 0 ? (
                <div className="space-y-6">
                  {posts.map((post) => (
                    <PostCard key={post.id} post={post} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-10">
                  <h3 className="text-xl font-semibold mb-2">No posts found</h3>
                  <p className="text-medium-gray">
                    Be the first to share a thought on this topic
                  </p>
                </div>
              )}
            </>
          ) : (
            <div className="mb-6">
              <h1 className="text-3xl font-bold mb-4">Topics</h1>
              <p className="text-medium-gray mb-6">
                Explore various topics and join discussions that interest you
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {filteredTags
                  .sort((a, b) => b.count - a.count)
                  .slice(0, 12)
                  .map((tag) => (
                    <a
                      key={tag.id}
                      href={`/topics/${tag.name}`}
                      className="p-4 rounded-lg bg-white border border-border hover:border-vivid-blue hover:shadow-sm transition-all"
                    >
                      <h3 className="font-semibold text-lg mb-1">#{tag.name}</h3>
                      <p className="text-sm text-medium-gray">{tag.count} posts</p>
                    </a>
                  ))}
              </div>
            </div>
          )}
        </div>
        
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Find Topics</CardTitle>
              <CardDescription>Browse all available topics</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="relative mb-4">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                <Input 
                  type="search"
                  placeholder="Search topics..."
                  className="pl-10"
                  value={tagFilter}
                  onChange={(e) => setTagFilter(e.target.value)}
                />
              </div>
              
              <div className="flex flex-wrap gap-2">
                {filteredTags
                  .sort((a, b) => b.count - a.count)
                  .map((tag) => (
                    <a 
                      key={tag.id}
                      href={`/topics/${tag.name}`}
                      className="px-3 py-1.5 rounded-full bg-pale-blue text-dark-blue text-sm hover:bg-powder-blue transition-colors"
                    >
                      #{tag.name} <span className="text-xs text-medium-gray">({tag.count})</span>
                    </a>
                  ))}
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Popular Topics</CardTitle>
              <CardDescription>Currently trending on ThoughtChatter</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {mockTags
                  .sort((a, b) => b.count - a.count)
                  .slice(0, 5)
                  .map((tag, index) => (
                    <a 
                      key={tag.id}
                      href={`/topics/${tag.name}`}
                      className="flex items-center justify-between p-2 rounded hover:bg-light-gray transition-colors"
                    >
                      <div className="flex items-center">
                        <span className="w-6 text-medium-gray">{index + 1}</span>
                        <span className="font-medium">#{tag.name}</span>
                      </div>
                      <span className="text-sm text-medium-gray">{tag.count} posts</span>
                    </a>
                  ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
};

export default Topics;
