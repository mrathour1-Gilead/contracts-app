import { Layout } from "antd";
import { memo } from "react";

const { Header } = Layout;

const Navbar = memo(() => {
  return (
    <Header
      style={{
        position: "sticky",
        top: 0,
        zIndex: 100,
        height: "5.5rem",
        padding: "0 32px",
        display: "flex",
        alignItems: "center",
        background: "linear-gradient(90deg, #08306b, #08306b)", // optional
        boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
      }}
    >
      {/* Logo */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 12,
        }}
      >
        <img
          src="/png/whiteLogoTagline.png"
          alt="Gilead Logo"
          height={40}
        />
      </div>

      {/* Right actions placeholder */}
      <div style={{ marginLeft: "auto" }}>
        {/* future buttons / user menu */}
      </div>
    </Header>
  );
});

export default Navbar;
