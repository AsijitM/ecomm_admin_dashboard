import { auth } from '@clerk/nextjs';
import { redirect } from 'next/navigation';

import prismadb from '@/lib/prismadb';

export default async function SetupLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { userId } = auth();

  if (!userId) {
    redirect('/sign-in');
  }

  //we are loading the first store available with the currenty logged in user
  const store = await prismadb.store.findFirst({
    where: {
      userId,
    },
  });
  //if the store exsits then we redirect it to the dashboard
  if (store) redirect(`/${store.id}`);

  return <>{children}</>;
}
