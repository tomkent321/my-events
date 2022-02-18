import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html>
      <Head />
      <body>
        <Main />
        <NextScript />
        <div id="modal-root"></div>

      </body>
    </Html>
  )
}

// This is from the nextjs docs: custome document to allow access to client side html