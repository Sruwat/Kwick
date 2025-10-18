import React from "react";
import { Toaster as Sonner } from "sonner";
import type { ToasterProps as SonnerToasterProps } from "sonner";

const Toaster = (props: React.ComponentProps<typeof Sonner>) => {
  return (
    <Sonner
      theme="light"
      className="toaster group"
      {...props}
    />
  );
};

export { Toaster };
