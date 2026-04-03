import {
  PRIMARY,
  PRIMARY_RGB,
  SECONDARY_CYAN,
  SECONDARY_VIOLET,
} from '../../constants/adVentureConstants';

export const glassPaperSx = {
  background: 'rgba(255, 255, 255, 0.04)',
  backdropFilter: 'blur(12px)',
  border: `1px solid rgba(${PRIMARY_RGB}, 0.22)`,
};

export const gradientTitleSx = {
  fontWeight: 700,
  background: `linear-gradient(135deg, ${PRIMARY}, ${SECONDARY_CYAN}, ${SECONDARY_VIOLET})`,
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  backgroundClip: 'text',
};
