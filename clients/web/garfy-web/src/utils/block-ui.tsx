import { Backdrop, Box, CircularProgress, Typography } from "@mui/material";

interface BlockUIProps {
  open: any;
  message: string;
}
const BlockUI = (props: BlockUIProps) => {
  return (
    <Backdrop
      sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.modal + 1 }}
      open={props.open}
    >
      <Box textAlign="center">
        <CircularProgress color="inherit" />
        <Typography mt={2}>{props.message}</Typography>
      </Box>
    </Backdrop>
  );
};

export default BlockUI;
