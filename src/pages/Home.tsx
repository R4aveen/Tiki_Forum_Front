import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PageWrapper from '@/components/layouts/PageWrapper/PageWrapper';
import { RootState } from '@/store';
import { fetchForosThunk } from '@/store/slices/foros/foroSlice';
import Badge from '@/components/ui/Badge';
import Card, { CardBody, CardHeader } from '@/components/ui/Card';
import Container from '@/components/layouts/Container/Container';
import Subheader, { SubheaderLeft } from '@/components/layouts/Subheader/Subheader';

function Home() {
	const dispatch = useDispatch();
	const { foros, loading, error } = useSelector((state: RootState) => state.foro);

	useEffect(() => {
		dispatch(fetchForosThunk());
	}, [dispatch]);


	
	return (
		<PageWrapper isProtectedRoute={true} title='Home'>
			<Subheader>
				<SubheaderLeft>
				<Badge className='text-4xl'>HOME</Badge>
				</SubheaderLeft>
					
			</Subheader>
			<Container className='flex h-full w-full flex-col items-center'>
				{loading && <p>Loading...</p>}
				{error && <p>Error: {error}</p>}
				<div className='foros-list grid grid-cols-1 gap-8 w-full max-w-6xl h-90'>
					{foros.map((foro) => (
						<Card key={foro.id} className='mb-6 shadow-xl transition-transform transform hover:scale-105'>
							<CardHeader className='bg-gradient-to-r from-blue-600 to-purple-600 p-6 text-white'>
								<h1 className='text-2xl font-bold'>{foro.nombre}</h1>
							</CardHeader>
							<CardBody className='p-6'>
								<div className='mb-6 max-h-80 w-full overflow-hidden rounded-lg'>
									<img
										className='h-full w-full object-cover'
										src={foro.imagen}
										alt={foro.nombre}
									/>
								</div>
								<p className='text-gray-800'>{foro.descripcion}</p>
							</CardBody>
						</Card>
					))}
				</div>
			</Container>
		</PageWrapper>
	);
}

export default Home;
