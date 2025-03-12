
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Register from "./pages/Register";
import PostDetail from "./pages/PostDetail";
import Search from "./pages/Search";
import Topics from "./pages/Topics";
import CreatePost from "./pages/CreatePost";
import NotFound from "./pages/NotFound";
import Trending from "./pages/Trending";
import Discussions from "./pages/Discussions";
import { ThemeProvider } from "./context/ThemeContext";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/post/:id" element={<PostDetail />} />
            <Route path="/search" element={<Search />} />
            <Route path="/topics" element={<Topics />} />
            <Route path="/topics/:tag" element={<Topics />} />
            <Route path="/create" element={<CreatePost />} />
            <Route path="/trending" element={<Trending />} />
            <Route path="/discussions" element={<Discussions />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
