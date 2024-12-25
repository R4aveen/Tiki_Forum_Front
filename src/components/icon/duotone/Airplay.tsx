import React, { SVGProps } from 'react';

const SvgAirplay = (props: SVGProps<SVGSVGElement>) => {
	return (
		<svg viewBox='0 0 24 24' className='svg-icon' {...props}>
			<g fill='none' fillRule='evenodd'>
				<path d='M0 0h24v24H0z' />
				<path fill='currentColor' opacity={0.3} d='M8 21h8l-4-5z' />
				<path
					d='M17.403 14.55l-1.543 1.272A4.987 4.987 0 0012 14a4.987 4.987 0 00-3.85 1.81l-1.54-1.276A6.986 6.986 0 0112 12c2.117 0 4.082.947 5.403 2.55zm3.065-2.571l-1.539 1.277A8.978 8.978 0 0012 10a8.978 8.978 0 00-6.922 3.248l-1.538-1.28A10.977 10.977 0 0112 8c3.315 0 6.392 1.477 8.468 3.979zM23.29 9.72l-1.611 1.184A11.98 11.98 0 0012 6a11.981 11.981 0 00-9.767 5.027L.606 9.864A13.98 13.98 0 0112 4a13.98 13.98 0 0111.29 5.72z'
					fill='currentColor'
				/>
			</g>
		</svg>
	);
};

export default SvgAirplay;
