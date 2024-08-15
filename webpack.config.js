import path from 'path';

export default () => {
    return {
        devtool: false,
        mode: 'production',
        entry: './index.js',
        output: {
            path: path.resolve('./demos/build'),
            filename: 'demo.js',
            library: {
                type: 'module',
            }
        },
        experiments: {
            outputModule: true
        }
    };
};
