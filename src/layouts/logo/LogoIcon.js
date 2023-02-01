import React from "react";
import { Link } from "@mui/material";

const LogoIcon = () => {
  return (
    <Link href="/" className="flex">
      <img
        src="/logo.png"
        alt="logo"
        className="h-24"
      />
    </Link>
  );
};

export default LogoIcon;
