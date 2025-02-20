import toastr from "toastr";
import "toastr/build/toastr.min.css";

toastr.options = {
  closeButton: true,
  progressBar: true,
  positionClass: "toast-bottom-left",
  timeOut: 3000,
};

const ToastrService = {
  success(msg: string) {
    toastr.success(msg);
  },
  error(msg: string) {
    toastr.error(msg);
  },
  info(msg: string) {
    toastr.info(msg);
  },
  warning(msg: string) {
    toastr.warning(msg);
  },
};

export default ToastrService;
