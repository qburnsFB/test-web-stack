import Document, { Html, Head, Main, NextScript } from 'next/document';

class CustomDocument extends Document {
    render() {
        return (
            <Html>
                <Head>
                    <link rel="preconnect" href="https://fonts.googleapis.com" />
                        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
                            <link
                                href="https://fonts.googleapis.com/css2?family=Source+Sans+Pro:wght@300;600&display=swap"
                                rel="stylesheet" />
                    <link href='https://api.mapbox.com/mapbox-gl-js/v2.3.1/mapbox-gl.css' rel='stylesheet' />

                </Head>
                <body>
                <Main />
                <NextScript />
                <div id="modal"/>
                </body>
            </Html>
        )
    }
}

export default CustomDocument;