
import { useState } from "react";
import { mockPosts } from "@/data/mockData";
import PostCard from "@/components/post/PostCard";
import MainLayout from "@/components/layout/MainLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUpIcon, TrendingDownIcon, FlameIcon } from "lucide-react";

const Trending = () => {
  const [timeFrame, setTimeFrame] = useState<"today" | "week" | "month">("today");
  
  // Sort posts by likes (trending metric)
  const trendingPosts = [...mockPosts].sort((a, b) => b.likes - a.likes);

  return (
    <MainLayout>
      <div className="content-container">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          <div className="md:col-span-2 space-y-8">
            <div className="flex items-center gap-3 mb-8">
              <TrendingUpIcon size={28} className="text-dark-blue" />
              <h1 className="heading-lg font-playfair text-dark-blue">Trending Thoughts</h1>
            </div>

            <div className="bg-white rounded-lg shadow-sm p-4 mb-8">
              <div className="flex gap-4">
                <button
                  onClick={() => setTimeFrame("today")}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    timeFrame === "today" 
                    ? "bg-dark-blue text-white" 
                    : "bg-pale-blue text-dark-blue hover:bg-powder-blue"
                  }`}
                >
                  Today
                </button>
                <button
                  onClick={() => setTimeFrame("week")}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    timeFrame === "week" 
                    ? "bg-dark-blue text-white" 
                    : "bg-pale-blue text-dark-blue hover:bg-powder-blue"
                  }`}
                >
                  This Week
                </button>
                <button
                  onClick={() => setTimeFrame("month")}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    timeFrame === "month" 
                    ? "bg-dark-blue text-white" 
                    : "bg-pale-blue text-dark-blue hover:bg-powder-blue"
                  }`}
                >
                  This Month
                </button>
              </div>
            </div>

            <div className="space-y-6">
              {trendingPosts.map((post) => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>
          </div>
          
          <div className="space-y-8">
            <Card className="border-blue-gray/10 shadow-sm bg-white">
              <CardHeader className="pb-4">
                <CardTitle className="font-playfair text-xl text-dark-blue">Trending Topics</CardTitle>
                <CardDescription className="text-medium-gray">Most discussed topics right now</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[1, 2, 3, 4, 5].map((_, index) => (
                    <div key={index} className="flex items-center justify-between p-3 rounded-md hover:bg-light-gray transition-colors">
                      <div className="flex items-center gap-3">
                        <span className="font-semibold text-dark-blue">{index + 1}</span>
                        <span className="text-dark-gray">{["Philosophy", "Science", "Politics", "Technology", "Art"][index]}</span>
                      </div>
                      <div className={`flex items-center gap-1 ${index < 3 ? "text-green-500" : "text-red-500"}`}>
                        {index < 3 ? (
                          <TrendingUpIcon size={16} />
                        ) : (
                          <TrendingDownIcon size={16} />
                        )}
                        <span className="text-xs">{Math.floor(Math.random() * 200) + 1}%</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            
            <Card className="border-blue-gray/10 shadow-sm bg-white">
              <CardHeader className="pb-4">
                <CardTitle className="font-playfair text-xl text-dark-blue">Hot Discussions</CardTitle>
                <CardDescription className="text-medium-gray">Active conversations</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[1, 2, 3].map((_, index) => (
                    <a 
                      key={index} 
                      href={`/post/${index + 1}`}
                      className="flex items-start gap-3 p-3 rounded-md hover:bg-light-gray transition-colors"
                    >
                      <FlameIcon size={20} className="text-orange-500 mt-0.5" />
                      <div>
                        <p className="font-medium text-dark-blue">
                          {["The future of AI in everyday life", "Climate change solutions", "Mental health awareness"][index]}
                        </p>
                        <p className="text-xs text-medium-gray mt-1">
                          {Math.floor(Math.random() * 50) + 20} comments in the last hour
                        </p>
                      </div>
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

export default Trending;
