import DashboardLayout from './(dashboard)/layout';
import DashboardPage from './(dashboard)/page';

export default async function Home() {
  return (
    <DashboardLayout>
      <DashboardPage />
    </DashboardLayout>
  );
}
