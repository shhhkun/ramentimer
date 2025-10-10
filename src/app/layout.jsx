import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

export const metadata = {
  title: "Ramen Timer",
  description: "Cooking timer for your ramen.",
  openGraph: {
    title: "Ramen Timer",
    description: "Cooking timer for your ramen.",
    url: "https://ramentimer.vercel.app/",
    type: "website",
    images: [
      {
        url: "https://ramentimer.vercel.app/og-image.png",
        width: 1200,
        height: 630,
        alt: "Ramen Timer Preview",
      },
    ],
  },
};

const Layout = ({ children }) => {
  return (
    <html lang="en">
      <body>
        <Analytics />

        <div
          className="flex justify-center w-screen"
          style={{
            backgroundColor: "var(--bg)",
          }}
        >
          <div
            className="w-full max-w-sm sm:max-w-md lg:max-w-xl rounded-xl
            pb-8 pr-6 pl-6
            sm:pb-10 sm:pr-8 sm:pl-8
            lg:pb-12 lg:pr-10 lg:pl-10"
            style={{
              backgroundColor: "var(--cardbg)",
            }}
          >
            <h1 className="text-3xl sm:text-4xl lg:text-5xl py-2 sm:py-4 lg:py-6 text-center font-bold">
              Ramen Timer
            </h1>

            {/* 2x3 ramen cards grid */}
            <div
              className="w-full h-123 sm:h-140 lg:h-181 rounded-xl"
              style={{
                backgroundColor: "var(--cardbg)",
                backgroundImage:
                  "url('/4.png'), url('/3.png'), url('/2.png'), url('/1.png')",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
                backgroundSize: "auto 100%, auto 100%, auto 100%, auto 100%",
                imageRendering: "pixelated",
              }}
            >
              {children}
            </div>
          </div>
        </div>
      </body>
    </html>
  );
};

export default Layout;
