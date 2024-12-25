import React, { SVGProps } from 'react';

const SvgAttachment2 = (props: SVGProps<SVGSVGElement>) => {
	return (
		<svg viewBox='0 0 24 24' className='svg-icon' {...props}>
			<g fill='none' fillRule='evenodd'>
				<path d='M0 0h24v24H0z' />
				<path
					d='M9.879 12.707l-2.122 2.121a1 1 0 101.415 1.415l2.12-2.122.708.707a2 2 0 010 2.829l-2.828 2.828a2 2 0 01-2.829 0l-2.828-2.828a2 2 0 010-2.829L6.343 12a2 2 0 012.829 0l.707.707z'
					fill='currentColor'
					opacity={0.3}
				/>
				<path
					d='M14.121 11.293l2.122-2.121a1 1 0 00-1.415-1.415l-2.12 2.122L12 9.172a2 2 0 010-2.829l2.828-2.828a2 2 0 012.829 0l2.828 2.828a2 2 0 010 2.829L17.657 12a2 2 0 01-2.829 0l-.707-.707z'
					fill='currentColor'
				/>
				<path
					d='M4.222 4.222a1 1 0 011.414 0L7.05 5.636A1 1 0 115.636 7.05L4.222 5.636a1 1 0 010-1.414zm5.121-2.707a1 1 0 011 1v2a1 1 0 11-2 0v-2a1 1 0 011-1zM1.686 9.172a1 1 0 011-1h2a1 1 0 010 2h-2a1 1 0 01-1-1zM19.657 19.657a1 1 0 000-1.414l-1.414-1.415a1 1 0 00-1.415 1.415l1.415 1.414a1 1 0 001.414 0zm2.707-5.121a1 1 0 00-1-1h-2a1 1 0 000 2h2a1 1 0 001-1zm-7.657 7.656a1 1 0 001-1v-2a1 1 0 00-2 0v2a1 1 0 001 1z'
					fill='currentColor'
					opacity={0.3}
				/>
			</g>
		</svg>
	);
};

export default SvgAttachment2;
