import React from 'react';
import { ArrowLeft, ExternalLink, Share2, Info, Youtube, Play } from 'lucide-react';

interface VideoPlayerProps {
  videoId?: string;
  playlistId: string;
  playlistIndex?: number;
  title: string;
  thumbnail: string;
  onBack: () => void;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ playlistId, playlistIndex, title, onBack }) => {
  
  // Logic Embed: Menggunakan index 0-based untuk iframe
  // Jika playlistIndex 1 (Ep 1), maka embedIndex 0.
  const embedIndex = playlistIndex ? playlistIndex - 1 : 0;
  const embedUrl = `https://www.youtube.com/embed/videoseries?list=${playlistId}&index=${embedIndex}&autoplay=1&modestbranding=1&rel=0&playsinline=1`;

  // Logic Direct Link: 
  // URL ini akan membuka aplikasi YouTube dan langsung memutar video urutan ke-sekian dari playlist.
  // Ini adalah cara paling akurat untuk "mengambil link" spesifik dari sebuah playlist tanpa tahu ID videonya secara langsung.
  const directUrl = `https://www.youtube.com/watch?list=${playlistId}&index=${playlistIndex || 1}`;

  return (
    <div className="fixed inset-0 z-50 bg-black flex flex-col h-full w-full animate-fade-in">
      {/* Header */}
      <div className="w-full bg-[#0f172a] p-3 flex justify-between items-center z-10 safe-top border-b border-white/5">
        <button 
          onClick={onBack}
          className="p-2 text-white hover:bg-white/10 rounded-full transition-all active:scale-95"
        >
          <ArrowLeft size={22} />
        </button>
        <h2 className="text-white font-medium truncate px-4 flex-1 text-center text-sm">{title}</h2>
        <a 
            href={`https://wa.me/?text=Nonton ${title} di sini! Link: ${directUrl}`}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 text-white hover:bg-white/10 rounded-full"
        >
            <Share2 size={20} />
        </a>
      </div>

      {/* Video Area (Embed Iframe) */}
      <div className="w-full aspect-video bg-black sticky top-0 z-20 shadow-xl relative group">
        <iframe 
          src={embedUrl}
          title={title}
          className="w-full h-full"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
          allowFullScreen
        ></iframe>
      </div>

      {/* Content Info */}
      <div className="flex-1 bg-[#0f172a] overflow-y-auto">
         <div className="p-5 space-y-6">
            
            {/* Title & Stats */}
            <div>
                <h1 className="text-xl font-bold text-white mb-2 leading-snug">{title}</h1>
                <div className="flex items-center gap-3 text-xs text-gray-400">
                    <span className="bg-rose-600/20 text-rose-400 px-2 py-0.5 rounded font-medium">Drama</span>
                    <span>•</span>
                    <span>Episode {playlistIndex}</span>
                    <span>•</span>
                    <span className="flex items-center gap-1"><Info size={12}/> HD</span>
                </div>
            </div>

            {/* DIRECT LINK BUTTON AREA */}
            <div className="bg-gradient-to-r from-red-900/40 to-[#1e293b] rounded-xl p-4 border border-red-500/20 flex flex-col gap-3">
                <div className="flex items-start gap-3">
                    <div className="bg-red-600/20 p-2 rounded-full">
                        <Youtube className="text-red-500" size={20} />
                    </div>
                    <div>
                        <h3 className="text-sm font-bold text-white">Link Video Spesifik (App)</h3>
                        <p className="text-xs text-gray-400 mt-1">
                            Tombol ini akan membuka <strong>Episode {playlistIndex}</strong> secara langsung di aplikasi YouTube.
                        </p>
                    </div>
                </div>
                
                <a 
                   href={directUrl}
                   target="_blank"
                   rel="noopener noreferrer"
                   className="w-full flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white px-4 py-3 rounded-lg text-sm font-bold transition-all active:scale-95 shadow-lg"
                >
                   <Play size={16} fill="currentColor" />
                   <span>Buka Episode {playlistIndex} di YouTube</span>
                </a>
            </div>

            {/* Synopsis / Info */}
            <div className="pt-2 border-t border-white/5">
                <h3 className="text-sm font-semibold text-white mb-2">Sinopsis</h3>
                <p className="text-sm text-gray-400 leading-relaxed">
                    Anda sedang menyaksikan <strong>Episode {playlistIndex}</strong>. 
                    Link video ini disusun secara unik dari playlist resmi.
                </p>
            </div>

         </div>
      </div>
    </div>
  );
};

export default VideoPlayer;