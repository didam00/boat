import Header from "@/components/Header";
import "@/styles/_globals.scss";

export const metadata = {
  title: "boat"
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body>
        <Header />
        {children}
      </body>
    </html>
  );
}
