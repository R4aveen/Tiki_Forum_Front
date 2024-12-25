import React, { SVGProps } from 'react';

const SvgWoodHorse = (props: SVGProps<SVGSVGElement>) => {
	return (
		<svg viewBox='0 0 24 24' className='svg-icon' {...props}>
			<g fill='none' fillRule='evenodd'>
				<path d='M0 0h24v24H0z' />
				<path
					d='M6.981 21.5h.637a.5.5 0 00.482-.368l1.277-4.682a.5.5 0 01.578-.36c1.405.273 2.42.41 3.045.41.647 0 2.001-.146 4.064-.438a.5.5 0 01.552.364l1.284 4.706a.5.5 0 00.482.368h.656a.5.5 0 00.499-.46l.617-7.721A4 4 0 0017.167 9H13c-.974-2.032-1.808-3.365-2.5-4-.317-.29-2.14-1.058-5.466-2.301a.3.3 0 00-.396.354l.291 1.165a.5.5 0 01-.139.482C4.136 5.326 3.706 5.76 3.5 6c-.215.25-.524 1.007-.927 2.27a.5.5 0 00.06.43l.603.903a.5.5 0 00.673.152l.841-.505a.863.863 0 011.306.707l.426 11.062a.5.5 0 00.5.481z'
					fill='currentColor'
				/>
			</g>
		</svg>
	);
};

export default SvgWoodHorse;
