#!/usr/bin/env node

const fileSystem = require('file-system')
const htmldom = require('htmldom')
const path = require('path')

const argv = process.argv.slice(2)
const url = path.resolve(process.cwd(), argv[0])

function formatter(filepath){
  fileSystem.readFile(filepath, (err, data) => {
    const html = new htmldom(data.toString()).beautify({
      indent: '  ',
      selfClosed: true
    })

    fileSystem.writeFileSync(filepath, html, (err) => {
      if(err) console.log('文件读写失败')
    })
  })
}

const stats = fileSystem.statSync(url)
//是否为文件夹
if(stats.isDirectory()){
  fileSystem.recurseSync(url, ['*.html'], (filepath, relative, filename) => {
    formatter(filepath)
  })
}else{
  formatter(url)
}