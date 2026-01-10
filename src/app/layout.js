import "./globals.css";
import Providers from "./providers";

export const metadata = {
  title: "Habit Tracker",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
