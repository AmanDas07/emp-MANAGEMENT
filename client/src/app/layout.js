import Head from "next/head";

import { UserProvider } from "../../context/page";
import Header from "./Pages/Components/Header";

export default function RootLayout({ children, title = "EMS" }) {
  return (
    <>
      <html>
        <UserProvider>
          <Head>
            <title>{title}</title>

          </Head>
          <body>
            <Header />
            <main style={{ minHeight: "88vh", backgroundColor: "#D2B48C" }}>{children}</main>
          </body>
        </UserProvider>
      </html>
    </>
  );
}
