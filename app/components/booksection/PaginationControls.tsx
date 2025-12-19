import { Box, Pagination } from "@mui/material";

type Props = {
  page: number;
  totalPages: number;
  onChange: (page: number) => void;
};

export function PaginationControls({
  page,
  totalPages,
  onChange,
}: Props) {
  return (
    <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
      <Pagination
        page={page}
        count={totalPages}
        onChange={(_, value) => onChange(value)}
        color="primary"
      />
    </Box>
  );
}
