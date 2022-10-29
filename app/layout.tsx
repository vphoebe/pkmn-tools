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
      <body className="bg-slate-300">{children}</body>
    </html>
  );
}
