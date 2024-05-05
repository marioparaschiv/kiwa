import React from 'react';

function mergeRefs<T = any>(refs: Array<React.MutableRefObject<T> | React.LegacyRef<T> | undefined | null>): React.RefCallback<T> {
	return (value) => {
		for (const ref of refs) {
			if (!ref) continue;

			if (typeof ref === 'function') {
				ref(value);
			} else {
				(ref as React.MutableRefObject<T | null>).current = value;
			}
		}
	};
}

export default mergeRefs;