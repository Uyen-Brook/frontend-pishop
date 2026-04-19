import React from "react";
import Header from "../components/layout/custommer/header/Header";
import Footer from "../components/layout/custommer/footer/Footer";

export default function UserLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <main className="main-content pt-16"  >{children}</main>
      <Footer />
    </>
  );
}