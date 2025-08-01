import { Box, Button, Stack, Typography } from "@mui/material";

import ImageNotSupportedOutlinedIcon from "@mui/icons-material/ImageNotSupportedOutlined";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import { useAppSelector } from "~/hooks/useStore";

export interface Article {
  title: string;
  extract: string;
  image: string | undefined;
}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
interface ArticleCardProps extends Article {}

export default function ArticleCard(props: ArticleCardProps) {
  const device = useAppSelector((state) => state.ui.device);

  return (
    <Box
      sx={{
        // Generally bad practice to depend on window.innerHeight, however,
        // this is probably the best way to compensate for mobile browsers.
        height: device.type == "desktop" ? "100vh" : device.height + "px",
        width: "100%",
        position: "relative",
        scrollSnapAlign: "start",

        "@media screen and (orientation: landscape)": {
          height: "calc(100vh - 96px)",
          width: "calc((100vh - 96px) * 0.5625)",
        },
      }}
    >
      {/* Background image */}
      <Box
        sx={{
          height: "100%",
          width: "100%",
          position: "absolute",
          top: 0,
          left: 0,
          display: "flex",
          justifyContent: "center",
          backgroundPosition: "center",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundImage: `url(${props?.image ? props.image : ""})`,
        }}
      >
        {!props?.image && (
          <ImageNotSupportedOutlinedIcon
            sx={{
              fontSize: "5em",
              my: "25%",
            }}
          />
        )}
      </Box>

      {/* Content banner */}
      <Stack
        sx={{
          height: "100%",
          width: "100%",
          position: "absolute",
          top: 0,
          left: 0,
          justifyContent: "end",
        }}
      >
        <Box
          sx={{
            p: 3,
            backgroundImage:
              "linear-gradient(0deg, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.15))",
            backdropFilter: "blur(4px)",
          }}
        >
          <Typography
            variant="h6"
            sx={{
              mb: 1,
              color: "white",
            }}
          >
            {props.title}
          </Typography>

          <Typography
            variant="body2"
            sx={{
              mb: 2,
              color: "white",
              display: "-webkit-box",
              WebkitLineClamp: "6",
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
            }}
          >
            {props.extract}
          </Typography>

          <Button
            variant="text"
            size="small"
            endIcon={<OpenInNewIcon />}
            sx={{
              color: "white",
              marginLeft: "-5px", // Align the button with the text
            }}
            onClick={() => {
              window
                .open(`https://en.wikipedia.org/wiki/${props.title}`, "_blank")
                ?.focus();
            }}
          >
            Open
          </Button>
        </Box>
      </Stack>
    </Box>
  );
}
