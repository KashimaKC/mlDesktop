import { Html, Head, Main, NextScript } from 'next/document'
import colorpalletes from "../styles/colorpalletes.json"

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body style={{margin: 0, padding: 0, backgroundColor: colorpalletes["dark-blue"], fontFamily: 'Arial', height: 720}}>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
