import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import {Providers} from "./providers";
import "./globals.css";
import {Link} from "@nextui-org/link";

const inter = Nunito({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "TextVault",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <div className="container mx-auto px-4 min-h-screen flex flex-col">
            <main className="flex-1 mb-4">
              {children}
            </main>
            <footer className="text-center p-4">
              <p className="text-sm">
                Made with ❤️ by <Link color="primary" href="https://github.com/VenkatLohithDasari">Venky</Link>
              </p>
              <p className="text-sm">
                <Link color="primary" href="https://github.com/your-username/your-repo">View the source code on GitHub</Link>
              </p>
            </footer>
          </div>
        </Providers>
      </body>
    </html>
  );
}
