import { useState, useEffect, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface AuthPageProps {
  onAuthenticated: () => void;
}

const AuthPage = ({ onAuthenticated }: AuthPageProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  // Memoize star positions to prevent re-generation on re-renders
  const slowStars = useMemo(() => 
    Array.from({ length: 40 }).map((_, i) => ({
      id: `star-slow-${i}`,
      left: Math.random() * 100,
      top: Math.random() * 100,
      delay: Math.random() * 10
    })), []
  );

  const mediumStars = useMemo(() => 
    Array.from({ length: 25 }).map((_, i) => ({
      id: `star-medium-${i}`,
      left: Math.random() * 100,
      top: Math.random() * 100,
      delay: Math.random() * 8
    })), []
  );

  const fastStars = useMemo(() => 
    Array.from({ length: 15 }).map((_, i) => ({
      id: `star-fast-${i}`,
      left: Math.random() * 100,
      top: Math.random() * 100,
      delay: Math.random() * 6
    })), []
  );

  // Check for existing session on component mount
  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (session?.user) {
        onAuthenticated();
      }
    });

    // Check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        onAuthenticated();
      }
    });

    return () => subscription.unsubscribe();
  }, [onAuthenticated]);

  const handleGoogleAuth = async () => {
    try {
      setIsLoading(true);
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/`,
        }
      });

      if (error) {
        toast({
          title: "Authentication Error",
          description: error.message,
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Authentication Error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-main flex items-center justify-center p-4 relative overflow-hidden">
      {/* Moving stars background - space travel effect */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Multiple layers of stars for depth */}
        <div className="absolute inset-0 animate-stars-slow">
          {slowStars.map((star) => (
            <div
              key={star.id}
              className="absolute w-1 h-1 bg-white rounded-full opacity-40"
              style={{
                left: `${star.left}%`,
                top: `${star.top}%`,
                animationDelay: `${star.delay}s`,
              }}
            />
          ))}
        </div>
        
        <div className="absolute inset-0 animate-stars-medium">
          {mediumStars.map((star) => (
            <div
              key={star.id}
              className="absolute w-2 h-2 bg-primary rounded-full opacity-30"
              style={{
                left: `${star.left}%`,
                top: `${star.top}%`,
                animationDelay: `${star.delay}s`,
              }}
            />
          ))}
        </div>
        
        <div className="absolute inset-0 animate-stars-fast">
          {fastStars.map((star) => (
            <div
              key={star.id}
              className="absolute w-1 h-1 bg-accent rounded-full opacity-60"
              style={{
                left: `${star.left}%`,
                top: `${star.top}%`,
                animationDelay: `${star.delay}s`,
              }}
            />
          ))}
        </div>

        {/* Animated background particles */}
        <div className="absolute top-20 left-10 text-purple-300 text-opacity-20 animate-float">✨</div>
        <div className="absolute top-40 right-20 text-purple-400 text-opacity-15 animate-float" style={{ animationDelay: '2s' }}>💜</div>
        <div className="absolute top-60 left-1/3 text-purple-300 text-opacity-20 animate-float" style={{ animationDelay: '4s' }}>✨</div>
        <div className="absolute bottom-40 right-10 text-purple-400 text-opacity-15 animate-float" style={{ animationDelay: '1s' }}>💜</div>
        <div className="absolute bottom-60 left-20 text-purple-300 text-opacity-20 animate-float" style={{ animationDelay: '3s' }}>✨</div>
      </div>

      <Card className="w-full max-w-md bg-purple-500/10 border border-purple-500/50 shadow-glow backdrop-blur-sm relative z-10 hover:shadow-intense transition-all duration-300 animate-scale-in animate-fade-in">
        <CardHeader className="text-center space-y-4 animate-slide-up">
          <div className="mx-auto w-20 h-20 rounded-full bg-purple-500/20 border border-purple-500/50 shadow-glow flex items-center justify-center hover:shadow-intense hover:scale-110 transition-all duration-300 animate-pulse">
            <span className="text-2xl animate-glow">💜</span>
          </div>
          
          <div className="animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <CardTitle className="text-3xl font-bold hover:scale-105 transition-transform duration-300">
              <span>Maya</span>
              <span className="text-white">AI Companion</span>
            </CardTitle>
            <CardDescription className="text-purple-300/80 mt-2 text-lg animate-fade-in" style={{ animationDelay: '0.4s' }}>
              Step into the holographic realm where dreams become reality.
            </CardDescription>
          </div>
        </CardHeader>
        
        <CardContent className="space-y-4 animate-fade-in" style={{ animationDelay: '0.6s' }}>
          <Button
            onClick={handleGoogleAuth}
            disabled={isLoading}
            className="w-full bg-purple-500/10 text-purple-300 border border-purple-500/50 hover:bg-purple-500/20 hover:border-purple-500/70 hover:shadow-glow hover:scale-105 transition-all duration-300 group"
            size="lg"
          >
            {isLoading ? (
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                <span>Entering Maya's World...</span>
              </div>
            ) : (
              <>
                <svg className="w-5 h-5 mr-2 group-hover:rotate-12 transition-transform duration-300" viewBox="0 0 24 24">
                  <path
                    fill="currentColor"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="currentColor"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="currentColor"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="currentColor"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
                <span className="group-hover:text-white transition-colors duration-300">Sign in with Google</span>
              </>
            )}
          </Button>
          
          <p className="text-xs text-purple-300/60 text-center mt-6 animate-fade-in" style={{ animationDelay: '0.8s' }}>
            By entering, you agree to keep our holographic secrets safe.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default AuthPage;
