import OwnerPropertyTable from '@/components/dashboard/OwnerPropertyTable';
import { getProperty } from '@/lib/api/property';
import { getUserSession } from '@/lib/core/session';


const OwnerProperty = async () => {
  
  const user = await getUserSession();
  
  console.log("Logged In User:", user);

 
  const userId = user?.id
  console.log("USER _ID:", user?.id);
  const properties = userId
    ? await getProperty(userId,"pending")
    : [];

  console.log('properties', properties);

  return (
    <div>
      <OwnerPropertyTable properties={properties} />
    </div>
  );
};

export default OwnerProperty;