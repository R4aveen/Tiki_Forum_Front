import React, { SVGProps } from 'react';

const SvgVolumeFull = (props: SVGProps<SVGSVGElement>) => {
	return (
		<svg viewBox='0 0 24 24' className='svg-icon' {...props}>
			<g fill='none' fillRule='evenodd'>
				<path d='M0 0h24v24H0z' />
				<path
					d='M16.316 16.148a.75.75 0 01-.733-1.309A3.248 3.248 0 0017.25 12a3.248 3.248 0 00-1.645-2.827.75.75 0 01.742-1.304A4.748 4.748 0 0118.75 12c0 1.74-.944 3.315-2.434 4.148zm.473 3.741a.75.75 0 01-.65-1.352A7.25 7.25 0 0020.25 12a7.25 7.25 0 00-4.044-6.505.75.75 0 11.664-1.344A8.75 8.75 0 0121.75 12a8.75 8.75 0 01-4.961 7.89z'
					fill='currentColor'
					opacity={0.3}
				/>
				<path
					d='M7 16l-3.392-.678A2 2 0 012 13.36v-2.72a2 2 0 011.608-1.962L7 8l3.293-3.293A1 1 0 0112 5.414v13.172a1 1 0 01-1.707.707L7 16z'
					fill='currentColor'
				/>
			</g>
		</svg>
	);
};

export default SvgVolumeFull;
