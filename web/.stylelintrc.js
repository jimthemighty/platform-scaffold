stylelint.lint({
    files: "/app/styles/_base.scss",
    "rules": {
        "declaration-no-important": true,
        "keyframe-declaration-no-important": true,
        "selector-no-type": [ true, { ignoreTypes: "/^((?!^i-amp-).)*$/" } ],
        "selector-class-pattern": "^((?!^-amp-).)*$",
        "property-blacklist": [ "behavior", "-moz-binding", "filter" ],
        "declaration-property-value-whitelist": {
            "transition": [ "/opacity/", "/transform/", "-vendorPrefix-transform" ]
        }
    },
    syntax: "scss"
}).then(function(data) {
    // do things with data.output, data.errored,
    // and data.results
    })
    .catch(function(err) {
    // do things with err e.g.
    console.error(err.stack);
});;
