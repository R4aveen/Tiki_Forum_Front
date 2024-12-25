import React, { SVGProps } from 'react';

const SvgDinner1 = (props: SVGProps<SVGSVGElement>) => {
	return (
		<svg viewBox='0 0 24 24' className='svg-icon' {...props}>
			<g fill='none' fillRule='evenodd'>
				<path d='M0 0h24v24H0z' />
				<path
					d='M12.5 19a6.5 6.5 0 110-13 6.5 6.5 0 010 13zm0-2.6a3.9 3.9 0 100-7.8 3.9 3.9 0 000 7.8zm0-1.3a2.6 2.6 0 110-5.2 2.6 2.6 0 010 5.2zM22 13.5c.286 0 .529.212.568.495l.53 3.89A.982.982 0 0122.125 19a1.027 1.027 0 01-1.023-1.12l.353-3.882A.548.548 0 0122 13.5z'
					fill='currentColor'
					opacity={0.3}
				/>
				<path
					d='M21 5v7h3V8a3 3 0 00-3-3zM.714 5l.323 3.329a.393.393 0 00.783 0L2.143 5h.714l.323 3.329a.393.393 0 00.783 0L4.286 5H5v3.395a2.5 2.5 0 01-5 0V5h.714z'
					fill='currentColor'
				/>
				<path
					d='M2.5 12.368c.4 0 .731.314.753.714l.26 4.848A1.015 1.015 0 012.5 19a1.015 1.015 0 01-1.014-1.07l.261-4.848a.754.754 0 01.753-.714z'
					fill='currentColor'
					opacity={0.3}
				/>
			</g>
		</svg>
	);
};

export default SvgDinner1;
