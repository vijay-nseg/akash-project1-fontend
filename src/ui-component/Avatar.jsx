import Avatar from "@mui/material/Avatar";
const AvatarImage = ({ id, ...otherProps }) => {
  const handleClick = () => {
    window.open(otherProps.src, "_blank");
  };
  return <Avatar id={id} {...otherProps} onClick={handleClick} />;
};

export default AvatarImage;
