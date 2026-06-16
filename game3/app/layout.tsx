import type { Metadata } from "next";
import "@/app/globals.css";

export const metadata: Metadata = {
  title: "ALPHA INSECURE 1.0",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
