"use client";

import {
  FormControl,
  FormControlLabel,
  MenuItem,
  Radio,
  RadioGroup,
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
  const isMdDown = useMediaQuery(theme.breakpoints.down("md"));

  if (isMdDown) {
    return (
      <FormControl fullWidth>
        <Select
          labelId="genre-select-label"
          value={value}
          label="Genre"
          onChange={(e) => onChange(e.target.value)}
        >
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
    <FormControl>
      <RadioGroup value={value} onChange={(e) => onChange(e.target.value)}>
        {genres.map((genre) => (
          <FormControlLabel
            key={genre.value}
            value={genre.value}
            control={<Radio />}
            label={genre.label}
          />
        ))}
      </RadioGroup>
    </FormControl>
  );
}
