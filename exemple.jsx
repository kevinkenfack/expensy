import React, { useEffect, useState } from 'react';
import { ArrowUpRight, MessageSquare, Mail, Github, Linkedin, Twitter, Instagram, BookOpen, Star } from 'lucide-react';

const Dashboard = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const socialLinks = [
    { name: 'Newsletter', icon: <Mail className="w-5 h-5" />, color: 'from-orange-500/20 to-pink-500/20' },
    { name: 'Discord', icon: <MessageSquare className="w-5 h-5" />, color: 'from-indigo-500/20 to-purple-500/20' },
    { name: 'YouTube', icon: <MessageSquare className="w-5 h-5 text-red-500" />, color: 'from-red-500/20 to-red-600/20' },
    { name: 'GitHub', icon: <Github className="w-5 h-5" />, color: 'from-gray-600/20 to-gray-700/20' },
    { name: 'LinkedIn', icon: <Linkedin className="w-5 h-5" />, color: 'from-blue-500/20 to-blue-600/20' },
    { name: 'Twitter', icon: <Twitter className="w-5 h-5" />, color: 'from-blue-400/20 to-blue-500/20' },
    { name: 'Instagram', icon: <Instagram className="w-5 h-5" />, color: 'from-pink-500/20 to-purple-500/20' },
    { name: 'TikTok', icon: <MessageSquare className="w-5 h-5" />, color: 'from-gray-800/20 to-gray-900/20' },
  ];

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-600/5 via-purple-600/5 to-transparent pointer-events-none" />
        
        {/* Navigation */}
        <div className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-gray-950/80 backdrop-blur-lg border-b border-white/5' : ''}`}>
          <div className="max-w-4xl mx-auto px-4 sm:px-6">
            <div className="flex items-center justify-between py-4">
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-3">
                  <div className="relative group">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-blue-500 to-purple-500 p-[1px] transition-transform duration-300 group-hover:scale-105">
                      <div className="w-full h-full rounded-2xl bg-gray-950/90 flex items-center justify-center">
                        <img src="/40.png" alt="Logo" className="w-10 h-10 rounded-xl" />
                      </div>
                    </div>
                    <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-gray-950 animate-pulse" />
                  </div>
                  <div className="block">
                    <h1 className="text-xl font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
                      TS Mastery
                    </h1>
                    <p className="text-sm text-gray-400">Learn. Build. Master.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="relative pt-24 px-4 sm:px-6 pb-12 max-w-4xl mx-auto">
          {/* Featured Achievement Card */}
          <div className="mb-8 group">
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-purple-900/50 via-blue-900/50 to-purple-900/50 p-[1px] transition-all duration-300 hover:from-purple-600/50 hover:via-blue-600/50 hover:to-purple-600/50">
              <div className="relative bg-gray-950/95 rounded-3xl p-6 backdrop-blur-xl overflow-hidden">
                <div className="absolute inset-0 opacity-30">
                  <div className="absolute top-0 -left-4 w-24 h-24 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl animate-blob" />
                  <div className="absolute top-0 -right-4 w-24 h-24 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-2000" />
                  <div className="absolute -bottom-8 left-20 w-24 h-24 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-4000" />
                </div>

                <div className="relative">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="bg-gradient-to-r from-red-500/20 to-red-500/10 text-red-500 px-4 py-1 rounded-full text-sm backdrop-blur-sm border border-red-500/10">
                      New Achievement
                    </div>
                    <div className="h-2 w-2 rounded-full bg-red-500 animate-pulse" />
                  </div>

                  <div className="relative group">
                    <img 
                      src="/400.png" 
                      alt="1M Subscribers" 
                      className="w-full rounded-2xl mb-4 object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-gray-950/50 to-transparent rounded-2xl opacity-60" />
                  </div>

                  <div className="relative z-10">
                    <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-white via-purple-200 to-blue-200 bg-clip-text text-transparent">
                      1 Million Subscribers! 🎉
                    </h2>
                    <button className="bg-white/90 hover:bg-white text-gray-950 px-6 py-3 rounded-xl font-medium transition-all duration-300 hover:scale-105 transform hover:shadow-lg hover:shadow-purple-500/20">
                      Watch the celebration
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Course Promo Card */}
          <div className="mb-12 group">
            <div className="bg-gradient-to-br from-blue-500/5 to-purple-500/5 rounded-3xl p-6 backdrop-blur-sm border border-white/5 transition-all duration-300 hover:border-white/10">
              <div className="flex flex-col sm:flex-row items-start gap-6">
                <div className="relative flex-shrink-0">
                  <div className="w-20 h-20 rounded-2xl overflow-hidden transition-transform duration-300 group-hover:scale-105">
                    <img src="/80.png" alt="Course" className="w-full h-full object-cover" />
                  </div>
                  <div className="absolute -bottom-2 -right-2 bg-gradient-to-r from-green-500 to-emerald-500 text-xs px-2 py-1 rounded-full">
                    New
                  </div>
                </div>
                <div className="flex-1 w-full">
                  <h3 className="text-2xl font-bold mb-2 bg-gradient-to-r from-white via-blue-100 to-purple-100 bg-clip-text text-transparent">
                    Become a top 1% Next.js 15 Developer
                  </h3>
                  <p className="text-gray-400 mb-4">
                    Master modern web development in one comprehensive course
                  </p>
                  <button className="relative inline-flex items-center justify-center px-6 py-3 overflow-hidden font-medium transition-all bg-blue-500 rounded-xl hover:bg-blue-600 group">
                    <span className="w-48 h-48 rounded rotate-[-40deg] bg-white/10 absolute bottom-0 left-0 -translate-x-full ease-out duration-500 transition-all translate-y-full mb-9 ml-9 group-hover:ml-0 group-hover:mb-32 group-hover:translate-x-0"></span>
                    <span className="relative w-full text-left flex items-center justify-between">
                      View Course
                      <ArrowUpRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Social Links Section */}
      <div className="px-4 sm:px-6 max-w-4xl mx-auto space-y-6">
        <div className="space-y-4">
          <h4 className="text-sm font-medium text-gray-400 tracking-wider">SOCIAL MEDIA HANDLES</h4>
          <div className="grid gap-3 sm:grid-cols-2">
            {socialLinks.map((link) => (
              <a
                key={link.name}
                href="#"
                className="group relative overflow-hidden rounded-2xl bg-white/5 backdrop-blur-sm border border-white/5 p-4 transition-all duration-300 hover:bg-white/10 hover:border-white/10 hover:-translate-y-0.5"
              >
                <div className={`absolute inset-0 bg-gradient-to-r ${link.color} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
                <div className="relative flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {link.icon}
                    <span className="font-medium">{link.name}</span>
                  </div>
                  <ArrowUpRight className="w-5 h-5 text-gray-400 transition-all duration-300 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </div>
              </a>
            ))}
          </div>
        </div>

        {/* Resources Section */}
        <div className="space-y-4 pb-8">
          <h4 className="text-sm font-medium text-gray-400 tracking-wider">FREEBIES AND MORE</h4>
          <div className="grid gap-3 sm:grid-cols-2">
            <a href="#" className="group relative overflow-hidden rounded-2xl bg-white/5 backdrop-blur-sm border border-white/5 p-4 transition-all duration-300 hover:bg-white/10 hover:border-white/10 hover:-translate-y-0.5">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="relative flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <BookOpen className="w-5 h-5 text-blue-400" />
                  <span className="font-medium">Free Roadmaps</span>
                </div>
                <ArrowUpRight className="w-5 h-5 text-gray-400 transition-all duration-300 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </div>
            </a>
            <a href="#" className="group relative overflow-hidden rounded-2xl bg-white/5 backdrop-blur-sm border border-white/5 p-4 transition-all duration-300 hover:bg-white/10 hover:border-white/10 hover:-translate-y-0.5">
              <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/10 to-orange-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="relative flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Star className="w-5 h-5 text-yellow-400" />
                  <span className="font-medium">Rate us on Trustpilot</span>
                </div>
                <ArrowUpRight className="w-5 h-5 text-gray-400 transition-all duration-300 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </div>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

const style = document.createElement('style');
style.textContent = `
  @keyframes blob {
    0% { transform: translate(0px, 0px) scale(1); }
    33% { transform: translate(30px, -50px) scale(1.1); }
    66% { transform: translate(-20px, 20px) scale(0.9); }
    100% { transform: translate(0px, 0px) scale(1); }
  }
  .animate-blob {
    animation: blob 7s infinite;
  }
  .animation-delay-2000 {
    animation-delay: 2s;
  }
  .animation-delay-4000 {
    animation-delay: 4s;
  }
`;
document.head.appendChild(style);

export default Dashboard;