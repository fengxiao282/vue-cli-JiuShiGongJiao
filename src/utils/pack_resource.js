const PACK_TOOLS = {
    existFonts: new Set(),
    addFont(name, url, format = '') {
        this._addCustomFont(name, url, format)
    },
    _addCustomFont (name, url, format = '') {
        const styles = document.querySelectorAll('style[data-custom-style]')
        let customStyle
        if (styles && styles.length == 1) {
            customStyle = styles[0]
        } else {
            customStyle = document.createElement('style')
            customStyle.dataset.customStyle = ''
        }

        if (this.existFonts.has(name)) {
            return
        } else {
            this.existFonts.add(name)
        }
        
        const yourFontName = name
        const yourFontURL = url
        let yourFontFormat
        if (format) {
            yourFontFormat = ` format(${format})`
        } else {
            yourFontFormat = ''
        }
        customStyle.appendChild(document.createTextNode("\
                @font-face {\
                    font-family: '" + yourFontName + "';\
                    src: url('" + yourFontURL + "')" + yourFontFormat + ";\
                }\
            "))
        document.head.appendChild(customStyle)
    }
}

export default PACK_TOOLS