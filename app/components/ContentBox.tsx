import { Box, CardMedia, Link, Typography } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";

interface ContentBoxProps {
  name: string;
  description: string;
  image?: string | null;
}

export default function ContentBox({
  name,
  description,
  image,
}: ContentBoxProps) {
  return (
    <Card
      sx={{
        display: "flex",
        flexDirection: "row",
        mb: 3,
        borderRadius: 2,
        boxShadow: 2,
        maxWidth: 600,
        padding: 2,
      }}
    >
      <Box sx={{
        maxWidth: 180,
        maxHeight: 250,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}>
      {image && (
          <CardMedia
          component="img"
          sx={{
              objectFit: "cover",
            }}
            image={image}
            alt={`${name} image`}
            />
        )}
        </Box>

      <CardContent sx={{ flex: 1 }}>
        <Typography variant="h4" sx={{ mb: 1 }}>
          {name}
        </Typography>

        <Typography variant="body1" color="text.primary">
          {description}
        </Typography>
        <Link href="/">Read more</Link>
      </CardContent>
    </Card>
  );
}
