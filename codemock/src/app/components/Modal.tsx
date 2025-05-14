import React, { ReactNode } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

interface CustomModalProps {
  open: boolean;
  title?: string;
  onClose: () => void;
  children: ReactNode;
}

export default function CustomModal({
  open,
  title = "Modal Title",
  children,
  onClose,
}: CustomModalProps) {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="lg">
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        {title && <DialogTitle>{title}</DialogTitle>}
        <Button onClick={onClose}>
          <CloseIcon />
        </Button>
      </div>

      <DialogContent dividers>{children}</DialogContent>
    </Dialog>
  );
}
