import './globals.css'
import ResponsiveAppBar from "@/app/Nav";

export const metadata = {
  title: '考研信息查询系统',
  description: '这是一个考研相关信息的查询系统',
}

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: 1,
  // Also supported by less commonly used
  // interactiveWidget: 'resizes-visual',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
      <ResponsiveAppBar/>
      {children}
      </body>
    </html>
  )
}
