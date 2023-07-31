import { InjectionMode, resetIds, Stylesheet } from '@fluentui/react'
import Document, {
  DocumentContext,
  Head,
  Html,
  Main,
  NextScript,
} from 'next/document'
import { ServerStyleSheet } from 'styled-components'

const stylesheet = Stylesheet.getInstance()

stylesheet.setConfig({
  injectionMode: InjectionMode.none,
  namespace: 'server',
})

export default class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    stylesheet.reset()
    resetIds()
    const sheet = new ServerStyleSheet()
    const originalRenderPage = ctx.renderPage

    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: (App: any) => (props: any) =>
            sheet.collectStyles(<App {...props} />),
        })

      const initialProps = await Document.getInitialProps(ctx)
      const styleTags = stylesheet.getRules(true)

      return {
        ...initialProps,
        styles: (
          <>
            {initialProps.styles}
            <style
              type="text/css"
              dangerouslySetInnerHTML={{ __html: styleTags }}
            />
            {sheet.getStyleElement()}
          </>
        ),
        serializedStylesheet: stylesheet.serialize(),
      }
    } finally {
      sheet.seal()
    }
  }

  render() {
    const { serializedStylesheet } = this.props as any
    return (
      <Html>
        <Head>
          <script
            type="text/javascript"
            dangerouslySetInnerHTML={{
              __html: `
                window.FabricConfig = window.FabricConfig || {};
                window.FabricConfig.mergeStyles = { namespace: 'client' };
                window.FabricConfig.serializedStylesheet = ${serializedStylesheet};
              `,
            }}
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
