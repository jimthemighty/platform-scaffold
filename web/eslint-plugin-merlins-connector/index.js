module.exports.rules = {
    "use-merlins": function(context) {
            return {
                ImportDeclaration: function (node) {
                    const specifiers = node.specifiers[0] // always array of length 1
                    let ruleName

                    if (specifiers.imported) {
                        ruleName = specifiers.imported.name
                    }

                    if (ruleName === 'configureConnector' && !/merlins/.test(node.source.value)) {
                        context.report(node, "Merlin's Connector should be left uncommented");
                    }
                }
            };
        }
};