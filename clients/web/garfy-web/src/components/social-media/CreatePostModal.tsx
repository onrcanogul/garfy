import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Box,
  Grid,
  Card,
  CardMedia,
  Typography,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import { Formik, Field, Form } from "formik";
import * as Yup from "yup";

interface CreatePostModalProps {
  open: boolean;
  handleClose: () => void;
  onSubmit: (values: any) => void;
}

const CreatePostModal: React.FC<CreatePostModalProps> = ({
  open,
  handleClose,
  onSubmit,
}) => {
  const [selectedImages, setSelectedImages] = useState<File[]>([]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files);
      setSelectedImages((prevImages) => [...prevImages, ...filesArray]);
    }
  };

  const removeImage = (index: number) => {
    const newImages = [...selectedImages];
    newImages.splice(index, 1);
    setSelectedImages(newImages);
  };

  // Formik için Validation Schema
  const validationSchema = Yup.object({
    title: Yup.string().required("Başlık gerekli"),
    description: Yup.string().required("Açıklama gerekli"),
  });

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
      <DialogTitle>
        Yeni Gönderi Ekle
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent dividers>
        <Formik
          initialValues={{
            title: "",
            description: "",
          }}
          validationSchema={validationSchema}
          onSubmit={(values) => {
            const postData = {
              ...values,
              imageUrls: selectedImages.map((file) =>
                URL.createObjectURL(file)
              ),
            };
            onSubmit(postData);
            handleClose();
          }}
        >
          {({ errors, touched }) => (
            <Form>
              <Field
                as={TextField}
                fullWidth
                label="Başlık"
                name="title"
                margin="normal"
                error={touched.title && Boolean(errors.title)}
                helperText={touched.title && errors.title}
              />

              <Field
                as={TextField}
                fullWidth
                label="Açıklama"
                name="description"
                margin="normal"
                multiline
                rows={4}
                error={touched.description && Boolean(errors.description)}
                helperText={touched.description && errors.description}
              />

              {/* Resim Seçimi ve Küçük Kareler Halinde Gösterim */}
              <Box my={2}>
                <Box
                  sx={{
                    border: "2px dashed #ccc",
                    borderRadius: 2,
                    p: 3,
                    textAlign: "center",
                    cursor: "pointer",
                  }}
                >
                  <label htmlFor="image-upload" style={{ cursor: "pointer" }}>
                    <AddPhotoAlternateIcon
                      sx={{ fontSize: 48, color: "#aaa" }}
                    />
                    <Typography>Resim Ekle</Typography>
                    <input
                      id="image-upload"
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={handleImageChange}
                      style={{ display: "none" }}
                    />
                  </label>
                </Box>

                <Grid container spacing={2} sx={{ mt: 2 }}>
                  {selectedImages.map((image, index) => (
                    <Grid item xs={4} key={index}>
                      <Card sx={{ position: "relative" }}>
                        <CardMedia
                          component="img"
                          image={URL.createObjectURL(image)}
                          alt={`resim-${index}`}
                          sx={{
                            width: "100%",
                            height: "100px",
                            objectFit: "cover",
                            borderRadius: 1,
                          }}
                        />
                        <IconButton
                          onClick={() => removeImage(index)}
                          sx={{
                            position: "absolute",
                            top: 4,
                            right: 4,
                            backgroundColor: "rgba(255, 255, 255, 0.7)",
                          }}
                        >
                          <CloseIcon />
                        </IconButton>
                      </Card>
                    </Grid>
                  ))}
                </Grid>
              </Box>

              <DialogActions>
                <Button onClick={handleClose} color="error" variant="outlined">
                  İptal
                </Button>
                <Button type="submit" color="primary" variant="contained">
                  Gönder
                </Button>
              </DialogActions>
            </Form>
          )}
        </Formik>
      </DialogContent>
    </Dialog>
  );
};

export default CreatePostModal;
