export const getFontFamilyCSS = (fontFamily?: string): string => {
  switch (fontFamily) {
    case 'Arial':
      return 'Arial, Helvetica, sans-serif';
    case 'Calibri':
      return 'Calibri, Candara, Segoe, sans-serif';
    case 'Aptos':
      return 'Aptos, Segoe UI, sans-serif';
    case 'Helvetica':
      return '"Helvetica Neue", Helvetica, Arial, sans-serif';
    case 'Georgia':
      return 'Georgia, serif';
    case 'Source Sans':
      return '"Source Sans Pro", sans-serif';
    case 'Roboto':
      return 'Roboto, sans-serif';
    case 'Inter':
    default:
      return 'Inter, system-ui, -apple-system, sans-serif';
  }
};

export const getFontSizeClass = (fontSize?: 'small' | 'medium' | 'large'): {
  name: string;
  headline: string;
  heading: string;
  body: string;
  meta: string;
} => {
  switch (fontSize) {
    case 'small':
      return { name: '20px', headline: '11px', heading: '11px', body: '9.5px', meta: '8.5px' };
    case 'large':
      return { name: '28px', headline: '14px', heading: '14px', body: '11px', meta: '10px' };
    case 'medium':
    default:
      return { name: '24px', headline: '12px', heading: '12px', body: '10px', meta: '9px' };
  }
};

export const getSpacingPx = (spacing?: 'compact' | 'normal' | 'spacious'): string => {
  switch (spacing) {
    case 'compact':
      return '0.6rem';
    case 'spacious':
      return '1.5rem';
    case 'normal':
    default:
      return '1rem';
  }
};

export const getLineHeight = (lineHeight?: 'compact' | 'normal' | 'spacious'): string => {
  switch (lineHeight) {
    case 'compact':
      return '1.25';
    case 'spacious':
      return '1.6';
    case 'normal':
    default:
      return '1.45';
  }
};

export const getMarginPx = (margins?: 'narrow' | 'normal' | 'wide'): string => {
  switch (margins) {
    case 'narrow':
      return '1.25rem';
    case 'wide':
      return '2.5rem';
    case 'normal':
    default:
      return '1.75rem';
  }
};

export const formatDate = (dateStr?: string): string => {
  if (!dateStr) return '';
  if (dateStr.toLowerCase() === 'present') return 'Present';
  // format YYYY-MM to Month YYYY
  const parts = dateStr.split('-');
  if (parts.length === 2) {
    const year = parts[0];
    const monthIndex = parseInt(parts[1], 10) - 1;
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    if (monthIndex >= 0 && monthIndex < 12) {
      return `${months[monthIndex]} ${year}`;
    }
  }
  return dateStr;
};

export const filterEmptySection = <T>(array?: T[]): T[] => {
  return (array && array.length > 0) ? array : [];
};
