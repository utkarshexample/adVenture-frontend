import { MAX_IMAGE_SIZE_MB } from '../constants/adVentureConstants';

export const LOADING_STATUS_MESSAGES = Object.freeze([
  'Analyzing your product image…',
  'Interpreting your creative brief…',
  'Balancing light, color, and composition…',
  'Applying brand-safe enhancements…',
  'Refining details for a polished ad…',
  'Almost there—finalizing the render…',
]);

export const LOADING_SUBTEXT = 'This usually takes 30–60 seconds';

export const REFINEMENT_SUGGESTIONS = Object.freeze([
  'Make it more vibrant and colorful',
  'Add a sunset background',
  'Minimalist aesthetic with bold typography',
  'Luxury/premium feel with metallic accents',
  'Summer vibes with bright yellows and blues',
  'Dark mode, moody, cinematic lighting',
]);

export const COPY = Object.freeze({
  appTitle: 'AdGenius',
  tagline: 'Transform your products into Instagram-worthy ads in seconds',
  yourProduct: 'Your Product',
  dropImageHere: 'Drop your image here',
  clickToBrowse: 'or click to browse',
  maxImageHint: `Max ${MAX_IMAGE_SIZE_MB}MB`,
  adDescription: 'Ad Description',
  promptPlaceholder:
    'e.g., Instagram carousel ad, luxury home setting, warm lighting',
  generateAd: 'Generate Ad',
  generating: 'Creating magic…',
  favoritesLabel: 'Favorites',
  yourInstagramAd: 'Your Instagram Ad',
  saveToFavorites: 'Save to Favorites',
  download: 'Download',
  refineYourAd: 'Refine Your Ad',
  refinementPlaceholder: 'Or describe your own refinement…',
  refinementsApplied: 'Refinements Applied',
  ctaGenerateFirst: 'Click "Generate Ad" to create your first Instagram ad',
  imageTooLarge: `Image must be ${MAX_IMAGE_SIZE_MB}MB or smaller.`,
  missingImageOrPrompt: 'Please upload an image and enter a prompt',
  generateFailed: 'Failed to generate ad. Try again.',
  ariaRemoveImage: 'Remove image',
  ariaDownload: 'Download',
  ariaRemoveFavorite: 'Remove favorite',
});
