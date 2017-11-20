# Github Wiki to pdf Converter

Github Wiki to pdf Converter allows you to generate HTML & PDF documentation from your Github wiki or any other 
markdown-based wiki. It is build on top of [Limedocs Wiki Converter](https://github.com/limedocs/limedocs-wiki-converter)
and [html to pdf](https://github.com/marcbachmann/node-html-pdf) and contains new features and bug fixes, 
check the [release notes](https://github.com/madajaju/wiki2pdf/releases) to see them.

# Prerequesites

- [Node.js](https://nodejs.org/) or [io.js](https://iojs.org/en/index.html)

# Installation

```bash
npm install -g wiki2pdf
```

# Usage

## Basic usage

```bash
# Clone your github wiki for example
git clone https://github.com/madajaju/wiki2pdf.wiki.git

# Convert your wiki
wiki2pdf ./wiki2pdf.wiki
```

## Usage help
```
  Usage: wiki2pdf [options] <wiki-dir>

  Convert a wiki

  Options:

    -h, --help                   output usage information
    -V, --version                output the version number
    -f, --format <format>        Format to convert to. Either html, pdf, or all [default: html]
    -o, --output <output-dir>    Output dir [default: './']
    -t, --title <title>          Wiki title [default: Documentation]
    -d, --disable-inline-assets  Disable inlining of images, css and js in html document
    --logo-img <logo-file>       Logo image file
    --footer <footer>            PDF header and footers (format in HTML)
    --toc <toc-file>             Wiki TOC file
    --toc-level <level>          Table of contents deep level [default: 3]
    --highlight-theme <theme>    Highlighter theme [default: github]
    --css <css-file>             Additional CSS file
    --pdf-page-count             Enable PDF page count
    -v --verbose                 Verbose mode
```


# Formats

## HTML

### Pages to be included in the documentation

By default, *Github Wiki to pdf Converter* will check for the following files to use as a table of contents (TOC):

- `_Toc.md`
- `_Sidebar.md` (which is the default sidebar file on Github wikis)

When finding a TOC, *wiki2pdf* will only generate pages linked from this TOC. Supported link formats are:

- Markdown links with local path `[Call Log](Call-Log)` / `[Log](Call-Log.md)` / `[Calls](/Call-Log.md)`;
- Markdown links with remote (http/https) path `[Calls](https://github.com/yourrepo/someproject/wiki/Call-Log)`.
  Only those links that are placed in TOC will be converted to local page ids;
- Github wiki links `[[Call Log]]` / `[[Call-Log]]` / `[[Call Log|Call-Log]]` / `[[Log|Call Log]]`.

### Inlining

By default, the HTML output format will generate a single-page HTML document of you wiki, with all assets inlined, such
as images, css, and javascript. So all you need to transfer documentation (to a colleague for example) is to send him/her
this unique file.

You can disable this inlining feature by passing `--disable-inline-assets` (or `-d`) such as several files will be
generated for each of images, css and javascript files.

### Table of contents (TOC)

The *TOC* is rendered using a fixed div in the HTML documentation. You can use `--toc-level` to prevent the *TOC* div
to overlap the `body` element.

## PDF

### Page breaking

By default all TOC pages starts from a new page. Also with default `css` you will never see your code block or image
broken in two pages. To add additional page breaking use `style="page-break-before: always !important;` with empty `div` element.

# Code highlighting

Code highlighting is rendered using highlight.js.
You can customize the theme used by using the `--highlight-theme` option. By default, `github` theme is used.

# Footers and Headers (pdf rendering with node-html-pdf)

wiki2pdf --footer option be used to read the header or footer either out of the footer and header config object or out of the html source. 
You can either set a default header & footer or overwrite that by appending a page number (1 based index) 
to the id="pageHeader" attribute of a html tag.

You can use any combination of those tags. The library tries to find any element, that contains the pageHeader or
pageFooter id prefix.

```
<div id="pageHeader">Default header</div>
<div id="pageHeader-first">Header on first page</div>
<div id="pageHeader-2">Header on second page</div>
<div id="pageHeader-3">Header on third page</div>
<div id="pageHeader-last">Header on last page</div>
...
<div id="pageFooter">Default footer</div>
<div id="pageFooter-first">Footer on first page</div>
<div id="pageFooter-2">Footer on second page</div>
<div id="pageFooter-last">Footer on last page</div>
```

