import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html data-theme="light" lang="en">
      <Head />
      <body className='bg-gradient-radial from-primary to-accent'>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
