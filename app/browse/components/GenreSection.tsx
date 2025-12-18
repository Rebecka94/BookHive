"use client";

import {
  Box,
  FormControl,
  MenuItem,
  Select,
  useMediaQuery,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";

type GenreSectionProps = {
  value: string;
  onChange: (value: string) => void;
};

const genres = [
  { value: "fantasy", label: "Fantasy" },
  { value: "romance", label: "Romance" },
  { value: "science-fiction", label: "Science fiction" },
  { value: "fiction", label: "Fiction" },
  { value: "crime", label: "Crime" },
  { value: "biography", label: "Biography" },
  { value: "drama", label: "Drama" },
  { value: "history", label: "History" },
  { value: "poetry", label: "Poetry" },
  { value: "horror", label: "Horror" },
];

export default function GenreSection({ value, onChange }: GenreSectionProps) {
  const theme = useTheme();
  const isLgUp = useMediaQuery(theme.breakpoints.up("lg"));

  if (!isLgUp) {
    return (
      <FormControl fullWidth size="small">
        <Select value={value} onChange={(e) => onChange(e.target.value)}>
          {genres.map((genre) => (
            <MenuItem key={genre.value} value={genre.value}>
              {genre.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    );
  }

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
      {genres.map((genre) => (
        <Box
          key={genre.value}
          onClick={() => onChange(genre.value)}
          sx={{
            px: 2,
            py: 1.5,
            borderRadius: 2,
            cursor: "pointer",
            backgroundColor:
              value === genre.value ? "rgba(0, 0, 0, 0.08)" : "transparent",
            color: "text.primary",
            fontWeight: value === genre.value ? 600 : 400,
            transition: "all 0.2s ease",
            "&:hover": {
              backgroundColor:
                value === genre.value ? "rgba(0, 0, 0, 0.12)" : "action.hover",
              transform: "translateX(4px)",
            },
          }}
        >
          {genre.label}
        </Box>
      ))}
    </Box>
  );
}
