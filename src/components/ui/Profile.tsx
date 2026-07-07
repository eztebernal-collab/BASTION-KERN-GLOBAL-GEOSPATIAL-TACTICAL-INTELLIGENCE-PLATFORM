import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Octokit } from 'octokit';
import { useGlobalStore } from '../../store/useGlobalStore';
import { Github, LogOut, User, Activity } from 'lucide-react';

export default function Profile() {
  const { githubToken, setGithubToken, githubUser, setGithubUser, setGlobalError } = useGlobalStore();

  useEffect(() => {
    // Listen for the OAuth success or error message
    const handleMessage = (event: MessageEvent) => {
      const origin = event.origin;
      if (!origin.endsWith('.run.app') && !origin.includes('localhost')) {
        return;
      }
      if (event.data?.type === 'OAUTH_AUTH_SUCCESS') {
        const token = event.data.token;
        setGithubToken(token);
      } else if (event.data?.type === 'OAUTH_AUTH_ERROR') {
        setGlobalError(event.data.error || 'Authentication failed');
      }
    };
    
    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, [setGithubToken, setGlobalError]);

  useEffect(() => {
    async function fetchUser() {
      if (githubToken) {
        try {
          const octokit = new Octokit({ auth: githubToken });
          const { data } = await octokit.rest.users.getAuthenticated();
          setGithubUser(data);
        } catch (error) {
          console.error("Failed to fetch user data", error);
          if ((error as any).status === 401) {
            setGithubToken(null);
            setGithubUser(null);
          }
        }
      }
    }
    fetchUser();
  }, [githubToken, setGithubUser, setGithubToken]);

  const handleLogin = async () => {
    try {
      const response = await fetch('/api/auth/github/url');
      if (!response.ok) throw new Error('Failed to fetch auth URL');
      const { url } = await response.json();
      
      const authWindow = window.open(
        url,
        'oauth_popup',
        'width=600,height=700'
      );

      if (!authWindow) {
        setGlobalError('Please allow popups to sign in with GitHub.');
      }
    } catch (error) {
      console.error(error);
      setGlobalError('Error initiating login sequence.');
    }
  };

  const handleLogout = () => {
    setGithubToken(null);
    setGithubUser(null);
  };

  return (
    <AnimatePresence>
      <motion.div 
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 50 }}
        className="fixed inset-0 z-30 pt-12 px-4 pb-28 pointer-events-auto bg-[#0B0D12]/95 backdrop-blur-xl overflow-y-auto"
      >
        <div className="max-w-md mx-auto space-y-6">
          <div className="text-center space-y-2 mb-8">
            <h2 className="text-2xl font-bold tracking-tight text-white uppercase font-mono">Operator Profile</h2>
            <p className="text-sm text-white/50 font-mono tracking-widest">IDENTITY VERIFICATION</p>
          </div>

          {!githubToken ? (
            <motion.div 
              className="bg-[#151923] border border-white/10 rounded-[28px] p-8 text-center space-y-6"
            >
              <div className="w-16 h-16 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mx-auto">
                <Github className="w-8 h-8 text-white/70" />
              </div>
              <div className="space-y-2">
                <h3 className="text-lg font-medium text-white">Connect Database</h3>
                <p className="text-sm text-white/50">Authenticate via GitHub to access remote repositories and sync tactical configurations.</p>
              </div>
              
              <button 
                onClick={handleLogin}
                className="w-full flex items-center justify-center gap-2 py-4 px-6 bg-white text-black rounded-2xl font-medium tracking-wide active:scale-[0.98] transition-transform"
              >
                <Github className="w-5 h-5" />
                Authenticate with GitHub
              </button>
            </motion.div>
          ) : (
            <motion.div 
              className="space-y-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <div className="bg-[#151923] border border-green-500/20 rounded-[28px] p-6 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-green-500/10 blur-3xl rounded-full translate-x-1/2 -translate-y-1/2" />
                
                <div className="flex items-center gap-5 relative z-10">
                  {githubUser?.avatar_url ? (
                    <img 
                      src={githubUser.avatar_url} 
                      alt="Avatar" 
                      className="w-16 h-16 rounded-full border-2 border-green-500/30"
                    />
                  ) : (
                    <div className="w-16 h-16 rounded-full bg-green-500/10 border-2 border-green-500/30 flex items-center justify-center">
                      <User className="w-8 h-8 text-green-500" />
                    </div>
                  )}
                  
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                      <span className="text-xs font-mono text-green-500 uppercase tracking-wider">Verified</span>
                    </div>
                    <h3 className="text-xl font-bold text-white">{githubUser?.name || githubUser?.login || 'Operator'}</h3>
                    <p className="text-sm text-white/50 font-mono">@{githubUser?.login || 'unknown'}</p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-[#151923] border border-white/5 rounded-[24px] p-5">
                  <Activity className="w-5 h-5 text-blue-400 mb-3" />
                  <div className="text-2xl font-bold text-white">{githubUser?.public_repos || 0}</div>
                  <div className="text-xs text-white/50 font-mono mt-1">REPOSITORIES</div>
                </div>
                <div className="bg-[#151923] border border-white/5 rounded-[24px] p-5">
                  <User className="w-5 h-5 text-purple-400 mb-3" />
                  <div className="text-2xl font-bold text-white">{githubUser?.followers || 0}</div>
                  <div className="text-xs text-white/50 font-mono mt-1">FOLLOWERS</div>
                </div>
              </div>

              <button 
                onClick={handleLogout}
                className="w-full mt-4 flex items-center justify-center gap-2 py-4 px-6 bg-red-500/10 text-red-500 border border-red-500/20 rounded-2xl font-medium tracking-wide active:scale-[0.98] transition-transform"
              >
                <LogOut className="w-5 h-5" />
                Disconnect Terminal
              </button>
            </motion.div>
          )}
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
