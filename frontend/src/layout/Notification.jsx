import {
  forwardRef,
  memo,
  useImperativeHandle,
  useState,
  useEffect,
} from "react";
import { Icon } from "@iconify/react";
import Snackbar from "@mui/joy/Snackbar";
import { IconButton } from "@mui/joy";

type NotificationProps = {
  children?: React.ReactNode;
  variant?: any;
  duration?: number;
  color?: any;
  size?: any;
  onClickCB?: () => void;
};

const Notification = memo(
  forwardRef((props: NotificationProps, ref) => {
    const { duration = 5000 } = props;

    const [open, setOpen] = useState(false);
    const [color, setColor] = useState<any>("success");
    const [icon, setIcon] = useState<any>("solar:danger-triangle-linear");
    const [msg, setMsg] = useState("");
    const [desc, setDesc] = useState("");

    useEffect(() => {
      const handler = (e: any) => {
        setMsg(e?.detail?.message);
        setDesc(e?.detail?.description);

        let color = "success";
        let icon = "mdi:success-circle-outline";

        if (e?.detail?.type === "error") {
          color = "danger";
          icon = "solar:danger-triangle-linear";
        } else if (e?.detail?.type === "success") {
          color = "success";
          icon = "mdi:success-circle-outline";
        } else if (e?.detail?.type === "warning") {
          color = "warning";
          icon = "mingcute:warning-line";
        }
        setIcon(icon);
        setColor(color);
        setOpen(true);
      };

      document.addEventListener("api-response-handler", handler);
      return () =>
        document.removeEventListener("api-response-handler", handler);
    }, []);

    useImperativeHandle(ref, () => ({}));

    return (
      <Snackbar
        className="!px-3 !py-3"
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        variant="soft"
        color={color}
        autoHideDuration={duration}
        open={open}
        onClose={() => setOpen(false)}
      >
        <div className="flex items-center gap-4 w-[100%]">
          <div>
            <Icon
              className="cursor-pointer"
              width={24}
              height={24}
              icon={icon}
            />
          </div>
          <div className="flex flex-col flex-grow ">
            <div className="text-base font-semibold">{msg}</div>
            <div className="text-sm -mt-1">{desc}</div>
          </div>
          <div>
            <IconButton variant="soft" color={color} onClick={() => setOpen(false)}>
              <Icon
                className="cursor-pointer"
                width={24}
                height={24}
                icon="mdi:close-circle-outline"
              />
            </IconButton>
          </div>
        </div>
      </Snackbar>
    );
  })
);

export default Notification;
