import React, { SVGProps } from 'react';

const SvgCheese = (props: SVGProps<SVGSVGElement>) => {
	return (
		<svg viewBox='0 0 24 24' className='svg-icon' {...props}>
			<g fill='none' fillRule='evenodd'>
				<path d='M0 0h24v24H0z' />
				<path
					d='M22 13.915V19a2 2 0 01-2 2h-6a2 2 0 10-4 0H4a2 2 0 01-2-2V7h20v4.085a1.5 1.5 0 100 2.83zM9 17a4 4 0 100-8 4 4 0 000 8zm9 1a1 1 0 100-2 1 1 0 000 2zM5 21a1 1 0 100-2 1 1 0 000 2z'
					fill='currentColor'
				/>
				<path
					d='M19.595 5.835L4.61 4.072a1 1 0 00-.95.438L2 7h20a4.074 4.074 0 00-2.405-1.165z'
					fill='currentColor'
					opacity={0.3}
				/>
			</g>
		</svg>
	);
};

export default SvgCheese;
