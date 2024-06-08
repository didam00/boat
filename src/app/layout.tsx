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
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0" />
      </head>
      <body>
        <Header />
        {children}
      </body>
    </html>
  );
}
