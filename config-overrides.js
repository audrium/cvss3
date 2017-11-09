/* config-overrides.js */

const MaterialUIIconResolver = {
    apply(resolver) {
        resolver.plugin("module", function resolve(request, callback) {
            if (/material-ui-icons/.test(request.context.issuer)) {
                if (request.request === "material-ui/SvgIcon") {
                    const newRequest = Object.assign({}, request, {
                        request: "material-ui-next/SvgIcon"
                    });
                    return this.doResolve(
                        "resolve",
                        newRequest,
                        "Rewrote material-ui-icons request from material-ui to material-ui-next",
                        callback
                    );
                }
            }

            callback();
        });
    }
};

module.exports = function override(config, env) {
    config.resolve = {
        extensions: [".jsx", ".js", ".json"],
        plugins: [MaterialUIIconResolver]
    }
    return config;
}