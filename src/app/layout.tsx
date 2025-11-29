import type { Metadata } from "next";
import { Geist_Mono } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import Header from "@/components/Header";
import AuthWrapper from "@/components/AuthWrapper";
import ForgotPassword from "@/components/Dialogs/ForgotPassword";
import LoginInDialog from "@/components/Dialogs/LoginDialog";
import RegisterDialog from "@/components/Dialogs/RegisterDialog";
import LogoutDialog from "@/components/Dialogs/LogOutDialog";
import VerifyDialog from "@/components/Dialogs/VerifyDialog";



// SF Pro Display font configuration
const sfProDisplay = localFont({
  src: [
    {
      path: "../../public/assets/SFPro/SFProDisplay-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/assets/SFPro/SFProDisplay-Medium.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "../../public/assets/SFPro/SFProDisplay-Bold.woff2",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-sf-pro-display",
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Dreamshot AI: The All-in-One Image & Video Creation Platform",
  description:
    "Dreamshot AI is your all-in-one platform for creating images and videos. Easily produce studio-quality visuals with smart, powerful AI tools.",
  alternates: {
    canonical: "https://www.dreamshot.art/",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${sfProDisplay.variable} ${geistMono.variable} antialiased`}
      >
        <AuthWrapper type="public">

          <ForgotPassword />
          <RegisterDialog />
          <LoginInDialog />
          <LogoutDialog />
          <VerifyDialog />
          <Header />
          {children}
        </AuthWrapper>
      </body>
    </html>
  );
}
