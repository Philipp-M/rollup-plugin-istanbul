'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var pluginutils = require('@rollup/pluginutils');
var istanbul = _interopDefault(require('istanbul-lib-instrument'));

const {
  extname
} = require('path');

function makeFilter(opts, extensions) {
  const filter = pluginutils.createFilter(opts.include, opts.exclude);
  extensions = opts.extensions || extensions;

  if (!extensions || extensions === '*') {
    return filter;
  }

  if (!Array.isArray(extensions)) {
    extensions = [extensions];
  }

  extensions = extensions.map(e => e[0] !== '.' ? `.${e}` : e);
  return id => filter(id) && extensions.indexOf(extname(id)) > -1;
}

function index (options = {}) {
  const filter = makeFilter(options, ['js', 'jsx', 'ts', 'tsx']),
        opts = Object.assign({
    esModules: true,
    compact: options.compact !== false
  }, options.instrumenterConfig, {
    produceSourceMap: options.sourceMap !== false
  }),
        instrumenter = new (options.instrumenter || istanbul).createInstrumenter(opts);
  return {
    name: 'istanbul',

    transform(code, id) {
      if (!filter(id)) return; // getCombinedSourceMap: https://github.com/rollup/rollup/issues/2983

      const {
        version,
        sources,
        sourcesContent,
        names,
        mappings
      } = this.getCombinedSourcemap();
      code = instrumenter.instrumentSync(code, id, {
        version,
        sources,
        sourcesContent,
        names,
        mappings
      });
      return {
        code,
        map: instrumenter.lastSourceMap()
      };
    }

  };
}

module.exports = index;
