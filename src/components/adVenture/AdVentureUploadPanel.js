import React from 'react';
import DeleteOutline from '@mui/icons-material/DeleteOutline';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import {
  PRIMARY,
  PRIMARY_RGB,
} from '../../constants/adVentureConstants';
import { COPY } from '../../copy/adVentureCopy';
import { glassPaperSx } from './adVentureStyles';

const AdVentureUploadPanel = ({
  uploadedImage,
  loading,
  fileInputRef,
  onFileInputChange,
  onRemoveImage,
}) => (
  <Paper
    elevation={0}
    sx={{
      ...glassPaperSx,
      p: 3,
      borderRadius: '16px',
    }}
  >
    <Typography variant="h2" component="h2" sx={{ color: 'common.white', mb: 2 }}>
      {COPY.yourProduct}
    </Typography>
    <Box
      onClick={() => !loading && fileInputRef.current?.click()}
      sx={{
        position: 'relative',
        borderStyle: 'dashed',
        borderWidth: 2,
        borderRadius: '12px',
        p: 4,
        borderColor: loading ? 'grey.700' : `rgba(${PRIMARY_RGB}, 0.5)`,
        cursor: loading ? 'not-allowed' : 'pointer',
        opacity: loading ? 0.6 : 1,
        pointerEvents: loading ? 'none' : 'auto',
        transition: 'opacity 0.2s',
        '&:hover': {
          opacity: loading ? 0.6 : 0.95,
        },
      }}
    >
      {uploadedImage ? (
        <Box
          sx={{
            position: 'relative',
            width: '100%',
            aspectRatio: '1 / 1',
            borderRadius: '8px',
            overflow: 'hidden',
            bgcolor: 'black',
          }}
        >
          <Box
            component="img"
            src={uploadedImage}
            alt="Uploaded"
            sx={{
              width: '100%',
              height: '100%',
              objectFit: 'contain',
              display: 'block',
            }}
          />
          <IconButton
            type="button"
            size="small"
            onClick={(e) => {
              e.stopPropagation();
              onRemoveImage();
            }}
            aria-label={COPY.ariaRemoveImage}
            sx={{
              position: 'absolute',
              top: 8,
              right: 8,
              color: 'common.white',
              bgcolor: PRIMARY,
              '&:hover': { bgcolor: PRIMARY, opacity: 0.9 },
            }}
          >
            <DeleteOutline sx={{ fontSize: 20 }} />
          </IconButton>
        </Box>
      ) : (
        <Box
          sx={{
            width: '100%',
            aspectRatio: '1 / 1',
            borderRadius: '8px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            gap: 1,
          }}
        >
          <PhotoCamera sx={{ fontSize: 48, color: PRIMARY, opacity: 0.9 }} />
          <Typography sx={{ color: 'grey.200', fontWeight: 600 }}>
            {COPY.dropImageHere}
          </Typography>
          <Typography variant="body2" sx={{ color: 'grey.400' }}>
            {COPY.clickToBrowse}
          </Typography>
          <Typography variant="caption" sx={{ color: 'grey.500', mt: 0.5 }}>
            {COPY.maxImageHint}
          </Typography>
        </Box>
      )}
    </Box>
    <input
      ref={fileInputRef}
      type="file"
      accept="image/*"
      onChange={onFileInputChange}
      disabled={loading}
      style={{ display: 'none' }}
    />
  </Paper>
);

export default AdVentureUploadPanel;
