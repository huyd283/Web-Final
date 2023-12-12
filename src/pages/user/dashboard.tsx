import UserLayout from '@/layouts/UserLayout';
import ManagerUser from '@/pages/user/_component/ManagerUser';

export default function Dashboard() {
  return (
    <UserLayout>
      <ManagerUser />
    </UserLayout>
  );
}
