"use client";
import * as ToastPrimitives from "@radix-ui/react-toast";
import * as React from "react";
import CloseIcon from "@mui/icons-material/Close";
import styles from "./toast.module.css"; // Import CSS Module

function classNames(...classes: (string | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}

// Định nghĩa kiểu cho các biến thể
type ToastVariant = "default" | "success" | "warning" | "error" | "primary";

// Định nghĩa các thuộc tính cho Toast
interface ToastProps
  extends React.ComponentPropsWithoutRef<typeof ToastPrimitives.Root> {
  variant?: ToastVariant;
  title?: string;
  description?: string;
}

const ToastProvider = ToastPrimitives.Provider;

const ToastViewport = React.forwardRef<
  HTMLOListElement,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Viewport>
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Viewport
    ref={ref}
    className={classNames(styles.toastViewport, className)}
    {...props}
  />
));
ToastViewport.displayName = ToastPrimitives.Viewport.displayName;

const Toast = React.forwardRef<HTMLLIElement, ToastProps>(
  ({ className, variant = "default", title, description, ...props }, ref) => {
    const toastClass = classNames(
      styles.toast,
      styles[`toast${variant.charAt(0).toUpperCase() + variant.slice(1)}`],
      className
    );
    return (
      <ToastPrimitives.Root ref={ref} className={toastClass} {...props}>
        {title && <ToastTitle>{title}</ToastTitle>}
        {description && <ToastDescription>{description}</ToastDescription>}
      </ToastPrimitives.Root>
    );
  }
);
Toast.displayName = ToastPrimitives.Root.displayName;

const ToastAction = React.forwardRef<
  HTMLButtonElement,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Action>
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Action
    ref={ref}
    className={classNames(styles.toastAction, className)}
    {...props}
  />
));
ToastAction.displayName = ToastPrimitives.Action.displayName;

const ToastClose = React.forwardRef<
  HTMLButtonElement,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Close>
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Close
    ref={ref}
    className={classNames(styles.toastClose, className)}
    {...props}
  >
    <CloseIcon />
  </ToastPrimitives.Close>
));
ToastClose.displayName = ToastPrimitives.Close.displayName;

const ToastTitle = React.forwardRef<
  HTMLHeadingElement,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Title>
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Title
    ref={ref}
    className={classNames(styles.toastTitle, className)}
    {...props}
  />
));
ToastTitle.displayName = ToastPrimitives.Title.displayName;

const ToastDescription = React.forwardRef<
  HTMLParagraphElement,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Description>
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Description
    ref={ref}
    className={classNames(styles.toastDescription, className)}
    {...props}
  />
));
ToastDescription.displayName = ToastPrimitives.Description.displayName;

export {
  ToastProvider,
  ToastViewport,
  Toast,
  ToastTitle,
  ToastDescription,
  ToastClose,
  ToastAction,
};
