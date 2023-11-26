import { GraphQLResolveInfo } from 'graphql';

const getSelection = (info: GraphQLResolveInfo) => {
	return info.fieldNodes[0].selectionSet?.selections || null;
};

export const extractSelections = (info: GraphQLResolveInfo) => {
	const selections = getSelection(info);
	if (!selections) return [];

	return selections.reduce<string[]>((initialValue, selection) => {
		if (selection.kind === 'Field') {
			return [...initialValue, selection.name.value];
		}
		return initialValue;
	}, []);
};
