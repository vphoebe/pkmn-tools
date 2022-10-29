import "../styles/globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <title>dual-type-chart</title>
      </head>
      <body>{children}</body>
    </html>
  );
}
