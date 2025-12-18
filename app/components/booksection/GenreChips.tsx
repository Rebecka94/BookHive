import { Box, Chip } from "@mui/material";

type Props = {
  genres: string[];
  activeGenre: string;
  onSelect: (genre: string) => void;
};

export function GenreChips({ genres, activeGenre, onSelect }: Props) {
  return (
    <Box
      sx={{
        display: "flex",
        gap: 1.5,
        px: 3.5,
        mt: 2,
        mb: 3,
        flexWrap: "wrap",
      }}
    >
      {genres.map((g) => (
        <Chip
          key={g}
          label={g}
          clickable
          color={g === activeGenre ? "primary" : "default"}
          onClick={() => onSelect(g)}
        />
      ))}
    </Box>
  );
}
