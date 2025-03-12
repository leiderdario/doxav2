
import { useState } from "react";
import { mockPosts } from "@/data/mockData";
import PostCard from "@/components/post/PostCard";
import MainLayout from "@/components/layout/MainLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MessageCircleIcon, MessagesSquareIcon, UsersIcon } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Discussions = () => {
  const [activeTab, setActiveTab] = useState("all");
  
  // Sort posts by comments (most discussed)
  const discussedPosts = [...mockPosts].sort((a, b) => b.comments - a.comments);

  return (
    <MainLayout>
      <div className="content-container">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          <div className="md:col-span-2 space-y-8">
            <div className="flex items-center gap-3 mb-8">
              <MessageCircleIcon size={28} className="text-dark-blue" />
              <h1 className="heading-lg font-playfair text-dark-blue">Discussions</h1>
            </div>

            <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
              <form className="space-y-4">
                <h2 className="text-lg font-medium text-dark-blue">Start a New Discussion</h2>
                <Input 
                  placeholder="What's on your mind?"
                  className="bg-light-gray"
                />
                <div className="flex justify-end">
                  <Button className="bg-primary text-white">
                    <MessageCircleIcon className="mr-2 h-4 w-4" />
                    Start Discussion
                  </Button>
                </div>
              </form>
            </div>

            <Tabs defaultValue="all" className="mb-8" onValueChange={setActiveTab}>
              <TabsList className="mb-6">
                <TabsTrigger 
                  value="all" 
                  className="text-base px-6"
                >
                  All Discussions
                </TabsTrigger>
                <TabsTrigger 
                  value="active" 
                  className="text-base px-6"
                >
                  Most Active
                </TabsTrigger>
                <TabsTrigger 
                  value="recent" 
                  className="text-base px-6"
                >
                  Recent
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="all" className="mt-6">
                <div className="space-y-6">
                  {discussedPosts.map((post) => (
                    <PostCard key={post.id} post={post} />
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="active" className="mt-6">
                <div className="space-y-6">
                  {discussedPosts.slice(0, 5).map((post) => (
                    <PostCard key={post.id} post={post} />
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="recent" className="mt-6">
                <div className="space-y-6">
                  {[...mockPosts]
                    .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
                    .slice(0, 5)
                    .map((post) => (
                      <PostCard key={post.id} post={post} />
                    ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>
          
          <div className="space-y-8">
            <Card className="border-blue-gray/10 shadow-sm bg-white">
              <CardHeader className="pb-4">
                <CardTitle className="font-playfair text-xl text-dark-blue">Discussion Guidelines</CardTitle>
                <CardDescription className="text-medium-gray">For meaningful conversations</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="bg-pale-blue rounded-full p-1.5 mt-0.5">
                    <span className="text-dark-blue font-semibold">1</span>
                  </div>
                  <p className="text-dark-gray leading-relaxed">Be respectful and considerate of others' opinions.</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="bg-pale-blue rounded-full p-1.5 mt-0.5">
                    <span className="text-dark-blue font-semibold">2</span>
                  </div>
                  <p className="text-dark-gray leading-relaxed">Stay on topic and contribute meaningfully to the conversation.</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="bg-pale-blue rounded-full p-1.5 mt-0.5">
                    <span className="text-dark-blue font-semibold">3</span>
                  </div>
                  <p className="text-dark-gray leading-relaxed">Provide evidence or sources when making factual claims.</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="bg-pale-blue rounded-full p-1.5 mt-0.5">
                    <span className="text-dark-blue font-semibold">4</span>
                  </div>
                  <p className="text-dark-gray leading-relaxed">No spam, self-promotion, or trolling.</p>
                </div>
              </CardContent>
            </Card>
            
            <Card className="border-blue-gray/10 shadow-sm bg-white">
              <CardHeader className="pb-4">
                <CardTitle className="font-playfair text-xl text-dark-blue">
                  <div className="flex items-center gap-2">
                    <UsersIcon className="h-5 w-5 text-dark-blue" />
                    <span>Active Members</span>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[1, 2, 3, 4, 5].map((_, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-powder-blue flex items-center justify-center">
                        <span className="text-dark-blue font-medium">
                          {["A", "B", "C", "D", "E"][index]}
                        </span>
                      </div>
                      <div>
                        <p className="text-dark-blue font-medium">{["Alex", "Blake", "Casey", "Dakota", "Ellis"][index]}</p>
                        <p className="text-xs text-medium-gray">{Math.floor(Math.random() * 50) + 5} discussions</p>
                      </div>
                    </div>
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

export default Discussions;
