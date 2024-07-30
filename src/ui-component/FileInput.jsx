import { useState, useEffect } from "react";
import { Button } from "@mui/material";
import { Box } from "@mui/system";

const FileInput = ({
  url,
  handleChange,
  fileName,
  label,
  error,
  helperText,
  index = 0, // Default value for index
} = url) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);

  useEffect(() => {
    if (selectedImage) {
      setImageUrl(URL.createObjectURL(selectedImage));
    }
  }, [selectedImage]);
 
  return (
    <>
      <input
        accept="image/*"
        type="file"
        id={index > 0 ? `${fileName}-${index}` : fileName} // Use index to create unique IDs
        style={{ display: "none" }}
        onChange={(e) => {
          setSelectedImage(e.target.files[0]);
          handleChange(index, e.target);
        }}
      />
      <label htmlFor={index > 0 ? `${fileName}-${index}` : fileName}>
        <Button variant="contained" color="secondary" component="span">
          {label}
        </Button>
      </label>
      <br />
      <p sx={{mt: 4}} className="MuiFormHelperText-root Mui-error MuiFormHelperText-sizeMedium MuiFormHelperText-contained css-1fa9p8i-MuiFormHelperText-root">
        {error ? helperText : ""}
      </p>
      {imageUrl && selectedImage && (
        <Box mt={2} textAlign="center">
          <div>{fileName}</div>
          <img
            src={imageUrl}
            alt={selectedImage.name}
            height="100px" 
          />
        </Box>
      )}
      {url && !(imageUrl && selectedImage) && (
        <Box mt={2} textAlign="center">
          <div>Image Preview:</div>
          <img src={url} alt="image" height="100px"/>
        </Box>
      )}
    </>
  );
};

export default FileInput;
