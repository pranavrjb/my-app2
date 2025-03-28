import React from "react";
import { Box, Typography, Grid, useTheme } from "@mui/material";
import { Image as ImageIcon } from "@mui/icons-material";

const BusinessImages = ({ formData, handleImageChange, imagePreview }) => {
  const theme = useTheme();

  return (
    <Box>
      <Typography
        variant="h6"
        sx={{
          mb: 2,
          color: theme.palette.mode === "dark" ? "white" : "#1a1a1a",
        }}
      >
        Business Images
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Box
            sx={{
              border: `2px dashed ${
                theme.palette.mode === "dark"
                  ? "rgba(255,255,255,0.2)"
                  : "rgba(0,0,0,0.2)"
              }`,
              borderRadius: 2,
              p: 3,
              textAlign: "center",
              cursor: "pointer",
              "&:hover": {
                borderColor: theme.palette.primary.main,
              },
            }}
          >
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              style={{ display: "none" }}
              id="business-logo-upload"
            />
            <label htmlFor="business-logo-upload">
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: 1,
                }}
              >
                <ImageIcon
                  sx={{
                    fontSize: 40,
                    color:
                      theme.palette.mode === "dark" ? "#b3b3b3" : "#666666",
                  }}
                />
                <Typography
                  variant="body2"
                  sx={{
                    color:
                      theme.palette.mode === "dark" ? "#b3b3b3" : "#666666",
                  }}
                >
                  Click to upload business logo
                </Typography>
              </Box>
            </label>
          </Box>
          {imagePreview && (
            <Box
              component="img"
              src={imagePreview}
              alt="Logo Preview"
              sx={{
                mt: 2,
                maxWidth: "100%",
                maxHeight: 200,
                borderRadius: 1,
              }}
            />
          )}
        </Grid>
      </Grid>
    </Box>
  );
};

export default BusinessImages;
