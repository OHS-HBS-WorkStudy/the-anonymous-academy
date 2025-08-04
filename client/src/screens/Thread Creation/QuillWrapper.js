import { styled } from '@mui/material/styles';
import { Box } from '@mui/material';

const QuillWrapper = styled(Box)(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius * 1.2,
  overflow: "hidden",
  padding: theme.spacing(0),
  transition: "all 0.3s ease-in-out",
  background: theme.palette.background.alt,
  boxShadow: theme.shadows[4],

  "& .ql-toolbar": {
    backgroundColor: theme.palette.background.input,
    borderBottom: `1px solid ${theme.palette.divider}`,
    borderRadius: `${theme.shape.borderRadius}px ${theme.shape.borderRadius}px 0 0`,
    padding: theme.spacing(0.75, 1),
    boxShadow: theme.shadows[1],
    display: "flex",
    justifyContent: "center",
    flexWrap: "wrap",
    gap: theme.spacing(0.5),

    "& button": {
      minWidth: '28px',
      height: '22px',
      fontSize: "0.5rem",
      color: theme.palette.text.secondary, // Assuming .dark is not a standard theme property, use secondary directly or define it
      transition: 'background-color 0.2s ease, color 0.2s ease',
      '&:hover': {
        backgroundColor: theme.palette.action.hover,
        color: theme.palette.primary.main,
      },
      "&.ql-active": {
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.primary.contrastText,
        boxShadow: theme.shadows[1],
      },
      "&.ql-disabled": {
        color: theme.palette.action.disabled,
        cursor: 'not-allowed',
      }
    },

    "& .ql-picker": {
      fontSize: '0.75rem',
      color: theme.palette.text.secondary, // Assuming .dark is not a standard theme property
      transition: 'color 0.2s ease',

      "& .ql-picker-label": {
        fontSize: '0.75rem',
        color: theme.palette.text.secondary, // Assuming .dark is not a standard theme property
      },

      "&:hover .ql-picker-label": {
        color: theme.palette.primary.main,
      },

      "&.ql-expanded .ql-picker-label": {
        color: theme.palette.primary.main,
      },

      "& .ql-picker-options": {
        fontSize: '0.75rem',
        backgroundColor: theme.palette.background.paper,
        border: `1px solid ${theme.palette.divider}`,
        boxShadow: theme.shadows[2],
        color: theme.palette.text.primary,

        "& .ql-picker-item": {
          padding: theme.spacing(0.5, 1),
          cursor: "pointer",
          fontSize: '0.75rem',
          color: theme.palette.text.primary,
          '&:hover': {
            backgroundColor: theme.palette.action.hover,
          },
          "&.ql-selected": {
            backgroundColor: theme.palette.primary.light,
            color: theme.palette.primary.contrastText,
            fontWeight: 600,
          },
        },
      },
    },
  },

  "& .ql-container": {
    border: "none",
    backgroundColor: theme.palette.mode === "dark"
      ? theme.palette.grey[850]
      : theme.palette.background.alt,
    borderRadius: `0 0 ${theme.shape.borderRadius}px ${theme.shape.borderRadius}px`,
    minHeight: "180px",
    fontSize: "0.95rem",
    fontFamily: "'Inter', sans-serif",
    color: theme.palette.text.primary,

    "& .ql-editor": {
      padding: theme.spacing(2),
      lineHeight: 1.5,
      fontSize: "0.95rem",
      color: `${theme.palette.text.primary} !important`, // Still need `!important` here if Quill overrides
      "&.ql-blank::before": {
        color: theme.palette.text.disabled,
        fontStyle: 'italic',
      },
    },

    "& span.ql-size-small, & span.ql-size-large, & span.ql-size-huge": {
      color: `${theme.palette.text.primary} !important`, // Still need `!important` here if Quill overrides
    },

    "&::-webkit-scrollbar": {
      width: "6px",
    },
    "&::-webkit-scrollbar-thumb": {
      backgroundColor: theme.palette.primary.main,
      borderRadius: "4px",
    },
  },
}));

export default QuillWrapper;