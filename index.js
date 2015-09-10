"use strict";

module.exports = function (tasks) {

    //Save all custom-selector in the root
    tasks.addTask({
        filter: {
            type: 'AtRule',
            name: 'custom-selector'
        },
        fn: function (customSelector) {
            var block = customSelector.getParent('Block') || customSelector.getParent('Root');

            if (block) {
                block.setData('@custom-selector-' + customSelector.get('ExtensionName').name, customSelector.get('Selectors'));
            }

            customSelector.detach();
        }
    });

    //Replace the custom-selectors
    tasks.addTask({
        filter: {
            type: 'ExtensionName'
        },
        fn: function (extension) {
            if (extension.getParent('Selector')) {
                let selectors = extension.getData('@custom-selector-' + extension.name);

                if (selectors) {
                    if (selectors.length === 1) {
                        extension.replaceWith(selectors[0].clone());
                    } else {
                        extension.replaceWithCode(':matches(' + selectors.toString() + ')', 'PseudoClassFunction', 'createSelectors');
                    }
                }
            }
        }
    });
};
