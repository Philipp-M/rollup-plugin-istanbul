/// <reference types="node" />

import { Plugin } from 'rollup';
import { FilterPattern } from '@rollup/pluginutils';
import { TransformOptions } from 'buble';
import { InstrumenterOptions, Instrumenter } from 'istanbul-lib-instrument';

declare namespace istanbul {
    interface Options extends TransformOptions {
        // Every files will be parsed by default, but you can specify which files to include or exclude
        include?: FilterPattern
        exclude?: FilterPattern
        extensions?: string | string[]
        compact?: boolean
        sourceMap?: boolean
        instrumenterConfig?: InstrumenterOptions
        instrumenter?: Instrumenter
    }
}

export = istanbul;
declare function istanbul(options?: istanbul.Options): Plugin;
