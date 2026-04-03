import React, { useState, useRef, useEffect } from 'react';
import AutoAwesome from '@mui/icons-material/AutoAwesome';
import Bolt from '@mui/icons-material/Bolt';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { ThemeProvider, keyframes } from '@mui/material/styles';
import {
  FALLBACK_BACKEND_URL,
  LOADING_ROTATE_MS,
  MAX_IMAGE_SIZE_BYTES,
  PRIMARY,
  SECONDARY_CYAN,
  SECONDARY_VIOLET,
} from '../../constants/adVentureConstants';
import { COPY, LOADING_STATUS_MESSAGES } from '../../copy/adVentureCopy';
import { adVentureTheme } from '../../theme/adVentureTheme';
import AdVentureUploadPanel from './AdVentureUploadPanel';
import AdVenturePromptSection from './AdVenturePromptSection';
import AdVenturePreviewPanel from './AdVenturePreviewPanel';
import { gradientTitleSx } from './adVentureStyles';

const blobFloat = keyframes`
  0%, 100% { transform: translate(0, 0) scale(1); }
  33% { transform: translate(30px, -50px) scale(1.1); }
  66% { transform: translate(-20px, 20px) scale(0.9); }
`;

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

  return (
    <ThemeProvider theme={adVentureTheme}>
      <CssBaseline />
      <Box
        sx={{
          minHeight: '100vh',
          position: 'relative',
          background: 'linear-gradient(135deg, #020617 0%, #0f172a 45%, #020617 100%)',
        }}
      >
        <Box
          aria-hidden
          sx={{
            position: 'fixed',
            inset: 0,
            overflow: 'hidden',
            pointerEvents: 'none',
          }}
        >
          <Box
            sx={{
              position: 'absolute',
              top: 80,
              left: 40,
              width: 288,
              height: 288,
              borderRadius: '50%',
              mixBlendMode: 'screen',
              filter: 'blur(48px)',
              opacity: 0.18,
              bgcolor: PRIMARY,
              animation: `${blobFloat} 7s infinite ease-in-out`,
            }}
          />
          <Box
            sx={{
              position: 'absolute',
              top: 160,
              right: 40,
              width: 288,
              height: 288,
              borderRadius: '50%',
              mixBlendMode: 'screen',
              filter: 'blur(48px)',
              opacity: 0.14,
              bgcolor: SECONDARY_CYAN,
              animation: `${blobFloat} 7s infinite ease-in-out`,
              animationDelay: '2s',
            }}
          />
          <Box
            sx={{
              position: 'absolute',
              bottom: -32,
              left: 80,
              width: 288,
              height: 288,
              borderRadius: '50%',
              mixBlendMode: 'screen',
              filter: 'blur(48px)',
              opacity: 0.12,
              bgcolor: SECONDARY_VIOLET,
              animation: `${blobFloat} 7s infinite ease-in-out`,
              animationDelay: '4s',
            }}
          />
        </Box>

        <Box
          sx={{
            position: 'relative',
            zIndex: 1,
            width: '100%',
            maxWidth: 1280,
            mx: 'auto',
            px: { xs: 2, sm: 3, lg: 5 },
            py: 4,
          }}
        >
          <Stack spacing={2} sx={{ mb: 5, textAlign: 'center', alignItems: 'center' }}>
            <Stack direction="row" alignItems="center" spacing={1.5} flexWrap="wrap">
              <AutoAwesome sx={iconPrimarySx} />
              <Typography variant="h1" component="h1" sx={gradientTitleSx}>
                {COPY.appTitle}
              </Typography>
              <Bolt sx={iconAccentSx} />
            </Stack>
            <Typography sx={{ color: 'text.secondary', fontSize: '1.125rem', maxWidth: '42rem', textAlign: 'center' }}>
              {COPY.tagline}
            </Typography>
          </Stack>

          <Box
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', lg: 'row' },
              gap: 4,
              alignItems: 'stretch',
            }}
          >
            <Stack spacing={3} sx={{ width: '100%', flex: { lg: '1 1 0' }, minWidth: 0 }}>
              <AdVentureUploadPanel
                uploadedImage={uploadedImage}
                loading={loading}
                fileInputRef={fileInputRef}
                onFileInputChange={handleImageUpload}
                onRemoveImage={() => setUploadedImage(null)}
              />
              <AdVenturePromptSection
                prompt={prompt}
                onPromptChange={setPrompt}
                loading={loading}
                uploadedImage={uploadedImage}
                onGenerate={() => generateAd()}
                favorites={favorites}
                showFavorites={showFavorites}
                onToggleFavorites={() => setShowFavorites(!showFavorites)}
                onDownloadFavorite={downloadImage}
                onRemoveFavorite={removeFavorite}
              />
            </Stack>

            <Box sx={{ width: '100%', flex: { lg: '1 1 0' }, minWidth: 0 }}>
              <AdVenturePreviewPanel
                error={error}
                generatedAd={generatedAd}
                loading={loading}
                uploadedImage={uploadedImage}
                prompt={prompt}
                loadingMessageIndex={loadingMessageIndex}
                refinementHistory={refinementHistory}
                generateAd={generateAd}
                addToFavorites={addToFavorites}
                downloadImage={downloadImage}
              />
            </Box>
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  );
}
