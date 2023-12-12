import type { NextPage } from 'next';
import dynamic from 'next/dynamic';

import Loading from '@/components/Loading';

const Register = dynamic(() => import('@/pages/register/_component/register'), {
  loading: () => <Loading />
});
const Index: NextPage = (): JSX.Element => {
  return <Register />;
};

export default Index;
