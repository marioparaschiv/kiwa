import type { SVGProps } from 'react';


function UberEats({ width = 24, height = 24, ...props }: React.PropsWithoutRef<SVGProps<SVGElement>>) {
	return <svg
		{...props}
		xmlns='http://www.w3.org/2000/svg'
		width={width}
		height={height}
		viewBox='0 0 24 24'
	>
		<path fill='currentColor' d='M0 2.865v4.997c0 1.883 1.331 3.13 3.083 3.13a2.965 2.965 0 0 0 2.15-.877v.743h1.212V2.864H5.223v4.934c0 1.265-.87 2.12-1.995 2.122c-1.139-.002-1.997-.834-1.997-2.122V2.864zm7.362 0v7.993h1.163v-.732a2.991 2.991 0 0 0 2.118.876a3.044 3.044 0 1 0 0-6.086a2.967 2.967 0 0 0-2.107.876V2.865zm9.886 2.056a3.022 3.022 0 0 0-3.035 3.024c0 1.737 1.373 3.037 3.153 3.037a3.123 3.123 0 0 0 2.558-1.243l-.85-.618a2.05 2.05 0 0 1-1.708.858a1.971 1.971 0 0 1-1.97-1.655h4.817v-.379c0-1.734-1.254-3.024-2.964-3.024zm6.163.066a1.594 1.594 0 0 0-1.376.766v-.719h-1.163v5.824h1.174V7.546c0-.902.559-1.484 1.327-1.484h.495V4.989l-.457-.002zm-6.203.944a1.844 1.844 0 0 1 1.834 1.486h-3.618a1.844 1.844 0 0 1 1.784-1.486zm-6.659.006a2.021 2.021 0 1 1 .002 4.042a2.015 2.015 0 0 1-1.416-.598a2.015 2.015 0 0 1-.585-1.422a2.015 2.015 0 0 1 .584-1.422a2.015 2.015 0 0 1 1.415-.6zM0 12.987v7.971h5.722v-1.367H1.546v-1.97H5.61v-1.315H1.546v-1.955h4.176v-1.365zm14.56.41v1.685h-1.15v1.338h1.154v3.143c0 .793.572 1.421 1.6 1.421h1.643l-.006-1.338H16.66c-.348 0-.572-.15-.572-.464v-2.768H17.8v-1.332h-1.706v-1.686zm-5.297 1.527a3.103 3.103 0 1 0 .07 6.205a2.991 2.991 0 0 0 1.913-.666v.532h1.517v-5.913h-1.509v.526a3.005 3.005 0 0 0-1.92-.684h-.07zm11.771.007c-1.585 0-2.7.644-2.7 1.886c0 .86.613 1.421 1.936 1.695l1.448.328c.57.11.722.259.722.49c0 .371-.438.603-1.127.603c-.876 0-1.378-.19-1.573-.848h-1.533c.22 1.231 1.157 2.05 3.049 2.05h.002c1.752 0 2.742-.819 2.742-1.953c0-.806-.585-1.408-1.809-1.667l-1.294-.26c-.751-.136-.988-.274-.988-.546c0-.357.361-.575 1.03-.575c.722 0 1.252.192 1.405.847h1.518c-.086-1.229-.99-2.05-2.827-2.05zm-11.567 1.25c1.01.01 1.819.837 1.807 1.847a1.8 1.8 0 0 1-1.825 1.802a1.824 1.824 0 0 1 .018-3.648z' />
	</svg>;
}

export default UberEats;