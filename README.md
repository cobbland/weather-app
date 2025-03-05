# Default Template

A default GitHub template for web-based projects written in HTML, CSS, and JS; using [git](https://git-scm.com/), [npm](https://www.npmjs.com/), [webpack](https://webpack.js.org/) [ESLint](https://eslint.org/), and [Prettier](https://prettier.io/);[^refdocs] with an [MIT license](https://choosealicense.com/licenses/mit/).

[^refdocs]: See relevant documentation for more info.

## To use

To use, simply select this repo as a template when creating a new repository on GitHub. Then continue as usual with your new repository (`git clone`, `npm install`, etc).[^localuse] The contents of `index.js` and `styles.css`[^defaultcss] can obviously be overwritten after everything is set up—they're just there for testing purposes.

[^localuse]: There should be a way to do this locally in the terminal. I'll look into that and add instructions later.
[^defaultcss]: You may want to keep some or all of the CSS, as they're some pretty reasonable defaults.

### Scripts

The following npm scripts are ready for use:[^npmscriptsref]

```json
"scripts": {
"build": "webpack --config webpack.prod.js",
"dev": "webpack serve --config webpack.dev.js",
"deploy": "git subtree push --prefix dist origin gh-pages",
"lint": "eslint src/",
"format": "prettier --write src/"
}
```

[^npmscriptsref]: [Revisiting Webpacks](https://www.theodinproject.com/lessons/node-path-javascript-revisiting-webpack)

### Deployment

To deploy as a GitHub page,[^deployref] first make the `gh-pages` branch (only the firs time):

```bash
git branch gh-pages
```

Then do the following:

```bash
git checkout gh-pages && git merge main --no-edit
npm run build
git add dist -f && git commit -m "Deployment commit"
npm run deploy
git checkout main
```

[^deployref]: See the [Restaurant Page](https://www.theodinproject.com/lessons/node-path-javascript-restaurant-page) project from The Odin Project.

## Steps taken to make

The following steps were taken to create this template repo. They assume git, npm, and node were already installed.[^installref] They also assume all commands are run from the root directory of the repository.

[^installref]: See the The Odin Project lessons [Setting up Git](https://www.theodinproject.com/lessons/foundations-setting-up-git) and [Installing Node.js](https://www.theodinproject.com/lessons/foundations-installing-node-js). 

### Create project

I began by creating a new project.[^actualcreation]

```bash
mkdir default-template && cd default-template`
git init
```

[^actualcreation]: In reality, I created the project on GitHub and then cloned it, but this is how I would have done it locally.

### Initial installs

Then installed the following:[^installsrefs]

```bash
npm init
npm install --save-dev webpack webpack-cli
npm install --save-dev html-webpack-plugin
npm install --save-dev style-loader css-loader
npm install --save-dev webpack-dev-server
npm install --save-dev webpack-merge
```

[^installsrefs]: See the [Webpack](https://www.theodinproject.com/lessons/javascript-webpack) and [Revisiting Webpack](https://www.theodinproject.com/lessons/node-path-javascript-revisiting-webpack) lessons from The Odin Project for more. 

#### Optional additional installs

Not included by default, the following optional additions might be helpful, depending on what you're trying to do.

##### html-loader

If you need image files in HTML template or to import html files into js, get this one.

```bash
npm install --save-dev html-loader
```

Then add the following to `webpack.common.js`:

```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.html$/i,
        loader: "html-loader"
      },   
    ],
  },
};
```

### Initial directories and files creation and setup

The following directories and files were created and setup[^filessetup].

```bash
mkdir src dist
touch src/index.js src/styles.css src/template.html
touch .gitignore
touch webpack.common.js webpack.dev.js webpack.prod.js
touch LICENSE
```

[^filessetup]: See individual files for setup details.

### Adding linter and formatter

```bash
npm init @eslint/config@latest
npm install --save-dev --save-exact prettier
node --eval "fs.writeFileSync('.prettierrc','{}\n')"
```

(Since the webpack config files use CommonJS modules, while everything else uses ES6 modules,[^formaterror] those webpack config files show problems with ESLint. I'll find a fix for this eventually.)

[^formaterror]: See the [ES6 Modules](https://www.theodinproject.com/lessons/javascript-es6-modules) The Odin Project lesson.
