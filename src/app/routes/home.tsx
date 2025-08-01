import { useEffect, useState } from "react";

import { Box, useTheme } from "@mui/material";

import SavedArticleModal from "~/components/saved/saved-article-modal";
import Scroller from "~/components/scroller/scroller";
import ScrollerActionBar from "~/components/scroller/scroller-action-bar";

import { initialiseDevice } from "~/features/ui/uiSlice";
import { useAppDispatch, useAppSelector } from "~/hooks/useStore";

import { type JSX } from "react";
import type { Route } from "./+types/home";

// eslint-disable-next-line no-empty-pattern
export function meta({}: Route.MetaArgs) {
  return [
    { title: "Reelpedia" },
    { name: "description", content: "Doomscroll your way to enlightenment!" },
  ];
}

/**
 * Homepage which houses the scroller related content
 * @returns
 */
export default function Home(): JSX.Element {
  const device = useAppSelector((state) => state.ui.device);
  const dispatch = useAppDispatch();

  const theme = useTheme();

  const [modalActive, setModalActive] = useState<Record<string, boolean>>({
    savedArticleModal: false,
  });

  useEffect(() => {
    // http://detectmobilebrowsers.com/
    const deviceType: string = ((a) => {
      if (
        /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(
          a,
        ) ||
        /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw-(n|u)|c55\/|capi|ccwa|cdm-|cell|chtm|cldc|cmd-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc-s|devi|dica|dmob|do(c|p)o|ds(12|-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(-|_)|g1 u|g560|gene|gf-5|g-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd-(m|p|t)|hei-|hi(pt|ta)|hp( i|ip)|hs-c|ht(c(-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i-(20|go|ma)|i230|iac( |-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|-[a-w])|libw|lynx|m1-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|-([1-8]|c))|phil|pire|pl(ay|uc)|pn-2|po(ck|rt|se)|prox|psio|pt-g|qa-a|qc(07|12|21|32|60|-[2-7]|i-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h-|oo|p-)|sdk\/|se(c(-|0|1)|47|mc|nd|ri)|sgh-|shar|sie(-|m)|sk-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h-|v-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl-|tdg-|tel(i|m)|tim-|t-mo|to(pl|sh)|ts(70|m-|m3|m5)|tx-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas-|your|zeto|zte-/i.test(
          a.substr(0, 4),
        )
      ) {
        return "mobile";
      } else {
        return "desktop";
      }
    })(navigator.userAgent || navigator.vendor);

    dispatch(
      initialiseDevice({
        type: deviceType,
        height: window.innerHeight,
      }),
    );
  }, []);

  return (
    <Box
      component="section"
      sx={{
        // Generally bad practice to depend on window.innerHeight, however,
        // this is probably the best way to compensate for mobile browsers.
        height: device.type == "desktop" ? "100vh" : device.height + "px",
        display: "flex",
        flexDirection: "row-reverse",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: theme.palette.background.default,
      }}
    >
      <ScrollerActionBar
        sx={{
          "@media screen and (orientation: portrait)": {
            position: "absolute",
            top: 0,
            right: 0,
            zIndex: 1,
          },
        }}
        setModalActive={setModalActive}
      />

      <Box
        sx={{
          height: "100%",
          width: "100%",
          overflow: "hidden",

          "@media screen and (orientation: landscape)": {
            height: "calc(100vh - 96px)",
            width: "calc((100vh - 96px) * 0.5625)",
            borderRadius: 4,
          },
        }}
      >
        <Scroller />
      </Box>

      <SavedArticleModal
        open={modalActive.savedArticleModal}
        setModalActive={setModalActive}
      />
    </Box>
  );
}
