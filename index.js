#!/usr/bin/env node

const fileSystem = require('file-system')
const htmldom = require('htmldom')
const path = require('path')

const argv = process.argv.slice(2)
const url = path.resolve(__dirname, argv[0])

fileSystem.recurseSync(url, ['*.html'], (filepath, relative, filename) => {
  fileSystem.readFile(filepath, (err, data) => {
    const html = new htmldom(data.toString()).beautify({
      indent: '  ',
      selfClosed: true
    })

    fileSystem.writeFileSync(filepath, html, (err) => {
      if(err) console.log('文件读写失败')
    })
  })
})