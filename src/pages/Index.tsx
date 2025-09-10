import { useState } from "react";
import AuthPage from "@/components/AuthPage";
import ChatInterface from "@/components/ChatInterface";

const Index = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  if (!isAuthenticated) {
    return <AuthPage onAuthenticated={() => setIsAuthenticated(true)} />;
  }

  return <ChatInterface onLogout={() => setIsAuthenticated(false)} />;
};

export default Index;
