import { useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => {

  // 🛠️ Remove Lovable badge after render
useEffect(() => {
  const removeBadge = () => {
    // Remove by title
    document.querySelectorAll('[title="Edit with Lovable"]').forEach(el => el.remove());

    // Remove by known Lovable classes
    document.querySelectorAll('.lovable-badge, .lovable-edit').forEach(el => el.remove());

    // Remove any link or iframe that points to Lovable
    document.querySelectorAll('a, iframe').forEach(el => {
      if (el instanceof HTMLAnchorElement && el.href.includes("lovable.dev")) {
        el.remove();
      }
      if (el instanceof HTMLIFrameElement && el.src.includes("lovable.dev")) {
        el.remove();
      }
    });
  };

  // Run once immediately
  removeBadge();

  // Keep running every 500ms in case it reinjects
  const interval = setInterval(removeBadge, 500);

  return () => clearInterval(interval);
}, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
