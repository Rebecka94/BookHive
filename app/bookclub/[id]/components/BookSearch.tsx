"use client";

import CloseIcon from "@mui/icons-material/Close";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import {
  Avatar,
  Box,
  Chip,
  CircularProgress,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";

type OpenLibraryDoc = {
  key: string;
  title: string;
  author_name?: string[];
  cover_i?: number;
  first_publish_year?: number;
};

interface Book {
  id: string;
  title: string;
  author?: string;
  cover_url?: string;
  first_publish_year?: number;
}

interface Props {
  onSelectBook: (book: Book | null) => void;
  selectedBook: Book | null;
}

export default function BookSearch({ onSelectBook, selectedBook }: Props) {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<Book[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showResults, setShowResults] = useState(false);

  useEffect(() => {
    const timer = setTimeout(async () => {
      if (searchQuery.trim().length < 2) {
        setSearchResults([]);
        setShowResults(false);
        return;
      }

      setIsSearching(true);

      try {
        const response = await fetch(
          `https://openlibrary.org/search.json?q=${encodeURIComponent(
            searchQuery
          )}&limit=5`
        );

        const data = await response.json();

        const books: Book[] =
          (data.docs as OpenLibraryDoc[])
            ?.filter((doc) => doc.title)
            .map((doc) => ({
              id: doc.key.replace("/works/", ""),
              title: doc.title,
              author: doc.author_name?.[0] ?? "Unknown author",
              cover_url: doc.cover_i
                ? `https://covers.openlibrary.org/b/id/${doc.cover_i}-M.jpg`
                : undefined,
              first_publish_year: doc.first_publish_year,
            })) || [];

        setSearchResults(books);
        setShowResults(true);
      } catch (error) {
        console.error("Error searching books:", error);
        setSearchResults([]);
      } finally {
        setIsSearching(false);
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  const handleSelectBook = (book: Book) => {
    onSelectBook(book);
    setSearchQuery("");
    setSearchResults([]);
    setShowResults(false);
  };

  return (
    <Box sx={{ mb: 2 }}>

      {selectedBook ? (
        <Paper
          sx={{
            p: 2,
            display: "flex",
            alignItems: "center",
            gap: 2,
            backgroundColor: "#e8f5e9",
            border: "2px solid #4caf50",
          }}
        >
          {selectedBook.cover_url ? (
            <Avatar
              src={selectedBook.cover_url}
              variant="rounded"
              sx={{ width: 60, height: 80 }}
            />
          ) : (
            <Avatar
              variant="rounded"
              sx={{ width: 60, height: 80, backgroundColor: "#ddd" }}
            >
              <MenuBookIcon />
            </Avatar>
          )}

          <Box sx={{ flex: 1 }}>
            <Typography variant="body1" sx={{ fontWeight: 600 }}>
              {selectedBook.title}
            </Typography>
            <Typography variant="body2">{selectedBook.author}</Typography>
            {selectedBook.first_publish_year && (
              <Chip
                label={selectedBook.first_publish_year}
                size="small"
                sx={{ mt: 0.5 }}
              />
            )}
          </Box>

          <IconButton onClick={() => onSelectBook(null)} color="error">
            <CloseIcon />
          </IconButton>
        </Paper>
      ) : (
        <Box sx={{ position: "relative" }}>
          <TextField
          id="book-search"
            label="Link a book to this post (optional) 📚"
            fullWidth
            size="small"
            placeholder="Search for a book..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            variant="outlined"
            InputProps={{
              startAdornment: <MenuBookIcon sx={{ mr: 1 }} />,
              endAdornment: isSearching && <CircularProgress size={20} />,
            }}
          />

          {showResults && (
            <Paper
              sx={{
                position: "absolute",
                top: "100%",
                left: 0,
                right: 0,
                zIndex: 10,
                mt: 1,
                maxHeight: 320,
                overflow: "auto",
              }}
              elevation={3}
            >
              {searchResults.length > 0 ? (
                <List disablePadding>
                  {searchResults.map((book) => (
                    <ListItem
                      key={book.id}
                      component="button"
                      onClick={() => handleSelectBook(book)}
                      sx={{
                        cursor: "pointer",
                        "&:hover": {
                          backgroundColor: "#f5f5f5",
                        },
                        borderBottom: "1px solid #eee",
                      }}
                    >
                      <ListItemAvatar>
                        <Avatar src={book.cover_url} variant="rounded">
                          <MenuBookIcon />
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        primary={
                          <Typography variant="body1">{book.title}</Typography>
                        }
                        secondary={
                          <Typography
                            variant="body2"
                            sx={{
                              color: "text.primary",
                              fontStyle: "italic",
                            }}
                          >
                            {book.author}
                            {book.first_publish_year &&
                              ` (${book.first_publish_year})`}
                          </Typography>
                        }
                      />
                    </ListItem>
                  ))}
                </List>
              ) : (
                <Box
                  sx={{
                    p: 2,
                    textAlign: "center",
                  }}
                >
                  <Typography variant="body2">No books found</Typography>
                </Box>
              )}
            </Paper>
          )}
        </Box>
      )}
    </Box>
  );
}
