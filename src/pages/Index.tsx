
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
      <div className="content-container">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          <div className="md:col-span-2 space-y-8">
            <Tabs defaultValue="latest" className="mb-8">
              <TabsList className="mb-6">
                <TabsTrigger 
                  value="latest" 
                  onClick={() => setActiveTab("latest")}
                  className="text-base px-6"
                >
                  Latest
                </TabsTrigger>
                <TabsTrigger 
                  value="popular" 
                  onClick={() => setActiveTab("popular")}
                  className="text-base px-6"
                >
                  Popular
                </TabsTrigger>
              </TabsList>
              <TabsContent value="latest" className="mt-6">
                <h1 className="heading-lg mb-8">Latest Thoughts</h1>
                <div className="space-y-6">
                  {filteredPosts.map((post) => (
                    <PostCard key={post.id} post={post} />
                  ))}
                </div>
              </TabsContent>
              <TabsContent value="popular" className="mt-6">
                <h1 className="heading-lg mb-8">Popular Thoughts</h1>
                <div className="space-y-6">
                  {filteredPosts.map((post) => (
                    <PostCard key={post.id} post={post} />
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>
          
          <div className="space-y-8">
            <Card className="border-blue-gray/10 shadow-sm">
              <CardHeader className="pb-4">
                <CardTitle className="font-playfair text-xl text-dark-blue">Popular Topics</CardTitle>
                <CardDescription className="text-medium-gray">Explore trending conversations</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2.5">
                  {mockTags
                    .sort((a, b) => b.count - a.count)
                    .slice(0, 10)
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
                <CardTitle className="font-playfair text-xl text-dark-blue">Get Started</CardTitle>
                <CardDescription className="text-medium-gray">New to Doxa?</CardDescription>
              </CardHeader>
              <CardContent className="space-y-5">
                <p className="text-dark-gray leading-relaxed">
                  Join our community to share your thoughts and engage in meaningful discussions.
                </p>
                <div className="flex flex-col space-y-3">
                  <a 
                    href="/register" 
                    className="w-full py-2.5 px-5 bg-primary text-white rounded-md text-center hover:bg-primary/90 transition-colors font-medium"
                  >
                    Sign Up
                  </a>
                  <a 
                    href="/login" 
                    className="w-full py-2.5 px-5 bg-secondary text-secondary-foreground rounded-md text-center hover:bg-secondary/80 transition-colors font-medium"
                  >
                    Log In
                  </a>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Index;
