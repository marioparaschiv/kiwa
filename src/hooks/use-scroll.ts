import React from 'react';

interface ScrollState {
	x: number | null;
	y: number | null;
}

function useScroll(): [ScrollState, typeof window.scrollTo] {
	const [state, setState] = React.useState<ScrollState>({ x: null, y: null });

	React.useLayoutEffect(() => {
		function onScroll() {
			setState({ x: window.scrollX, y: window.scrollY });
		};

		onScroll();
		window.addEventListener('scroll', onScroll);

		return () => {
			window.removeEventListener('scroll', onScroll);
		};
	}, []);

	return [state, window.scrollTo];
}

export default useScroll;