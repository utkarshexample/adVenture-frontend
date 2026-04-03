import React from 'react';
import AutoAwesomeOutlined from '@mui/icons-material/AutoAwesomeOutlined';
import Download from '@mui/icons-material/Download';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import LightbulbOutlined from '@mui/icons-material/LightbulbOutlined';
import TouchApp from '@mui/icons-material/TouchApp';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import {
  ERROR_BORDER_COLOR,
  PRIMARY,
  PRIMARY_HOVER,
  PRIMARY_RGB,
  SECONDARY_CYAN,
  SECONDARY_VIOLET,
} from '../../constants/adVentureConstants';
import {
  COPY,
  LOADING_STATUS_MESSAGES,
  LOADING_SUBTEXT,
  REFINEMENT_SUGGESTIONS,
} from '../../copy/adVentureCopy';
import { glassPaperSx } from './adVentureStyles';

const AdVenturePreviewPanel = ({
  error,
  generatedAd,
  loading,
  uploadedImage,
  prompt,
  loadingMessageIndex,
  refinementHistory,
  generateAd,
  addToFavorites,
  downloadImage,
}) => (
  <Stack spacing={3} sx={{ width: '100%', minHeight: 0 }}>
    {error && (
      <Paper
        elevation={0}
        sx={{
          ...glassPaperSx,
          p: 3,
          borderRadius: '16px',
          borderLeft: '4px solid',
          borderLeftColor: ERROR_BORDER_COLOR,
        }}
      >
        <Typography sx={{ color: 'error.light' }}>{error}</Typography>
      </Paper>
    )}

    {generatedAd && (
      <>
        <Paper
          elevation={0}
          sx={{
            ...glassPaperSx,
            p: 3,
            borderRadius: '16px',
            textAlign: 'left',
          }}
        >
          <Typography variant="h2" component="h2" sx={{ color: 'common.white', mb: 2 }}>
            {COPY.yourInstagramAd}
          </Typography>
          <Box sx={{ bgcolor: 'common.black', borderRadius: '12px', overflow: 'hidden' }}>
            <Box
              component="img"
              src={generatedAd}
              alt="Generated Ad"
              sx={{ width: '100%', display: 'block' }}
            />
          </Box>
          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            spacing={1.5}
            sx={{ mt: 2, gap: 1.5 }}
          >
            <Button
              type="button"
              variant="contained"
              disableElevation
              fullWidth
              onClick={addToFavorites}
              sx={{
                py: 1.5,
                fontWeight: 700,
                borderRadius: '12px',
                textTransform: 'none',
                bgcolor: PRIMARY,
                color: 'common.white',
                '&:hover': { bgcolor: PRIMARY, opacity: 0.9 },
              }}
            >
              <FavoriteBorder sx={{ fontSize: 22, mr: 1 }} />
              {COPY.saveToFavorites}
            </Button>
            <Button
              type="button"
              variant="contained"
              disableElevation
              fullWidth
              onClick={() => downloadImage(generatedAd)}
              sx={{
                py: 1.5,
                fontWeight: 700,
                borderRadius: '12px',
                textTransform: 'none',
                bgcolor: PRIMARY_HOVER,
                color: 'common.white',
                '&:hover': { bgcolor: PRIMARY_HOVER, opacity: 0.9 },
              }}
            >
              <Download sx={{ fontSize: 22, mr: 1 }} />
              {COPY.download}
            </Button>
          </Stack>
        </Paper>

        <Paper
          elevation={0}
          sx={{
            ...glassPaperSx,
            p: 3,
            borderRadius: '16px',
          }}
        >
          <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 2 }}>
            <AutoAwesomeOutlined sx={{ color: SECONDARY_CYAN }} />
            <Typography variant="h2" component="h2" sx={{ color: 'common.white' }}>
              {COPY.refineYourAd}
            </Typography>
          </Stack>
          <Stack spacing={1}>
            {REFINEMENT_SUGGESTIONS.map((suggestion, idx) => (
              <Button
                type="button"
                key={idx}
                onClick={() => generateAd(suggestion)}
                disabled={loading}
                sx={{
                  justifyContent: 'flex-start',
                  textAlign: 'left',
                  py: 1.5,
                  px: 1.5,
                  bgcolor: 'rgba(30, 41, 59, 0.8)',
                  color: 'grey.200',
                  textTransform: 'none',
                  borderRadius: '8px',
                  '&:hover': { bgcolor: 'rgba(30, 41, 59, 1)', color: 'common.white' },
                  '&:disabled': { opacity: 0.5 },
                }}
              >
                <LightbulbOutlined
                  sx={{ fontSize: 20, color: SECONDARY_VIOLET, mr: 1, mt: '2px' }}
                />
                <span>{suggestion}</span>
              </Button>
            ))}
          </Stack>
          <TextField
            fullWidth
            size="small"
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
            sx={{
              mt: 2,
              '& .MuiOutlinedInput-root': {
                bgcolor: 'rgba(15, 23, 42, 0.95)',
                color: 'common.white',
                '& fieldset': { borderColor: 'rgba(148, 163, 184, 0.25)' },
                '&.Mui-focused fieldset': {
                  borderColor: PRIMARY,
                  boxShadow: `0 0 0 2px rgba(${PRIMARY_RGB}, 0.25)`,
                },
              },
            }}
          />
        </Paper>

        {refinementHistory.length > 0 && (
          <Paper
            elevation={0}
            sx={{
              ...glassPaperSx,
              p: 3,
              borderRadius: '16px',
            }}
          >
            <Typography variant="h3" component="h3" sx={{ color: 'common.white', mb: 1.5 }}>
              {COPY.refinementsApplied}
            </Typography>
            <Stack spacing={1}>
              {refinementHistory.map((ref, idx) => (
                <Stack key={idx} direction="row" spacing={1.5} sx={{ alignItems: 'flex-start' }}>
                  <Typography component="span" sx={{ color: PRIMARY }}>
                    →
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'grey.300' }}>
                    {ref}
                  </Typography>
                </Stack>
              ))}
            </Stack>
          </Paper>
        )}
      </>
    )}

    {!generatedAd && !loading && uploadedImage && prompt.trim() && (
      <Paper
        elevation={0}
        sx={{
          ...glassPaperSx,
          p: 6,
          borderRadius: '16px',
        }}
      >
        <Stack spacing={1.5} alignItems="flex-start">
          <TouchApp sx={{ fontSize: 40, color: PRIMARY }} />
          <Typography sx={{ color: 'grey.300', fontSize: '1.125rem', textAlign: 'left' }}>
            {COPY.ctaGenerateFirst}
          </Typography>
        </Stack>
      </Paper>
    )}

    {loading && (
      <Paper
        elevation={0}
        sx={{
          ...glassPaperSx,
          p: 6,
          borderRadius: '16px',
        }}
      >
        <Stack spacing={2} alignItems="flex-start">
          <CircularProgress
            size={48}
            thickness={4}
            sx={{
              color: PRIMARY,
            }}
          />
          <Typography sx={{ color: 'grey.200', fontWeight: 500, pr: 2 }}>
            {LOADING_STATUS_MESSAGES[loadingMessageIndex]}
          </Typography>
          <Typography variant="body2" sx={{ color: 'grey.500' }}>
            {LOADING_SUBTEXT}
          </Typography>
        </Stack>
      </Paper>
    )}
  </Stack>
);

export default AdVenturePreviewPanel;
