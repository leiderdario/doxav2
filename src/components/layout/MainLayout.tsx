
import { useState } from "react";
import { SidebarProvider, Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, 
  SidebarGroupLabel, SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarTrigger } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, HomeIcon, BookmarkIcon, MessageCircleIcon, TagIcon, TrendingUpIcon, 
  UserCircleIcon, LogInIcon, LogOutIcon, PlusCircleIcon } from "lucide-react";
import { useNavigate, Link } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import ThoughtChatLogo from "../common/ThoughtChatLogo";

interface MainLayoutProps {
  children: React.ReactNode;
}

export const MainLayout = ({ children }: MainLayoutProps) => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <Sidebar className="border-r border-border">
          <div className="p-4 flex justify-center items-center">
            <ThoughtChatLogo className="h-8 w-8 mr-2" />
            <span className="font-bold text-xl text-dark-blue">ThoughtChatter</span>
          </div>
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel>Menu</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <Link to="/" className="flex items-center">
                        <HomeIcon className="mr-2 h-5 w-5 text-vivid-blue" />
                        <span>Home</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <Link to="/trending" className="flex items-center">
                        <TrendingUpIcon className="mr-2 h-5 w-5 text-vivid-blue" />
                        <span>Trending</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <Link to="/topics" className="flex items-center">
                        <TagIcon className="mr-2 h-5 w-5 text-vivid-blue" />
                        <span>Topics</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <Link to="/discussions" className="flex items-center">
                        <MessageCircleIcon className="mr-2 h-5 w-5 text-vivid-blue" />
                        <span>Discussions</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
            
            {isLoggedIn && (
              <SidebarGroup>
                <SidebarGroupLabel>Personal</SidebarGroupLabel>
                <SidebarGroupContent>
                  <SidebarMenu>
                    <SidebarMenuItem>
                      <SidebarMenuButton asChild>
                        <Link to="/profile" className="flex items-center">
                          <UserCircleIcon className="mr-2 h-5 w-5 text-vivid-blue" />
                          <span>Profile</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                    
                    <SidebarMenuItem>
                      <SidebarMenuButton asChild>
                        <Link to="/bookmarks" className="flex items-center">
                          <BookmarkIcon className="mr-2 h-5 w-5 text-vivid-blue" />
                          <span>Bookmarks</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  </SidebarMenu>
                </SidebarGroupContent>
              </SidebarGroup>
            )}
            
            <div className="p-4">
              {isLoggedIn ? (
                <Button 
                  className="w-full bg-primary text-white hover:bg-primary/90 flex items-center gap-2"
                  onClick={() => navigate("/create")}
                >
                  <PlusCircleIcon className="h-5 w-5" />
                  New Thought
                </Button>
              ) : (
                <Button 
                  className="w-full bg-primary text-white hover:bg-primary/90 flex items-center gap-2"
                  onClick={() => navigate("/login")}
                >
                  <LogInIcon className="h-5 w-5" />
                  Log In
                </Button>
              )}
            </div>
          </SidebarContent>
        </Sidebar>
        
        <div className="flex-1 flex flex-col min-h-screen overflow-hidden">
          <header className="border-b border-border py-4 px-6 bg-white">
            <div className="flex items-center justify-between">
              <div className="flex items-center md:hidden">
                <SidebarTrigger />
              </div>
              
              <form onSubmit={handleSearch} className="w-full max-w-md mx-auto relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                <Input 
                  type="search"
                  placeholder="Search thoughts..."
                  className="pl-10 bg-light-gray"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </form>
              
              <div className="flex items-center gap-4">
                {isLoggedIn ? (
                  <div className="flex items-center gap-2">
                    <Avatar className="h-9 w-9">
                      <AvatarImage src="/placeholder.svg" alt="User" />
                      <AvatarFallback className="bg-dark-blue text-white">TC</AvatarFallback>
                    </Avatar>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => setIsLoggedIn(false)}
                      className="text-dark-gray"
                    >
                      <LogOutIcon className="h-4 w-4 mr-1" />
                      Logout
                    </Button>
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => navigate("/register")}
                      className="text-dark-gray"
                    >
                      Register
                    </Button>
                    <Button 
                      className="bg-primary text-white"
                      size="sm"
                      onClick={() => setIsLoggedIn(true)}
                    >
                      <LogInIcon className="h-4 w-4 mr-1" />
                      Login
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </header>
          
          <main className="flex-1 overflow-auto p-6">
            {children}
          </main>
          
          <footer className="border-t border-border p-4 text-center text-medium-gray text-sm">
            © 2023 ThoughtChatter. Share your thoughts with the world.
          </footer>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default MainLayout;
