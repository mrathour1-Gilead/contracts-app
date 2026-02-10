// src/layout/MainLayout.jsx
import { Layout } from "antd";
import Navbar from "./Navbar";

const { Content, Footer } = Layout;

export default function MainLayout(props) {
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Navbar />

      <Content style={{ padding: "24px 40px" }}>
       {props.children}
      </Content>

      {/* Footer */}
      <Footer
        style={{
          textAlign: "center",
          background: "#fff",
          borderTop: "1px solid #e8e8e8",
          paddingBottom: 20,
        }}
      >
        <div
          id="gileadLogo"
          aria-label="Gilead logo"
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <h3
            style={{
              color: "#003A8F",
              fontFamily: "serif",
              fontWeight: 600,
              marginBottom: 8,
            }}
          >
            Powered By
          </h3>

          <img
            src="/png/dna_logo.png"
            alt="DNA Logo"
            style={{ height: 35 }}
          />
        </div>
      </Footer>

      {/* <Notification /> */}
    </Layout>
  );
} 