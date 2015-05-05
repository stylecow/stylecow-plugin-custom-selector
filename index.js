module.exports = function (stylecow) {

	//Save all custom-selector in the root
	stylecow.addTask({
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
	stylecow.addTask({
		filter: {
			type: 'ExtensionName'
		},
		fn: function (extension) {
			if (extension.getParent('Selector')) {
				var selectors = extension.getData('@custom-selector-' + extension.name);

				if (selectors) {
					if (selectors.length === 1) {
						extension.replaceWith(selectors[0].clone());
					} else {
						var matches = (new stylecow.PseudoClassFunction()).setName('matches');

						selectors.forEach(function (child) {
							matches.push(child.clone());
						});

						extension.replaceWith(matches);
					}
				}
			}
		}
	});
};
