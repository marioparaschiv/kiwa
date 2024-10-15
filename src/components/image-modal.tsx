import React, { useCallback, useEffect, useRef, useState } from 'react';
import { animated, useSpringValue } from '@react-spring/web';


export default function ImageModal(props: React.ComponentProps<'img'>) {
	const ref = useRef<HTMLImageElement | null>(null);
	const [open, setOpen] = useState(false);

	const display = useSpringValue('none');
	const opacity = useSpringValue(0);
	const scale = useSpringValue(1);

	const [originPosition, setOriginPosition] = useState({ x: 0, y: 0, width: 0, height: 0 });

	const animate = useCallback(async () => {
		if (!ref.current) return;

		if (open) {
			display.set('block');
			await Promise.all([opacity.start(1), scale.start(calculateTargetScale())]);
		} else {
			await Promise.all([opacity.start(0), scale.start(1)]);
			display.set('none');
		}
	}, [open, ref.current]);

	const calculateTargetScale = useCallback(() => {
		if (!ref.current) return 1;
		const viewportWidth = window.innerWidth * 0.9;
		const viewportHeight = window.innerHeight * 0.9;
		const imageAspectRatio = ref.current.naturalWidth / ref.current.naturalHeight;
		const viewportAspectRatio = viewportWidth / viewportHeight;

		if (imageAspectRatio > viewportAspectRatio) {
			return viewportWidth / originPosition.width;
		} else {
			return viewportHeight / originPosition.height;
		}
	}, [originPosition]);

	useEffect(() => {
		if (ref.current) {
			const rect = ref.current.getBoundingClientRect();
			// ref.current.clientHeight
			// ref.current.clientWidth
			setOriginPosition({
				x: rect.x,
				y: rect.y,
				width: rect.width,
				height: rect.height
			});
		}
	}, [ref.current]);

	useEffect(() => {
		animate();
	}, [open]);

	return <>
		<img
			{...props}
			ref={ref}
			role='button'
			onClick={() => setOpen(!open)}
		/>

		<animated.div
			onClick={(event) => event.target === event.currentTarget && setOpen(false)}
			className='fixed inset-0 flex items-center justify-center'
			style={{
				opacity,
				display,
				backgroundColor: 'rgba(0, 0, 0, 0.5)'
			}}
		/>
		<animated.img
			src={props.src}
			style={{
				position: 'fixed',
				top: originPosition.y,
				left: originPosition.x,
				width: originPosition.width,
				height: originPosition.height,
				objectFit: 'cover',
				scale,
				display,
			}}
			draggable={false}
		/>
	</>;
}