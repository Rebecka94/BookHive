import { Box, Typography } from "@mui/material";
import Link from "next/link";
import Image from "next/image";

export default function Header() {
  return (
    <header>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        maxWidth="1200px"
        mx="auto"
        py={2}
        px={3}
      >
        <Link href="/">
          <Image src="/bookhive-logo.png" alt="BookHive Logo" width={150} height={50} />
        </Link>

        <Box component="nav" display="flex" gap={4}>
          <Link href="/">
            <Typography variant="body1" color="text.secondary">About</Typography>
          </Link>
          <Link href="/">
            <Typography variant="body1" color="text.secondary">Community</Typography>
          </Link>
          <Link href="/">
            <Typography variant="body1" color="text.secondary">Browse</Typography>
          </Link>
        </Box>
      </Box>
    </header>
  );
}
