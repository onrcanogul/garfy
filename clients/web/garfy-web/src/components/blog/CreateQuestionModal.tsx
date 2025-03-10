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
  Chip,
  Typography,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import { createQuestion } from "../../services/blog/question-service";
import Question from "../../contracts/blog/question";

interface CreateQuestionModalProps {
  open: boolean;
  handleClose: () => void;
  setQuestions: React.Dispatch<React.SetStateAction<Question[]>>;
}

const CreateQuestionModal: React.FC<CreateQuestionModalProps> = ({
  open,
  handleClose,
  setQuestions,
}) => {
  const [selectedImages, setSelectedImages] = useState<File[]>([]);
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [shortContent, setShortContent] = useState<string>("");

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

  const handleTagAdd = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" && tagInput.trim() !== "") {
      event.preventDefault();
      setTags((prevTags) => [...prevTags, tagInput.trim()]);
      setTagInput("");
    }
  };

  const handleTagDelete = (tagToDelete: string) => {
    setTags((prevTags) => prevTags.filter((tag) => tag !== tagToDelete));
  };

  const handleCreate = async () => {
    const createdQuestion = await createQuestion(
      { title, shortContent, content: description },
      selectedImages
    );
    setQuestions((prev) =>
      [...prev, createdQuestion].sort((a, b) => b.likes - a.likes)
    );
    handleClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
      <DialogTitle>
        Yeni Soru Ekle
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
        <div>
          <TextField
            fullWidth
            label="Başlık"
            name="title"
            margin="normal"
            onChange={(e) => setTitle(e.target.value)}
            value={title}
          />

          <TextField
            fullWidth
            label="Kısa Açıklama"
            name="shortContent"
            margin="normal"
            onChange={(e) => setShortContent(e.target.value)}
            value={shortContent}
          />

          <TextField
            fullWidth
            label="İçerik"
            name="content"
            margin="normal"
            multiline
            rows={4}
            onChange={(e) => setDescription(e.target.value)}
            value={description}
          />

          {/* Tag Ekleme */}
          <Box my={2}>
            <TextField
              fullWidth
              label="Etiket Ekle"
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              onKeyDown={handleTagAdd}
              placeholder="Etiket eklemek için Enter'a basın"
            />
            <Box mt={1}>
              {tags.map((tag, index) => (
                <Chip
                  key={index}
                  label={tag}
                  onDelete={() => handleTagDelete(tag)}
                  sx={{ m: 0.5 }}
                />
              ))}
            </Box>
          </Box>

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
                <AddPhotoAlternateIcon sx={{ fontSize: 48, color: "#aaa" }} />
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
            <Button
              type="submit"
              color="primary"
              variant="contained"
              onClick={handleCreate}
            >
              Gönder
            </Button>
          </DialogActions>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CreateQuestionModal;
