import type { SVGProps } from 'react';


function Facebook({ width = 24, height = 24, ...props }: React.PropsWithoutRef<SVGProps<SVGElement>>) {
	return <svg
		{...props}
		xmlns='http://www.w3.org/2000/svg'
		width={width}
		height={height}
		viewBox='0 0 24 24'
	>
		<path fill='currentColor' d='M9.198 21.5h4v-8.01h3.604l.396-3.98h-4V7.5a1 1 0 0 1 1-1h3v-4h-3a5 5 0 0 0-5 5v2.01h-2l-.396 3.98h2.396v8.01Z' />
	</svg>;
}

export default Facebook;