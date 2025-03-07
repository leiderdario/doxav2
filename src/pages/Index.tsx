
import { useState } from "react";
import { mockPosts, mockTags } from "@/data/mockData";
import PostCard from "@/components/post/PostCard";
import MainLayout from "@/components/layout/MainLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const Index = () => {
  const [activeTab, setActiveTab] = useState("latest");
  
  const filteredPosts = [...mockPosts].sort((a, b) => {
    if (activeTab === "latest") {
      return b.createdAt.getTime() - a.createdAt.getTime();
    } else {
      return b.likes - a.likes;
    }
  });

  return (
    <MainLayout>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <Tabs defaultValue="latest" className="mb-6">
            <TabsList>
              <TabsTrigger 
                value="latest" 
                onClick={() => setActiveTab("latest")}
              >
                Latest
              </TabsTrigger>
              <TabsTrigger 
                value="popular" 
                onClick={() => setActiveTab("popular")}
              >
                Popular
              </TabsTrigger>
            </TabsList>
            <TabsContent value="latest" className="mt-4">
              <h1 className="text-2xl font-bold mb-4">Latest Thoughts</h1>
              {filteredPosts.map((post) => (
                <PostCard key={post.id} post={post} />
              ))}
            </TabsContent>
            <TabsContent value="popular" className="mt-4">
              <h1 className="text-2xl font-bold mb-4">Popular Thoughts</h1>
              {filteredPosts.map((post) => (
                <PostCard key={post.id} post={post} />
              ))}
            </TabsContent>
          </Tabs>
        </div>
        
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Popular Topics</CardTitle>
              <CardDescription>Explore trending conversations</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {mockTags
                  .sort((a, b) => b.count - a.count)
                  .slice(0, 10)
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
              <CardTitle>Get Started</CardTitle>
              <CardDescription>New to ThoughtChatter?</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-dark-gray">
                Join our community to share your thoughts and engage in meaningful discussions.
              </p>
              <div className="flex flex-col space-y-2">
                <a 
                  href="/register" 
                  className="w-full py-2 px-4 bg-primary text-white rounded-md text-center hover:bg-primary/90 transition-colors"
                >
                  Sign Up
                </a>
                <a 
                  href="/login" 
                  className="w-full py-2 px-4 bg-secondary text-secondary-foreground rounded-md text-center hover:bg-secondary/80 transition-colors"
                >
                  Log In
                </a>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
};

export default Index;
