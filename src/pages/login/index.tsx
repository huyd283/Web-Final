import type { NextPage } from 'next';
import dynamic from 'next/dynamic';

import Loading from '@/components/Loading';

const Login = dynamic(() => import('@/pages/login/_component/login'), {
  loading: () => <Loading />
});
const Index: NextPage = (): JSX.Element => {
  return <Login />;
};

export default Index;
