import '@/app/styles/app.scss'
import Header from './header'
import { ContextProvider } from '@/components/Clients'

export const metadata = {
  title: 'Todo App',
  description: 'This is a Todo App Project made using Next.js',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ContextProvider>
          <>
            <Header />
            {children}
          </>
        </ContextProvider>
      </body>
    </html>
  )
}
