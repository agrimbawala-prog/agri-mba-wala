import "../globals.css";

export default function AdminLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en" className="h-full"><body className="min-h-full">{children}</body></html>;
}
