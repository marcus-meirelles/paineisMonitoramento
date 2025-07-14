import type { Metadata } from "next";
import { ColorSchemeScript, MantineProvider, mantineHtmlProps } from "@mantine/core";
import "./globals.css";
import MantineWrapper from "./components/ui/MantineWrapper";


export const metadata: Metadata = {
     title: "Meu App",
    description: "Meu app", 
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br" {...mantineHtmlProps}>
      <head>
        <ColorSchemeScript />
      </head>
      <body>
        <MantineWrapper>{children}</MantineWrapper>
      </body>
    </html>
  );
}
