let showToast:
  | ((options: {
      title: string;
      description: string;
      variant?: string;
    }) => void)
  | null = null;

export const toastService = {
  setHandler(handler: typeof showToast) {
    showToast = handler;
  },
  show(options: { title: string; description: string; variant?: string }) {
    if (showToast) {
      showToast(options);
    } else {
      console.warn("Toast handler chưa được khởi tạo");
    }
  },
};
