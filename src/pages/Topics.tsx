
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
      <div className="content-container">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          <div className="md:col-span-2">
            {tag ? (
              <>
                <div className="mb-8">
                  <h1 className="heading-lg mb-3">#{tag}</h1>
                  <p className="text-medium-gray text-lg leading-relaxed">
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
                  <div className="text-center py-12 bg-pale-blue/50 rounded-lg">
                    <h3 className="heading-sm mb-3">No posts found</h3>
                    <p className="text-medium-gray leading-relaxed">
                      Be the first to share a thought on this topic
                    </p>
                  </div>
                )}
              </>
            ) : (
              <div className="mb-8">
                <h1 className="heading-lg mb-5">Topics</h1>
                <p className="text-medium-gray text-lg leading-relaxed mb-8">
                  Explore various topics and join discussions that interest you
                </p>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {filteredTags
                    .sort((a, b) => b.count - a.count)
                    .slice(0, 12)
                    .map((tag) => (
                      <a
                        key={tag.id}
                        href={`/topics/${tag.name}`}
                        className="p-5 rounded-lg bg-white border border-blue-gray/10 hover:border-vivid-blue hover:shadow-md transition-all"
                      >
                        <h3 className="font-playfair font-semibold text-xl mb-2 text-dark-blue">#{tag.name}</h3>
                        <p className="text-medium-gray">{tag.count} posts</p>
                      </a>
                    ))}
                </div>
              </div>
            )}
          </div>
          
          <div className="space-y-8">
            <Card className="border-blue-gray/10 shadow-sm">
              <CardHeader className="pb-4">
                <CardTitle className="font-playfair text-xl text-dark-blue">Find Topics</CardTitle>
                <CardDescription className="text-medium-gray">Browse all available topics</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="relative mb-5">
                  <Search className="absolute left-3.5 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                  <Input 
                    type="search"
                    placeholder="Search topics..."
                    className="pl-11 border-blue-gray/20"
                    value={tagFilter}
                    onChange={(e) => setTagFilter(e.target.value)}
                  />
                </div>
                
                <div className="flex flex-wrap gap-2.5">
                  {filteredTags
                    .sort((a, b) => b.count - a.count)
                    .map((tag) => (
                      <a 
                        key={tag.id}
                        href={`/topics/${tag.name}`}
                        className="px-4 py-2 rounded-full bg-pale-blue text-dark-blue text-sm hover:bg-powder-blue transition-colors"
                      >
                        #{tag.name} <span className="text-xs text-medium-gray ml-1">({tag.count})</span>
                      </a>
                    ))}
                </div>
              </CardContent>
            </Card>
            
            <Card className="border-blue-gray/10 shadow-sm">
              <CardHeader className="pb-4">
                <CardTitle className="font-playfair text-xl text-dark-blue">Popular Topics</CardTitle>
                <CardDescription className="text-medium-gray">Currently trending on Doxa</CardDescription>
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
                        className="flex items-center justify-between p-3 rounded hover:bg-light-gray transition-colors"
                      >
                        <div className="flex items-center">
                          <span className="w-7 text-medium-gray font-medium">{index + 1}</span>
                          <span className="font-medium text-dark-blue">#{tag.name}</span>
                        </div>
                        <span className="text-medium-gray">{tag.count} posts</span>
                      </a>
                    ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Topics;
