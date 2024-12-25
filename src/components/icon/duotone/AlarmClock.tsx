import React, { SVGProps } from 'react';

const SvgAlarmClock = (props: SVGProps<SVGSVGElement>) => {
	return (
		<svg viewBox='0 0 24 24' className='svg-icon' {...props}>
			<g fill='none' fillRule='evenodd'>
				<path d='M0 0h24v24H0z' />
				<path
					d='M7.143 19.358a7.993 7.993 0 001.728 1.007l-.979 1.695a1 1 0 11-1.732-1l.983-1.702zm7.994 1.004c.62-.265 1.199-.605 1.726-1.01l.97 1.678a1 1 0 01-1.733 1l-.963-1.668z'
					fill='currentColor'
				/>
				<path
					d='M12 21a8 8 0 110-16 8 8 0 010 16zm7.069-17.746l1.75 1.75a1.5 1.5 0 01-2.122 2.12l-1.75-1.749a1.5 1.5 0 012.122-2.12zm-13.77-.372a1.5 1.5 0 012.12 2.121L5.3 7.125a1.5 1.5 0 11-2.122-2.122L5.3 2.883z'
					fill='currentColor'
					opacity={0.3}
				/>
				<path
					d='M11.963 7.5h.085a.5.5 0 01.497.45L13 12.5l3.248 1.856a.5.5 0 01.252.434V15a.382.382 0 01-.482.368l-4.62-1.26a.5.5 0 01-.366-.52l.432-5.626a.5.5 0 01.499-.462z'
					fill='currentColor'
				/>
			</g>
		</svg>
	);
};

export default SvgAlarmClock;
