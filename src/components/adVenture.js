import React, { useState, useRef, useEffect } from 'react';
import AutoAwesome from '@mui/icons-material/AutoAwesome';
import Bolt from '@mui/icons-material/Bolt';
import DeleteOutline from '@mui/icons-material/DeleteOutline';
import Download from '@mui/icons-material/Download';
import ExpandMore from '@mui/icons-material/ExpandMore';
import Favorite from '@mui/icons-material/Favorite';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import LightbulbOutlined from '@mui/icons-material/LightbulbOutlined';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import TouchApp from '@mui/icons-material/TouchApp';
import AutoAwesomeOutlined from '@mui/icons-material/AutoAwesomeOutlined';
import {
  DISABLED_BUTTON_BG,
  ERROR_BORDER_COLOR,
  FALLBACK_BACKEND_URL,
  LOADING_ROTATE_MS,
  MAX_DESCRIPTION_LENGTH,
  MAX_IMAGE_SIZE_BYTES,
  PRIMARY,
  PRIMARY_HOVER,
  PRIMARY_RGB,
  PROMPT_TEXTAREA_HEIGHT_PX,
  PROMPT_TEXTAREA_WIDTH_PX,
  SECONDARY_CYAN,
  SECONDARY_VIOLET,
} from '../constants/adVentureConstants';
import {
  COPY,
  LOADING_STATUS_MESSAGES,
  LOADING_SUBTEXT,
  REFINEMENT_SUGGESTIONS,
} from '../copy/adVentureCopy';

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
  const [loadingMessageIndex, setLoadingMessageIndex] = useState(0);

  const BACKEND_URL =
    process.env.REACT_APP_BACKEND_URL || FALLBACK_BACKEND_URL;

  useEffect(() => {
    if (!loading) {
      return undefined;
    }
    setLoadingMessageIndex(0);
    const id = setInterval(() => {
      setLoadingMessageIndex((i) => (i + 1) % LOADING_STATUS_MESSAGES.length);
    }, LOADING_ROTATE_MS);
    return () => clearInterval(id);
  }, [loading]);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) {
      return;
    }
    if (file.size > MAX_IMAGE_SIZE_BYTES) {
      setError(COPY.imageTooLarge);
      e.target.value = '';
      return;
    }
    const reader = new FileReader();
    reader.onload = (event) => {
      setUploadedImage(event.target.result);
      setError('');
    };
    reader.readAsDataURL(file);
  };

  const generateAd = async (refinementPrompt = null) => {
    if (loading) {
      return;
    }
    if (!uploadedImage || !prompt.trim()) {
      setError(COPY.missingImageOrPrompt);
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
      setError(err.message || COPY.generateFailed);
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

  const iconPrimarySx = { color: PRIMARY, fontSize: 32 };
  const iconAccentSx = { color: SECONDARY_CYAN, fontSize: 32 };
  const iconSmSx = { fontSize: 20 };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 flex flex-col items-center">
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute top-20 left-10 w-72 h-72 rounded-full mix-blend-screen filter blur-3xl opacity-[0.18] animate-blob"
          style={{ backgroundColor: PRIMARY }}
        />
        <div
          className="absolute top-40 right-10 w-72 h-72 rounded-full mix-blend-screen filter blur-3xl opacity-[0.14] animate-blob animation-delay-2000"
          style={{ backgroundColor: SECONDARY_CYAN }}
        />
        <div
          className="absolute -bottom-8 left-1/2 w-72 h-72 rounded-full mix-blend-screen filter blur-3xl opacity-[0.12] animate-blob animation-delay-4000"
          style={{ backgroundColor: SECONDARY_VIOLET }}
        />
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
          background: rgba(255, 255, 255, 0.04);
          backdrop-filter: blur(12px);
          border: 1px solid rgba(${PRIMARY_RGB}, 0.22);
        }
        
        .gradient-text {
          background: linear-gradient(135deg, ${PRIMARY}, ${SECONDARY_CYAN}, ${SECONDARY_VIOLET});
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .prompt-textarea:focus {
          outline: none;
          box-shadow: 0 0 0 2px rgba(${PRIMARY_RGB}, 0.45);
        }
      `}</style>

      <div className="relative z-10 w-full max-w-5xl mx-auto px-4 py-8 flex flex-col items-center">
        <div className="text-center mb-12 w-full">
          <div className="flex items-center justify-center gap-3 mb-4">
            <AutoAwesome sx={iconPrimarySx} />
            <h1 className="text-5xl font-bold gradient-text">{COPY.appTitle}</h1>
            <Bolt sx={iconAccentSx} />
          </div>
          <p className="text-slate-300 text-lg max-w-xl mx-auto">{COPY.tagline}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 w-full justify-items-center lg:justify-items-stretch">
          <div className="lg:col-span-1 space-y-6 w-full max-w-md mx-auto lg:max-w-none lg:mx-0">
            <div className="glass-effect rounded-2xl p-6">
              <h2 className="text-xl font-bold text-white mb-4 text-center lg:text-left">
                {COPY.yourProduct}
              </h2>
              <div
                className={`relative border-2 border-dashed rounded-xl p-8 transition group ${
                  loading
                    ? 'cursor-not-allowed opacity-60 pointer-events-none border-slate-600'
                    : 'cursor-pointer hover:opacity-95'
                }`}
                style={{
                  borderColor: loading ? undefined : `rgba(${PRIMARY_RGB}, 0.5)`,
                }}
                onClick={() => !loading && fileInputRef.current?.click()}
              >
                {uploadedImage ? (
                  <div className="relative">
                    <img
                      src={uploadedImage}
                      alt="Uploaded"
                      className="w-full rounded-lg"
                    />
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setUploadedImage(null);
                      }}
                      className="absolute top-2 right-2 text-white p-2 rounded-lg hover:opacity-90"
                      style={{ backgroundColor: PRIMARY }}
                      aria-label={COPY.ariaRemoveImage}
                    >
                      <DeleteOutline sx={{ fontSize: 20 }} />
                    </button>
                  </div>
                ) : (
                  <div className="text-center flex flex-col items-center gap-2">
                    <PhotoCamera
                      sx={{ fontSize: 48, color: PRIMARY, opacity: 0.9 }}
                    />
                    <p className="text-slate-200 font-semibold">{COPY.dropImageHere}</p>
                    <p className="text-slate-400 text-sm">{COPY.clickToBrowse}</p>
                    <p className="text-slate-500 text-xs mt-1">{COPY.maxImageHint}</p>
                  </div>
                )}
              </div>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
                disabled={loading}
              />
            </div>

            <div className="glass-effect rounded-2xl p-6 flex flex-col items-center">
              <div className="flex items-center justify-between w-full max-w-[320px] mb-2">
                <h2 className="text-xl font-bold text-white">{COPY.adDescription}</h2>
                <span className="text-slate-400 text-sm tabular-nums">
                  {prompt.length}/{MAX_DESCRIPTION_LENGTH}
                </span>
              </div>
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                maxLength={MAX_DESCRIPTION_LENGTH}
                placeholder={COPY.promptPlaceholder}
                className="prompt-textarea bg-slate-800/90 text-white rounded-xl p-3 placeholder-slate-500 resize-none text-sm"
                style={{
                  width: `${PROMPT_TEXTAREA_WIDTH_PX}px`,
                  height: `${PROMPT_TEXTAREA_HEIGHT_PX}px`,
                }}
              />
              <button
                type="button"
                onClick={() => generateAd()}
                disabled={loading || !uploadedImage || !prompt.trim()}
                className="mt-4 font-bold py-3 rounded-xl transition text-white w-full max-w-[320px] disabled:cursor-not-allowed"
                style={
                  !uploadedImage || !prompt.trim()
                    ? { background: DISABLED_BUTTON_BG, opacity: 0.75 }
                    : {
                        background: `linear-gradient(90deg, ${PRIMARY} 0%, ${PRIMARY_HOVER} 100%)`,
                        opacity: loading ? 0.88 : 1,
                      }
                }
              >
                {loading ? COPY.generating : COPY.generateAd}
              </button>
            </div>

            {favorites.length > 0 && (
              <div className="glass-effect rounded-2xl p-6">
                <button
                  type="button"
                  onClick={() => setShowFavorites(!showFavorites)}
                  className="w-full text-white font-bold flex items-center justify-between"
                >
                  <span className="flex items-center gap-2">
                    <Favorite sx={{ color: SECONDARY_CYAN, fontSize: 22 }} />
                    {COPY.favoritesLabel} ({favorites.length})
                  </span>
                  <ExpandMore
                    sx={{
                      color: 'white',
                      transform: showFavorites ? 'rotate(180deg)' : 'none',
                      transition: 'transform 0.2s',
                    }}
                  />
                </button>
                {showFavorites && (
                  <div className="mt-4 space-y-2 max-h-96 overflow-y-auto">
                    {favorites.map((fav, idx) => (
                      <div key={idx} className="relative group">
                        <img
                          src={fav}
                          alt={`Favorite ${idx}`}
                          className="w-full rounded-lg"
                        />
                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition rounded-lg flex items-center justify-center gap-2">
                          <button
                            type="button"
                            onClick={() => downloadImage(fav)}
                            className="text-white p-2 rounded hover:opacity-90"
                            style={{ backgroundColor: PRIMARY }}
                            aria-label={COPY.ariaDownload}
                          >
                            <Download sx={iconSmSx} />
                          </button>
                          <button
                            type="button"
                            onClick={() => removeFavorite(idx)}
                            className="bg-red-600 hover:bg-red-700 text-white p-2 rounded"
                            aria-label={COPY.ariaRemoveFavorite}
                          >
                            <DeleteOutline sx={iconSmSx} />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>

          <div className="lg:col-span-2 space-y-6 w-full max-w-3xl mx-auto">
            {error && (
              <div
                className="glass-effect border-l-4 rounded-2xl p-6"
                style={{ borderLeftColor: ERROR_BORDER_COLOR }}
              >
                <p className="text-red-300">{error}</p>
              </div>
            )}

            {generatedAd && (
              <>
                <div className="glass-effect rounded-2xl p-6 text-center lg:text-left">
                  <h2 className="text-xl font-bold text-white mb-4">
                    {COPY.yourInstagramAd}
                  </h2>
                  <div className="bg-black rounded-xl overflow-hidden">
                    <img
                      src={generatedAd}
                      alt="Generated Ad"
                      className="w-full"
                    />
                  </div>
                  <div className="flex gap-3 mt-4 flex-col sm:flex-row">
                    <button
                      type="button"
                      onClick={addToFavorites}
                      className="flex-1 text-white font-bold py-3 rounded-xl transition flex items-center justify-center gap-2 hover:opacity-90"
                      style={{ backgroundColor: PRIMARY }}
                    >
                      <FavoriteBorder sx={{ fontSize: 22 }} /> {COPY.saveToFavorites}
                    </button>
                    <button
                      type="button"
                      onClick={() => downloadImage(generatedAd)}
                      className="flex-1 text-white font-bold py-3 rounded-xl transition flex items-center justify-center gap-2 hover:opacity-90"
                      style={{ backgroundColor: PRIMARY_HOVER }}
                    >
                      <Download sx={{ fontSize: 22 }} /> {COPY.download}
                    </button>
                  </div>
                </div>

                <div className="glass-effect rounded-2xl p-6">
                  <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                    <AutoAwesomeOutlined sx={{ color: SECONDARY_CYAN }} />
                    {COPY.refineYourAd}
                  </h2>
                  <div className="space-y-2">
                    {REFINEMENT_SUGGESTIONS.map((suggestion, idx) => (
                      <button
                        type="button"
                        key={idx}
                        onClick={() => generateAd(suggestion)}
                        disabled={loading}
                        className="w-full text-left p-3 bg-slate-800/80 hover:bg-slate-800 text-slate-200 hover:text-white rounded-lg transition disabled:opacity-50 flex items-start gap-2"
                      >
                        <LightbulbOutlined
                          sx={{ fontSize: 20, color: SECONDARY_VIOLET, mt: '2px' }}
                        />
                        <span>{suggestion}</span>
                      </button>
                    ))}
                  </div>
                  <input
                    type="text"
                    placeholder={COPY.refinementPlaceholder}
                    onKeyDown={(e) => {
                      if (
                        e.key === 'Enter' &&
                        e.target.value &&
                        e.target.value.trim()
                      ) {
                        generateAd(e.target.value);
                        e.target.value = '';
                      }
                    }}
                    className="w-full mt-4 bg-slate-800 text-white rounded-lg p-3 placeholder-slate-500 focus:outline-none"
                    style={{ boxShadow: 'none' }}
                    onFocus={(e) => {
                      e.target.style.boxShadow = `0 0 0 2px rgba(${PRIMARY_RGB}, 0.4)`;
                    }}
                    onBlur={(e) => {
                      e.target.style.boxShadow = 'none';
                    }}
                  />
                </div>

                {refinementHistory.length > 0 && (
                  <div className="glass-effect rounded-2xl p-6">
                    <h3 className="text-lg font-bold text-white mb-3">
                      {COPY.refinementsApplied}
                    </h3>
                    <div className="space-y-2">
                      {refinementHistory.map((ref, idx) => (
                        <div
                          key={idx}
                          className="flex items-start gap-3 text-sm text-slate-300"
                        >
                          <span style={{ color: PRIMARY }}>→</span>
                          <span>{ref}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </>
            )}

            {!generatedAd && !loading && uploadedImage && prompt.trim() && (
              <div className="glass-effect rounded-2xl p-12 text-center flex flex-col items-center gap-3">
                <TouchApp sx={{ fontSize: 40, color: PRIMARY }} />
                <p className="text-slate-300 text-lg">{COPY.ctaGenerateFirst}</p>
              </div>
            )}

            {loading && (
              <div className="glass-effect rounded-2xl p-12">
                <div className="flex flex-col items-center justify-center gap-4 text-center">
                  <div
                    className="w-12 h-12 rounded-full animate-spin"
                    style={{
                      border: `4px solid rgba(${PRIMARY_RGB}, 0.22)`,
                      borderTopColor: PRIMARY,
                    }}
                  />
                  <p className="text-slate-200 font-medium px-4">
                    {LOADING_STATUS_MESSAGES[loadingMessageIndex]}
                  </p>
                  <p className="text-slate-500 text-sm">{LOADING_SUBTEXT}</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
