import React from "react";
import Header from "../components/layout/custommer/Header";
import Footer from "../components/layout/custommer/Footer";

export default function UserLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <style>{`
        .main-content {
          padding-top: 64px;
        }
      `}</style>
      <Header />
      <main className="main-content pt-16"  >{children}</main>
      <Footer />
    </>
  );
}