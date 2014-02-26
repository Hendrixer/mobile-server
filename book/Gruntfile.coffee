# Generated on 2013-10-31 using generator-angular 0.5.1
"use strict"

# # Globbing
# for performance reasons we're only matching one level down:
# 'test/spec/{,*/}*.js'
# use this if you want to recursively match all subfolders:
# 'test/spec/**/*.js'
module.exports = (grunt) ->
  require("load-grunt-tasks") grunt
  require("time-grunt") grunt
  _ = require("lodash")
  fs = require("fs")
  moment = require("moment")
  env = process.env.ENV or "dev"
  readChapters = ->
    lines = fs.readFileSync(__dirname + "/Book.txt")
    chapters = lines.toString().split("\n")
    arr = ["title.txt"]
    chapters.forEach (line) ->
      arr.push line
      return
    arr

  makeFiles = (ext) ->
    files: ["<%= book.dist %>/" + ext + "/book."+ext: chapters]

  chapters = readChapters()
  grunt.initConfig
    book:
      dist: "build"
      options:
        language: "english"
        paper: "a4paper"
        hmargin: "3cm"
        vmargin: "3.5cm"
        fontsize: "12pt"
        mainfont: "Open Sans"
        sansfont: "Open Sans"
        monofont: "Courier New"
        nohyphenation: false
        columns: "onecolumn"
        geometry: "portrait"

    pkg: grunt.file.readJSON("package.json")
    panda:
      pdf:
        files: ["<%= book.dist %>/pdf/book.pdf": chapters]
        options:
          pandocOptions: [
            "--latex-engine=xelatex"
            "-V documentclass=report"
            "--css=css/pandoc.css"
            "--template=templates/pdf.xetex.template"
            "--smart"
          ]

      
      # , '--standalone'
      # , '-V language=<%= book.options.language %>'
      # , '-V paper=<%= book.options.paper %>'
      # , '-V hmargin=<%= book.options.hmargin %>'
      # , '-V vmargin=<%= book.options.vmargin %>'
      # , '-V mainfont="<%= book.options.mainfont %>"'
      # , '-V sansfont="<%= book.options.sansfont %>"'
      # , '-V monofont="<%= book.options.monofont %>"'
      # , '-V geometry=<%= book.options.geometry %>'
      # , '-V alignment=<%= book.options.alignment %>'
      # , '-V columns=<%= book.options.columns %>'
      # , '-V fontsize=<%= book.options.fontsize %>'
      # , '-V nohyphenation=<%= book.options.nohyphenation %>'
      epub:
        files: ["<%= book.dist %>/epub/book.epub": chapters]
        options:
          pandocOptions: [
            "--toc"
            "--toc-depth=2"
            "-S"
            "--epub-metadata=metadata.xml"
            "--epub-cover-image=images/cover.png"
            "--smart"
          ]

      html:
        files: ["<%= book.dist %>/html/book.html": chapters]
        options:
          pandocOptions: [
            "--latex-engine=xelatex"
            "-V documentclass=report"
            "--to=html5"
            "--toc"
            "-mathjax"
            "--css=css/pandoc.css"
            "--smart"
          ]
          # concat_flag: '--to=html5 --toc -s -mathjax --standalone --latex-engine=xelatex'

    shell:
      mobi:
        options:
          stdout: true

        command: [
          "cd " + __dirname + "/build/mobi"
          "kindlegen " + __dirname + "/build/epub/book.epub"
        ].join(" && ")

      move_mobi:
        command: "mv " + __dirname + "/build/epub/book.mobi " + __dirname + "/build/mobi/book.mobi"

  grunt.registerTask "default", [
    "panda"
    "shell"
  ]
  return