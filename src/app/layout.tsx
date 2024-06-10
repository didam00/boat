import "../models/Questions";
import "../models/Forms";
import "../models/Users";

import Header from "@/components/Header";
import "@/styles/_globals.scss";

export const metadata = {
  title: {
    default: "boat",
    templace: "%s - boat"
  }
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <head>
      <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" />
      </head>
      <body>
        <Header />
        {children}
      </body>
    </html>
  );
}
