import React, { SVGProps } from 'react';

const SvgPound = (props: SVGProps<SVGSVGElement>) => {
	return (
		<svg viewBox='0 0 24 24' className='svg-icon' {...props}>
			<g fill='none' fillRule='evenodd'>
				<path d='M0 0h24v24H0z' />
				<path
					d='M7.825 10.225C7.2 9.475 6.85 8.4 6.85 7.375c0-2.825 2.3-5.325 5.5-5.325 3.1 0 5.45 2.4 5.525 5.375h-2.8c0-1.575-1.1-2.825-2.725-2.825-1.6 0-2.75 1.175-2.75 2.775 0 .891.416 1.686 1.068 2.209.045.036.056 2.65.032 7.841h6.844a.5.5 0 01.467.681l-.612 1.575a.5.5 0 01-.466.319H6.3a.5.5 0 01-.5-.5v-1.575a.5.5 0 01.5-.5h1.625v-4.95l-.1-2.25z'
					fill='currentColor'
				/>
				<path
					d='M4.362 11.276l.5-1A.5.5 0 015.309 10h9.882a.5.5 0 01.447.724l-.5 1a.5.5 0 01-.447.276H4.809a.5.5 0 01-.447-.724z'
					fill='currentColor'
					opacity={0.3}
				/>
			</g>
		</svg>
	);
};

export default SvgPound;
