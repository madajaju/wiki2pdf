var Promise = require("bluebird"),
    helpers = require('./helpers'),
    fs = require('fs-extra'),
    logger = require('./logger'),
    pdf = require('html-pdf'),
    BaseWriter = require('./base-writer')

class PdfWriter extends BaseWriter {

    getExtension() {
        return 'pdf'
    }

    getPageBreaker(pageTitle, pageId) {
        return `<h1 id="${pageId}" style="page-break-before: always !important;">${pageTitle}</h1>`
    }

    write() {

        var html = this.buildHeader(),
            pages = this.converter.getPages(),
            filename = this.getFilename(),
            footer = this.converter.getOption('footer'),
            self = this;

        logger.debug('Generating pdf: %d pages to generate', pages.length);

        pages.forEach(page => {
            var pageId = helpers.getPageIdFromFilenameOrLink(page.file);
            var pdfPage = this.getPageBreaker(page.title, pageId) + page.html;
            html += pdfPage;
        }, this);
        if(footer) {
            html += fs.readFileSync(footer, 'utf8');
        }
        html += this.buildFooter();

        return new Promise(function (resolve, reject) {
            let options = {
                "height": "11in",        // allowed units: mm, cm, in, px
                "width": "8.5in",
                orientation: "portrait",
                footer: {
                    height: "1in"
                },
                "border": {
                    "top": "0in",            // default is 0, units: mm, cm, in, px
                    "right": "1in",
                    "bottom": "0in",
                    "left": "1in"
                }
            }

            pdf.create(html, options).toFile(filename, function (err, res) {
                if (err) return console.log(err);
                console.log(res); // { filename: '/app/businesscard.pdf' }
                resolve(filename);
            });
        });
    }

    buildHeader() {
        var htmlHeader = `<!DOCTYPE html> <html lang="en"> <head> <meta charset="utf-8"> <meta http-equiv="X-UA-Compatible" content="IE=edge"> <meta name="viewport" content="width=device-width, initial-scale=1"> <title>${this.converter.getOption('title')}</title> ${this.getCssTags()} <style>${this.getExtraCss()}</style> ${this.getJsTags()} </head> <body id="page-top" class="pdf-doc"> <!-- Cover page --> ${this.getLogoImage()} <div class='covertitle'> <b>${this.converter.getOption('title')}</b> </div> <!-- Cover page --> <div class='nav-container'> <h1 class='toc'></h1> ${this.converter.getToc().getHtml()} </div> `
        return htmlHeader;
    }


    buildFooter() {
        var footer = ` </body> </html>` ;
        return footer;
    }

    createImageLogoTag(path) {
        return `<img class="coverimg" src="${path}"/>`
    }
}

module.exports = PdfWriter
