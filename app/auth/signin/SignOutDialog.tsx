"use client";

import CloseIcon from "@mui/icons-material/Close";
import WarningAmberRoundedIcon from "@mui/icons-material/WarningAmberRounded";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  Divider,
  Typography,
} from "@mui/material";

type Props = {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
};

export default function ConfirmSignOutDialog({
  open,
  onClose,
  onConfirm,
}: Props) {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth aria-labelledby="logout-dialog-title">
      <Button
        aria-label="close"
        onClick={onClose}
        sx={{ position: "absolute", right: 10, top: 10 }}
      >
        <CloseIcon />
      </Button>

      <DialogContent sx={{ py: 5 }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            mb: 2,
          }}
        >
          <WarningAmberRoundedIcon sx={{ fontSize: 48, color: "#df9d33" }} />
        </Box>
        <Typography textAlign="center" id="logout-dialog-title">
          Are you sure you want to leave BookHive?
        </Typography>

        <Divider sx={{ mt: 3 }} />
      </DialogContent>
      <DialogActions sx={{ justifyContent: "center", pb: 3 }}>
        <Box
          sx={{
            display: "flex",
            gap: 2,
            width: "100%",
            maxWidth: 340,
          }}
        >
          <Button
            aria-label="cancel button"
            variant="text"
            size="medium"
            fullWidth
            onClick={onClose}
          >
            Cancel
          </Button>

          <Button
            aria-label="sign out button"
            variant="contained"
            fullWidth
            onClick={onConfirm}
            sx={{
              backgroundColor: "#992B15",
              color: "#F7EBD5",
            }}
          >
            Yes, Sign Out
          </Button>
        </Box>
      </DialogActions>
    </Dialog>
  );
}
