requirejs.config({
    baseUrl: "./assets/js",
    paths: {
        d3: 'vendor/d3'
    },
    shim: {
        d3: {
            exports: 'd3'
        }
    },
    deps: ['app/main']
});