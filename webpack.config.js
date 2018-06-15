const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const webpack = require('webpack');
const WebpackHMRPlugin = require('nodeblues/webpack').WebpackHMRPlugin;
const BUILD_DIR = path.resolve(__dirname, './build/web');
const SRC_DIR = path.resolve(__dirname, './web/src');
const ENTRY_FILE = SRC_DIR + '/index.jsx';
const isProduction = process.argv.includes('-p');
const { Rewriter, Analyzer } = require('@css-blocks/jsx');
const { CssBlocksPlugin } = require('@css-blocks/webpack');
const cssBlocksRewriter = require('@css-blocks/jsx/dist/src/transformer/babel');
const sass = require('sass');
const postcss = require('postcss')([
  require('autoprefixer'),
  require('cssnano')({
    autoprefixer: false,
    discardComments: { removeAll: true }
  })
]);

const jsxCompilationOptions = {
  compilationOptions: {
    preprocessors: {
      async scss(fullPath, content) {
        const sassObj = sass.renderSync({
          data: content,
          sourceMap: true,
          sourceMapEmbed: true,
          includePaths: [SRC_DIR]
        });

        const PostCSSObj = await postcss.process(sassObj.css);

        return { content: PostCSSObj.css };
      }
    }
  },
  optimization: {
    rewriteIdents: true,
    mergeDeclarations: true,
    removeUnusedStyles: true,
    conflictResolution: true
  }
};
const rewriter = new Rewriter();
const analyzer = new Analyzer(`${__dirname}/web/src/index.jsx`, jsxCompilationOptions);

const plugins = [
  new webpack.optimize.CommonsChunkPlugin({
    name: 'vendor',
    minChunks: Infinity
  }),
  new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: isProduction ? '"production"' : '"development"'
    }
  }),
  new webpack.optimize.ModuleConcatenationPlugin(),
  /*
  new HtmlWebpackPlugin({
    title: 'Counter',
    template: './web/index.template.html',
    filename: 'index.html',
    inject: 'footer',
    minify: { collapseWhitespace: true }
  }),
  */
  new CssBlocksPlugin({
    analyzer,
    outputCssFile: 'bundle.css',
    compilationOptions: jsxCompilationOptions.compilationOptions,
    optimization: jsxCompilationOptions.optimization
  })
];

const loaders = [
  {
    test: /.jsx?/,
    include: [SRC_DIR, path.resolve(__dirname, './shared/src')],
    use: [
      {
        loader: 'babel-loader',
        options: {
          presets: ['env', 'react'],
          babelrc: false,
          cacheDirectory: true,
          compact: true
        }
      },
      {
        loader: 'babel-loader',
        options: {
          plugins: [cssBlocksRewriter.makePlugin({ rewriter })],
          parserOpts: {
            plugins: ['jsx']
          }
        }
      },
      {
        loader: require.resolve('@css-blocks/webpack/dist/src/loader'),
        options: {
          analyzer,
          rewriter
        }
      }
    ]
  }
];

// Add production or dev specific plugins and loaders
if (isProduction) {
  plugins.push(
    new BundleAnalyzerPlugin({
      analyzerMode: 'static',
      reportFilename: 'bundleAnalyzer.html',
      defaultSizes: 'parsed'
    })
  );
} else {
  loaders.push({
    test: ENTRY_FILE,
    loader: 'nodeblues/hmr-loader',
    query: {
      host: 'localhost',
      port: 1338
    }
  });
  plugins.push(new WebpackHMRPlugin('localhost', 1338));
}

const config = {
  resolve: {
    alias: {
      shared: path.resolve(__dirname, 'shared/src')
    },
    extensions: ['.js', '.jsx'],
    modules: [path.resolve(__dirname, 'node_modules')]
  },
  entry: {
    app: ENTRY_FILE,
    vendor: ['react', 'react-redux', 'redux', 'react-dom']
  },
  output: {
    path: BUILD_DIR,
    filename: '[name]-[hash].js'
  },
  module: {
    rules: loaders
  },
  plugins
};

module.exports = config;
