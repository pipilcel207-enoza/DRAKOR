import React, { useState } from 'react';
import { Home, Search, Settings, Sparkles, Play, Crown, Star, Gem, Zap } from 'lucide-react';
import { MOCK_DRAMAS, LATEST_DRAMAS } from './constants';
import { Drama, View } from './types';
import AIChat from './components/AIChat';

// Components for Luxury Badge
const NewIcon = ({ size, color, strokeWidth }: { size: number, color: string, strokeWidth: number }) => (
    <div className="relative">
       <Sparkles size={size} color={color} strokeWidth={strokeWidth} />
       <span className="absolute -top-1 -right-1.5 flex h-2.5 w-2.5 items-center justify-center rounded-full bg-luxury-gold text-[7px] font-bold text-black shadow-[0_0_8px_rgba(212,175,55,0.8)]">N</span>
    </div>
);

const App: React.FC = () => {
  const [showSplash, setShowSplash] = useState(true);
  const [currentView, setCurrentView] = useState<View>(View.HOME);

  // Splash Screen Handler
  const handleEnterApp = () => {
    // 1. Buka Link Iklan
    window.open('https://www.effectivegatecpm.com/if8cjsg1zs?key=61e714ae666f57085623128bcfb4f478', '_blank');
    // 2. Masuk ke Aplikasi
    setShowSplash(false);
  };

  // Direct Link Mode
  const handlePosterClick = (drama: Drama) => {
    const url = `https://www.youtube.com/watch?v=${drama.id}&list=${drama.playlistId}`;
    window.open(url, '_blank');
  };

  const renderDramaGrid = (dramas: Drama[], emptyMessage: string) => (
    <div className="pb-28 pt-24 px-2 animate-fade-in max-w-[1600px] mx-auto">
      {/* Hero Banner (Luxury Style) */}
      <div className="mb-8 relative w-full aspect-[21/9] sm:aspect-[3/1] rounded-xl overflow-hidden shadow-[0_10px_40px_-10px_rgba(212,175,55,0.2)] border border-luxury-gold/20 group cursor-pointer">
         <img 
            src="https://images.unsplash.com/photo-1516962215378-7fa2e137ae91?q=80&w=1200&auto=format&fit=crop" 
            className="w-full h-full object-cover opacity-70 group-hover:scale-105 transition-transform duration-[1.5s] ease-in-out"
            alt="Hero Banner"
         />
         <div className="absolute inset-0 bg-gradient-to-r from-black via-black/40 to-transparent"></div>
         <div className="absolute bottom-4 left-4 sm:bottom-6 sm:left-6 max-w-md">
             <div className="flex items-center gap-2 mb-2">
                 <span className="bg-luxury-gold text-black text-[8px] sm:text-[9px] font-bold px-2 py-0.5 rounded-sm uppercase tracking-widest">Exclusive</span>
                 <div className="flex text-luxury-gold">
                     <Star size={8} fill="currentColor" />
                     <Star size={8} fill="currentColor" />
                     <Star size={8} fill="currentColor" />
                     <Star size={8} fill="currentColor" />
                     <Star size={8} fill="currentColor" />
                 </div>
             </div>
             <h2 className="text-white font-serif text-xl sm:text-4xl italic font-bold mb-1 sm:mb-2 leading-tight">The Golden Empire</h2>
             <p className="text-gray-300 text-[10px] sm:text-sm font-light line-clamp-2 mb-2 sm:mb-4 font-sans opacity-90 hidden sm:block">
                 Kisah cinta dan kekuasaan di tengah kemewahan dinasti modern.
             </p>
         </div>
      </div>

      {/* Section Title */}
      <div className="flex items-end gap-2 mb-4 border-b border-luxury-gold/20 pb-2 px-1">
          <h2 className="text-luxury-goldLight font-serif text-lg sm:text-2xl font-semibold tracking-wide">
              {currentView === View.LATEST ? 'Koleksi' : 'Koleksi'} <span className="italic text-white">{currentView === View.LATEST ? 'Terbaru' : 'Utama'}</span>
          </h2>
          <span className="text-luxury-gray text-[10px] sm:text-xs pb-1 uppercase tracking-[0.2em]">Premium</span>
      </div>

      {/* Grid Layout - 5 COLUMNS ON MOBILE as requested */}
      {dramas.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-[30vh] text-luxury-gray gap-4 opacity-50">
            <Gem size={48} strokeWidth={1} className="text-luxury-gold" />
            <p className="text-sm font-serif tracking-widest">{emptyMessage}</p>
        </div>
      ) : (
        /* Force 5 columns on all screens, adjusting gap and text size for mobile */
        <div className="grid grid-cols-5 gap-2 sm:gap-4 lg:gap-6">
            {dramas.map((drama, index) => (
            <div 
                key={`${drama.id}-${index}`} 
                className="flex flex-col gap-1.5 cursor-pointer group"
                onClick={() => handlePosterClick(drama)}
            >
                {/* Poster Card */}
                <div className="relative aspect-[2/3] rounded-md sm:rounded-lg overflow-hidden bg-luxury-surface shadow-md transition-all duration-500 ease-out group-hover:-translate-y-1 group-hover:shadow-[0_5px_20px_-5px_rgba(212,175,55,0.3)]">
                    
                    {/* Golden Border Frame */}
                    <div className="absolute inset-0 border border-luxury-gold/10 z-20 rounded-md sm:rounded-lg group-hover:border-luxury-gold/50 transition-colors duration-500"></div>

                    <img 
                        src={drama.thumbnail} 
                        alt={drama.title}
                        className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-500"
                        loading="lazy"
                        onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            if (target.src.includes('hqdefault')) {
                                target.src = target.src.replace('hqdefault', 'mqdefault');
                            } else {
                                target.src = "https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?q=80&w=400&auto=format&fit=crop";
                            }
                        }}
                    />
                    
                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent opacity-80 z-10"></div>

                    {/* Play Button (Hover only on desktop, visible on mobile?) - Keep hover only to clear view */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 z-30 bg-black/20 backdrop-blur-[1px]">
                        <div className="w-8 h-8 sm:w-12 sm:h-12 rounded-full bg-luxury-gold/90 flex items-center justify-center shadow-lg transform scale-50 group-hover:scale-100 transition-transform duration-300">
                            <Play className="text-black ml-0.5" size={12} sm-size={20} fill="currentColor" />
                        </div>
                    </div>

                    {/* Top Badges (Only VIP icon on mobile to save space) */}
                    <div className="absolute top-1 left-1 z-20">
                        <div className="bg-black/60 backdrop-blur-md px-1 py-0.5 rounded text-[6px] sm:text-[9px] font-medium text-luxury-gold border border-luxury-gold/30 flex items-center gap-0.5">
                            <Crown size={6} sm-size={8} fill="currentColor" />
                            <span className="hidden sm:inline">VIP</span>
                        </div>
                    </div>
                    
                    {/* Episode Number overlay on poster for mobile compactness */}
                    <div className="absolute bottom-1 right-1 z-20">
                         <span className="text-[6px] sm:text-[9px] text-white bg-black/50 px-1 rounded border border-white/10">Ep {drama.playlistIndex}</span>
                    </div>
                </div>
                
                {/* Meta Info - Simplified for 5-col mobile */}
                <div className="flex flex-col px-0.5">
                    <h3 className="font-serif text-gray-200 text-[8px] sm:text-sm leading-tight line-clamp-2 group-hover:text-luxury-gold transition-colors duration-300 min-h-[1.5rem] sm:min-h-[2.5rem]">
                        {drama.title}
                    </h3>
                    
                    {/* Rating row - hide on very small screens or make tiny */}
                    <div className="hidden sm:flex justify-between items-end mt-1 sm:mt-2 border-t border-white/5 pt-1 sm:pt-2">
                        <div className="flex flex-col">
                            <span className="text-[10px] text-gray-500 uppercase tracking-wide">Episode</span>
                            <span className="text-xs font-medium text-gray-300 font-serif">{drama.playlistIndex}</span>
                        </div>
                        <div className="flex items-center gap-1 bg-luxury-gold/10 px-1.5 py-0.5 rounded">
                            <Star size={10} className="text-luxury-gold" fill="currentColor" />
                            <span className="text-[10px] font-bold text-luxury-gold">{drama.rating || '4.9'}</span>
                        </div>
                    </div>
                </div>
            </div>
            ))}
        </div>
      )}
    </div>
  );

  const renderContent = () => {
    switch (currentView) {
      case View.HOME:
        return renderDramaGrid(MOCK_DRAMAS, 'KOLEKSI KOSONG');
      case View.LATEST:
        return renderDramaGrid(LATEST_DRAMAS, 'BELUM ADA UPDATE');
      case View.SEARCH:
         return <AIChat />;
      case View.PROFILE:
        return (
            <div className="flex flex-col items-center justify-center h-full text-luxury-gold gap-6 animate-fade-in">
                <div className="p-8 rounded-full border border-luxury-gold/20 bg-luxury-surface shadow-[0_0_30px_rgba(212,175,55,0.1)]">
                    <Settings size={64} strokeWidth={0.5} />
                </div>
                <div className="text-center">
                    <p className="text-lg font-serif tracking-[0.2em] text-white mb-2">PENGATURAN</p>
                    <p className="text-xs text-luxury-gold font-sans tracking-wide">LUXURY EDITION v2.0</p>
                </div>
            </div>
        );
      default:
        return renderDramaGrid(MOCK_DRAMAS, 'KOLEKSI KOSONG');
    }
  };

  // SPLASH SCREEN RENDER
  if (showSplash) {
    return (
        <div className="fixed inset-0 z-[100] bg-luxury-black flex flex-col items-center justify-center p-4 bg-[url('https://images.unsplash.com/photo-1614850523060-8da1d56ae167?q=80&w=2000&auto=format&fit=crop')] bg-cover bg-center">
            {/* Dark Overlay */}
            <div className="absolute inset-0 bg-black/90"></div>

            <div className="relative z-10 flex flex-col items-center">
                {/* Logo Animation */}
                <div className="relative mb-8 animate-fade-in">
                    <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-full bg-gradient-to-br from-luxury-gold via-luxury-goldDark to-black p-[2px] shadow-[0_0_50px_rgba(212,175,55,0.4)]">
                        <div className="w-full h-full rounded-full bg-black flex items-center justify-center">
                            <Crown className="text-luxury-gold w-12 h-12 sm:w-16 sm:h-16" />
                        </div>
                    </div>
                    {/* Decorative Elements */}
                    <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-luxury-gold rounded-full border-4 border-black shadow-[0_0_15px_#D4AF37] animate-pulse"></div>
                    <Sparkles className="absolute -top-4 -right-8 text-luxury-goldLight animate-bounce delay-700" size={24} />
                    <Sparkles className="absolute bottom-4 -left-8 text-luxury-goldLight animate-bounce delay-1000" size={16} />
                </div>

                {/* Text Content */}
                <h1 className="text-4xl sm:text-6xl font-serif font-bold text-gold-gradient mb-3 tracking-wider text-center animate-fade-in">
                    DRAKOR KITA
                </h1>
                <p className="text-luxury-gray text-xs sm:text-sm tracking-[0.4em] uppercase mb-12 text-center animate-fade-in delay-100 border-b border-luxury-gold/30 pb-4 w-full">
                    Premium Streaming
                </p>

                {/* Enter Button */}
                <button
                    onClick={handleEnterApp}
                    className="group relative px-12 py-4 bg-luxury-gold overflow-hidden rounded-full shadow-[0_0_30px_rgba(212,175,55,0.4)] transition-all duration-300 hover:scale-105 active:scale-95 animate-fade-in delay-200"
                >
                    <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                    <div className="flex items-center gap-3 relative z-10">
                        <span className="font-serif font-bold tracking-[0.2em] text-black text-lg">MASUK</span>
                        <Zap className="text-black fill-black animate-pulse" size={20} />
                    </div>
                </button>

                {/* Footer Info */}
                <div className="absolute bottom-[-150px] sm:bottom-[-200px] text-center opacity-40">
                    <p className="text-[10px] text-luxury-gold font-sans tracking-widest">TAP TO ENTER</p>
                </div>
            </div>
        </div>
    );
  }

  return (
    <div className="min-h-screen bg-luxury-charcoal font-sans selection:bg-luxury-gold selection:text-black">
      
      {/* Top Navigation Bar (Glassmorphism + Gold) */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-luxury-black/80 backdrop-blur-xl border-b border-luxury-gold/30 h-16 sm:h-20 transition-all duration-300">
          <div className="max-w-7xl mx-auto px-4 h-full flex items-center justify-between">
              <div className="flex items-center gap-2 sm:gap-3 group cursor-pointer">
                  <div className="relative">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gradient-to-br from-luxury-gold via-luxury-goldDark to-black p-[1px]">
                        <div className="w-full h-full rounded-full bg-black flex items-center justify-center">
                            <Crown className="text-luxury-gold w-4 h-4 sm:w-5 sm:h-5 group-hover:scale-110 transition-transform duration-300" />
                        </div>
                    </div>
                    {/* Glowing dot */}
                    <div className="absolute -bottom-0.5 -right-0.5 w-2 h-2 sm:w-3 sm:h-3 bg-luxury-gold rounded-full border-2 border-black shadow-[0_0_10px_#D4AF37]"></div>
                  </div>
                  <div className="flex flex-col justify-center">
                      <span className="text-gold-gradient font-serif font-bold text-lg sm:text-xl tracking-wider leading-none">
                          DRAKOR
                      </span>
                      <span className="text-[8px] sm:text-[10px] text-gray-400 tracking-[0.3em] font-light uppercase ml-0.5 group-hover:text-white transition-colors">
                          KITA
                      </span>
                  </div>
              </div>
              
              <button 
                  onClick={() => setCurrentView(View.SEARCH)}
                  className="w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center rounded-full text-luxury-gold hover:bg-luxury-gold/10 hover:text-white transition-all border border-transparent hover:border-luxury-gold/30"
              >
                  <Search size={18} sm-size={22} strokeWidth={1.5} />
              </button>
          </div>
      </nav>

      {/* Main Content Area */}
      <main className="h-full min-h-screen bg-gradient-to-b from-luxury-black to-luxury-charcoal">
        {renderContent()}
      </main>

      {/* Bottom Navigation Bar (Floating Island Style) */}
      <div className="fixed bottom-4 sm:bottom-6 left-0 right-0 z-50 flex justify-center px-4 pointer-events-none">
          <div className="pointer-events-auto bg-luxury-black/90 backdrop-blur-2xl border border-luxury-gold/20 rounded-2xl h-14 sm:h-16 px-4 flex items-center justify-between gap-2 sm:gap-6 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.8)] max-w-[340px] sm:max-w-md w-full">
              
              {/* Home Button */}
              <button 
                  onClick={() => setCurrentView(View.HOME)}
                  className={`flex flex-col items-center gap-1 transition-all duration-300 w-12 ${
                      currentView === View.HOME 
                      ? 'text-luxury-gold -translate-y-1' 
                      : 'text-gray-500 hover:text-gray-300'
                  }`}
              >
                  <Home size={18} sm-size={22} strokeWidth={currentView === View.HOME ? 2.5 : 1.5} className={currentView === View.HOME ? 'drop-shadow-[0_0_8px_rgba(212,175,55,0.6)]' : ''} />
                  <span className={`text-[8px] sm:text-[9px] font-serif tracking-widest ${currentView === View.HOME ? 'opacity-100' : 'opacity-0 scale-0'} transition-all`}>HOME</span>
              </button>

              {/* Terbaru Button (New) */}
              <button 
                  onClick={() => setCurrentView(View.LATEST)}
                  className={`flex flex-col items-center gap-1 transition-all duration-300 w-12 ${
                      currentView === View.LATEST 
                      ? 'text-luxury-gold -translate-y-1' 
                      : 'text-gray-500 hover:text-gray-300'
                  }`}
              >
                  <Zap size={18} sm-size={22} strokeWidth={currentView === View.LATEST ? 2.5 : 1.5} className={currentView === View.LATEST ? 'drop-shadow-[0_0_8px_rgba(212,175,55,0.6)]' : ''} />
                  <span className={`text-[8px] sm:text-[9px] font-serif tracking-widest ${currentView === View.LATEST ? 'opacity-100' : 'opacity-0 scale-0'} transition-all`}>BARU</span>
              </button>

              {/* AI/Search Button (Center Highlight) */}
              <div className="relative -top-5 sm:-top-6 mx-1">
                  <button 
                      onClick={() => setCurrentView(View.SEARCH)}
                      className={`flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-full border border-luxury-gold/40 shadow-[0_5px_20px_rgba(0,0,0,0.6)] transition-all duration-300 ${
                          currentView === View.SEARCH
                          ? 'bg-gradient-to-tr from-luxury-gold to-luxury-goldLight text-black scale-110 shadow-[0_0_20px_rgba(212,175,55,0.4)]'
                          : 'bg-luxury-surface text-luxury-gold hover:bg-luxury-gold hover:text-black'
                      }`}
                  >
                      <Sparkles size={20} sm-size={24} strokeWidth={2} />
                  </button>
              </div>

              {/* Settings Button */}
              <button 
                   onClick={() => setCurrentView(View.PROFILE)}
                   className={`flex flex-col items-center gap-1 transition-all duration-300 w-12 ${
                       currentView === View.PROFILE 
                       ? 'text-luxury-gold -translate-y-1' 
                       : 'text-gray-500 hover:text-gray-300'
                   }`}
              >
                  <Settings size={18} sm-size={22} strokeWidth={currentView === View.PROFILE ? 2.5 : 1.5} className={currentView === View.PROFILE ? 'drop-shadow-[0_0_8px_rgba(212,175,55,0.6)]' : ''} />
                  <span className={`text-[8px] sm:text-[9px] font-serif tracking-widest ${currentView === View.PROFILE ? 'opacity-100' : 'opacity-0 scale-0'} transition-all`}>SET</span>
              </button>
          </div>
      </div>
    </div>
  );
};

export default App;