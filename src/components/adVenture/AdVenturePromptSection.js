import React from 'react';
import DeleteOutline from '@mui/icons-material/DeleteOutline';
import Download from '@mui/icons-material/Download';
import ExpandMore from '@mui/icons-material/ExpandMore';
import Favorite from '@mui/icons-material/Favorite';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import {
  DISABLED_BUTTON_BG,
  MAX_DESCRIPTION_LENGTH,
  PRIMARY,
  PRIMARY_HOVER,
  PRIMARY_RGB,
  PROMPT_TEXTAREA_HEIGHT_PX,
  PROMPT_TEXTAREA_WIDTH_PX,
  SECONDARY_CYAN,
} from '../../constants/adVentureConstants';
import { COPY } from '../../copy/adVentureCopy';
import { glassPaperSx } from './adVentureStyles';

const iconSmSx = { fontSize: 20 };

const AdVenturePromptSection = ({
  prompt,
  onPromptChange,
  loading,
  uploadedImage,
  onGenerate,
  favorites,
  showFavorites,
  onToggleFavorites,
  onDownloadFavorite,
  onRemoveFavorite,
}) => (
  <>
    <Paper
      elevation={0}
      sx={{
        ...glassPaperSx,
        p: 3,
        borderRadius: '16px',
      }}
    >
      <Stack spacing={2} alignItems="center">
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          sx={{ width: '100%', maxWidth: PROMPT_TEXTAREA_WIDTH_PX }}
        >
          <Typography variant="h2" component="h2" sx={{ color: 'common.white' }}>
            {COPY.adDescription}
          </Typography>
          <Typography
            variant="body2"
            sx={{ color: 'grey.400', fontVariantNumeric: 'tabular-nums' }}
          >
            {prompt.length}/{MAX_DESCRIPTION_LENGTH}
          </Typography>
        </Stack>
        <TextField
          multiline
          value={prompt}
          onChange={(e) => onPromptChange(e.target.value)}
          placeholder={COPY.promptPlaceholder}
          inputProps={{ maxLength: MAX_DESCRIPTION_LENGTH }}
          sx={{
            width: PROMPT_TEXTAREA_WIDTH_PX,
            '& .MuiOutlinedInput-root': {
              bgcolor: 'rgba(15, 23, 42, 0.9)',
              color: 'common.white',
              alignItems: 'flex-start',
              '& fieldset': { borderColor: 'rgba(148, 163, 184, 0.35)' },
              '&:hover fieldset': { borderColor: `rgba(${PRIMARY_RGB}, 0.45)` },
              '&.Mui-focused fieldset': { borderColor: PRIMARY },
            },
            '& .MuiInputBase-input': {
              minHeight:`${PROMPT_TEXTAREA_HEIGHT_PX - 28}px`,
              overflow: 'auto',
              boxSizing: 'border-box',
              fontSize: '0.875rem',
            },
          }}
        />
        <Button
          type="button"
          variant="contained"
          disableElevation
          onClick={onGenerate}
          disabled={loading || !uploadedImage || !prompt.trim()}
          sx={{
            mt: 1,
            py: 1.5,
            width: '100%',
            maxWidth: PROMPT_TEXTAREA_WIDTH_PX,
            fontWeight: 700,
            borderRadius: '12px',
            textTransform: 'none',
            color: 'common.white',
            ...(!uploadedImage || !prompt.trim()
              ? { bgcolor: DISABLED_BUTTON_BG, opacity: 0.75 }
              : {
                  background: `linear-gradient(90deg, ${PRIMARY} 0%, ${PRIMARY_HOVER} 100%)`,
                  opacity: loading ? 0.88 : 1,
                  '&:hover': {
                    background: `linear-gradient(90deg, ${PRIMARY_HOVER} 0%, ${PRIMARY} 100%)`,
                    opacity: loading ? 0.88 : 1,
                  },
                }),
          }}
        >
          {loading ? COPY.generating : COPY.generateAd}
        </Button>
      </Stack>
    </Paper>

    {favorites.length > 0 && (
      <Paper
        elevation={0}
        sx={{
          ...glassPaperSx,
          p: 3,
          borderRadius: '16px',
        }}
      >
        <Button
          type="button"
          fullWidth
          onClick={onToggleFavorites}
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            color: 'common.white',
            fontWeight: 700,
            textTransform: 'none',
            py: 1,
          }}
          endIcon={
            <ExpandMore
              sx={{
                color: 'common.white',
                transform: showFavorites ? 'rotate(180deg)' : 'none',
                transition: 'transform 0.2s',
              }}
            />
          }
        >
          <Stack direction="row" alignItems="center" spacing={1} component="span">
            <Favorite sx={{ color: SECONDARY_CYAN, fontSize: 22 }} />
            <span>
              {COPY.favoritesLabel} ({favorites.length})
            </span>
          </Stack>
        </Button>
        {showFavorites && (
          <Stack spacing={2} sx={{ mt: 2, maxHeight: '24rem', overflow: 'auto' }}>
            {favorites.map((fav, idx) => (
              <Box
                key={idx}
                sx={{
                  position: 'relative',
                  '&:hover .fav-actions': { opacity: 1 },
                }}
              >
                <Box
                  component="img"
                  src={fav}
                  alt={`Favorite ${idx}`}
                  sx={{ width: '100%', borderRadius: '8px', display: 'block' }}
                />
                <Stack
                  className="fav-actions"
                  direction="row"
                  spacing={1}
                  sx={{
                    position: 'absolute',
                    inset: 0,
                    bgcolor: 'rgba(0,0,0,0.5)',
                    borderRadius: '8px',
                    alignItems: 'center',
                    justifyContent: 'center',
                    opacity: 0,
                    transition: 'opacity 0.2s',
                  }}
                >
                  <IconButton
                    type="button"
                    onClick={() => onDownloadFavorite(fav)}
                    aria-label={COPY.ariaDownload}
                    sx={{
                      color: 'common.white',
                      bgcolor: PRIMARY,
                      '&:hover': { bgcolor: PRIMARY, opacity: 0.9 },
                    }}
                  >
                    <Download sx={iconSmSx} />
                  </IconButton>
                  <IconButton
                    type="button"
                    onClick={() => onRemoveFavorite(idx)}
                    aria-label={COPY.ariaRemoveFavorite}
                    sx={{
                      color: 'common.white',
                      bgcolor: 'error.dark',
                      '&:hover': { bgcolor: 'error.main' },
                    }}
                  >
                    <DeleteOutline sx={iconSmSx} />
                  </IconButton>
                </Stack>
              </Box>
            ))}
          </Stack>
        )}
      </Paper>
    )}
  </>
);

export default AdVenturePromptSection;
