import React, { useState, useRef } from 'react';
import { Trash2, Download, Heart, Sparkles, Zap } from 'lucide-react';

export default function AdVenture() {
  const [uploadedImage, setUploadedImage] = useState(null);
  const [prompt, setPrompt] = useState('');
  const [generatedAd, setGeneratedAd] = useState(null);
  const [loading, setLoading] = useState(false);
  const [favorites, setFavorites] = useState([]);
  const [refinementHistory, setRefinementHistory] = useState([]);
  const [error, setError] = useState('');
  const fileInputRef = useRef(null);
  const [showFavorites, setShowFavorites] = useState(false);

  const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setUploadedImage(event.target.result);
        setError('');
      };
      reader.readAsDataURL(file);
    }
  };

  const generateAd = async (refinementPrompt = null) => {
    if (!uploadedImage || !prompt.trim()) {
      setError('Please upload an image and enter a prompt');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const fullPrompt = refinementPrompt
        ? `${prompt}. Additional refinement: ${refinementPrompt}`
        : prompt;

      const response = await fetch(`${BACKEND_URL}/api/generate-ad`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          image: uploadedImage,
          prompt: fullPrompt,
        }),
      });

      if (!response.ok) {
        throw new Error(`API error: ${response.statusText}`);
      }

      const data = await response.json();
      setGeneratedAd(data.image_url);
      
      if (refinementPrompt) {
        setRefinementHistory([...refinementHistory, refinementPrompt]);
      }
    } catch (err) {
      setError(err.message || 'Failed to generate ad. Try again.');
    } finally {
      setLoading(false);
    }
  };

  const addToFavorites = () => {
    if (generatedAd && !favorites.includes(generatedAd)) {
      setFavorites([...favorites, generatedAd]);
    }
  };

  const removeFavorite = (index) => {
    setFavorites(favorites.filter((_, i) => i !== index));
  };

  const downloadImage = (imageUrl) => {
    const link = document.createElement('a');
    link.href = imageUrl;
    link.download = `instagram-ad-${Date.now()}.png`;
    link.click();
  };

  const refinementSuggestions = [
    'Make it more vibrant and colorful',
    'Add a sunset background',
    'Minimalist aesthetic with bold typography',
    'Luxury/premium feel with metallic accents',
    'Summer vibes with bright yellows and blues',
    'Dark mode, moody, cinematic lighting',
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Animated background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-1/2 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;600;700&family=Poppins:wght@300;400;600;700&display=swap');
        
        * {
          font-family: 'Poppins', sans-serif;
        }
        
        h1, h2, h3 {
          font-family: 'Space Grotesk', sans-serif;
        }
        
        @keyframes blob {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
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
        
        .glass-effect {
          background: rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.1);
        }
        
        .gradient-text {
          background: linear-gradient(135deg, #ec4899, #8b5cf6, #06b6d4);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
      `}</style>

      <div className="relative z-10 max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Sparkles className="w-8 h-8 text-pink-400" />
            <h1 className="text-5xl font-bold gradient-text">AdGenius</h1>
            <Zap className="w-8 h-8 text-yellow-400" />
          </div>
          <p className="text-gray-300 text-lg">Transform your products into Instagram-worthy ads in seconds</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Panel - Upload & Prompt */}
          <div className="lg:col-span-1 space-y-6">
            {/* Image Upload */}
            <div className="glass-effect rounded-2xl p-6">
              <h2 className="text-xl font-bold text-white mb-4">Your Product</h2>
              <div
                className="relative border-2 border-dashed border-purple-400 rounded-xl p-8 cursor-pointer hover:border-pink-400 transition group"
                onClick={() => fileInputRef.current?.click()}
              >
                {uploadedImage ? (
                  <div className="relative">
                    <img src={uploadedImage} alt="Uploaded" className="w-full rounded-lg" />
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setUploadedImage(null);
                      }}
                      className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-lg hover:bg-red-600"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <div className="text-center">
                    <div className="text-4xl mb-3">📸</div>
                    <p className="text-gray-300 font-semibold">Drop your image here</p>
                    <p className="text-gray-400 text-sm">or click to browse</p>
                  </div>
                )}
              </div>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
            </div>

            {/* Prompt Input */}
            <div className="glass-effect rounded-2xl p-6">
              <h2 className="text-xl font-bold text-white mb-4">Ad Description</h2>
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="e.g., 'Instagram carousel ad showing product in luxury home setting with warm lighting'"
                className="w-full h-24 bg-slate-800 text-white rounded-xl p-3 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-pink-400 resize-none"
              />
              <button
                onClick={() => generateAd()}
                disabled={loading || !uploadedImage || !prompt.trim()}
                className="w-full mt-4 bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 disabled:from-gray-600 disabled:to-gray-700 disabled:cursor-not-allowed text-white font-bold py-3 rounded-xl transition transform hover:scale-105"
              >
                {loading ? 'Creating magic...' : 'Generate Ad'}
              </button>
            </div>

            {/* Favorites */}
            {favorites.length > 0 && (
              <div className="glass-effect rounded-2xl p-6">
                <button
                  onClick={() => setShowFavorites(!showFavorites)}
                  className="w-full text-white font-bold flex items-center justify-between"
                >
                  <span>❤️ Favorites ({favorites.length})</span>
                  <span>{showFavorites ? '▼' : '▶'}</span>
                </button>
                {showFavorites && (
                  <div className="mt-4 space-y-2 max-h-96 overflow-y-auto">
                    {favorites.map((fav, idx) => (
                      <div key={idx} className="relative group">
                        <img src={fav} alt={`Favorite ${idx}`} className="w-full rounded-lg" />
                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition rounded-lg flex items-center justify-center gap-2">
                          <button
                            onClick={() => downloadImage(fav)}
                            className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded"
                          >
                            <Download className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => removeFavorite(idx)}
                            className="bg-red-500 hover:bg-red-600 text-white p-2 rounded"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Right Panel - Generated Ad & Refinement */}
          <div className="lg:col-span-2 space-y-6">
            {error && (
              <div className="glass-effect border-l-4 border-red-500 rounded-2xl p-6">
                <p className="text-red-300">{error}</p>
              </div>
            )}

            {generatedAd && (
              <>
                {/* Generated Ad Preview */}
                <div className="glass-effect rounded-2xl p-6">
                  <h2 className="text-xl font-bold text-white mb-4">Your Instagram Ad</h2>
                  <div className="bg-black rounded-xl overflow-hidden">
                    <img src={generatedAd} alt="Generated Ad" className="w-full" />
                  </div>
                  <div className="flex gap-3 mt-4">
                    <button
                      onClick={addToFavorites}
                      className="flex-1 bg-pink-500 hover:bg-pink-600 text-white font-bold py-3 rounded-xl transition flex items-center justify-center gap-2"
                    >
                      <Heart className="w-5 h-5" /> Save to Favorites
                    </button>
                    <button
                      onClick={() => downloadImage(generatedAd)}
                      className="flex-1 bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 rounded-xl transition flex items-center justify-center gap-2"
                    >
                      <Download className="w-5 h-5" /> Download
                    </button>
                  </div>
                </div>

                {/* Refinement Options */}
                <div className="glass-effect rounded-2xl p-6">
                  <h2 className="text-xl font-bold text-white mb-4">✨ Refine Your Ad</h2>
                  <div className="space-y-2">
                    {refinementSuggestions.map((suggestion, idx) => (
                      <button
                        key={idx}
                        onClick={() => generateAd(suggestion)}
                        disabled={loading}
                        className="w-full text-left p-3 bg-slate-800 hover:bg-slate-700 text-gray-300 hover:text-white rounded-lg transition disabled:opacity-50"
                      >
                        💡 {suggestion}
                      </button>
                    ))}
                  </div>
                  <input
                    type="text"
                    placeholder="Or describe your own refinement..."
                    onKeyPress={(e) => {
                      if (e.key === 'Enter' && e.target.value.trim()) {
                        generateAd(e.target.value);
                        e.target.value = '';
                      }
                    }}
                    className="w-full mt-4 bg-slate-800 text-white rounded-lg p-3 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-pink-400"
                  />
                </div>

                {/* Refinement History */}
                {refinementHistory.length > 0 && (
                  <div className="glass-effect rounded-2xl p-6">
                    <h3 className="text-lg font-bold text-white mb-3">📝 Refinements Applied</h3>
                    <div className="space-y-2">
                      {refinementHistory.map((ref, idx) => (
                        <div key={idx} className="flex items-start gap-3 text-sm text-gray-300">
                          <span className="text-purple-400">→</span>
                          <span>{ref}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </>
            )}

            {!generatedAd && !loading && uploadedImage && prompt.trim() && (
              <div className="glass-effect rounded-2xl p-12 text-center">
                <p className="text-gray-300 text-lg">👆 Click "Generate Ad" to create your first Instagram ad</p>
              </div>
            )}

            {loading && (
              <div className="glass-effect rounded-2xl p-12">
                <div className="flex flex-col items-center justify-center gap-4">
                  <div className="w-12 h-12 border-4 border-pink-400 border-t-transparent rounded-full animate-spin"></div>
                  <p className="text-gray-300">Creating your ad with AI magic...</p>
                  <p className="text-gray-500 text-sm">This usually takes 30-60 seconds</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}