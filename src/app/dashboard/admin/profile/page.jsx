import { getUserSession } from "@/lib/core/session";
import { Card, Avatar, Button, Chip } from "@heroui/react";
import Image from "next/image";

export default async function AdminProfile() {
  const user = await getUserSession();

  return (
    <div className="mx-auto max-w-4xl p-6 min-h-screen flex flex-col justify-center">
      {/* PROFILE CARD */}
      <Card className="border-none bg-background/60 dark:bg-default-100/50 backdrop-blur-md shadow-xl rounded-2xl overflow-hidden">
        
        {/* HEADER */}
        <Card.Header className="relative p-6 flex flex-col gap-5 md:flex-row md:items-center md:justify-between bg-gradient-to-r from-blue-500/10 via-purple-500/5 to-transparent border-b border-default-100">
          <div className="flex flex-col sm:flex-row items-center gap-5 text-center sm:text-left w-full">
         <Image
  src={user?.image || '/cute-woman-avatar-profile-vector-illustration_1058532-14546.avif'}
  width={200} height={200} alt='user?.name'
  className="h-24 w-24 text-large shadow-md"
 
/>

            <div className="space-y-1 flex-1">
              <Card.Title className="text-2xl font-bold tracking-tight text-foreground">
                {user?.name || "Unknown User"}
              </Card.Title>

              <Card.Description className="text-sm font-medium text-default-500">
                {user?.email}
              </Card.Description>

              <div className="pt-2 flex flex-wrap justify-center sm:justify-start gap-2">
                <Chip 
                  variant="flat" 
                  color="primary" 
                  size="sm" 
                  className="capitalize font-semibold"
                >
                  {user?.role || "User"}
                </Chip>

                {user?.emailVerified ? (
                  <Chip 
                    variant="flat" 
                    color="success" 
                    size="sm" 
                    className="font-medium"
                  >
                    Verified Account
                  </Chip>
                ) : (
                  <Chip 
                    variant="flat" 
                    color="warning" 
                    size="sm" 
                    className="font-medium"
                  >
                    Pending Verification
                  </Chip>
                )}
              </div>
            </div>
          </div>

          <Button 
            color="primary" 
            variant="solid" 
            radius="lg"
            className="font-medium shadow-lg shadow-primary/20 w-full md:w-auto"
          >
            Edit Profile
          </Button>
        </Card.Header>

        {/* CONTENT */}
        <Card.Content className="p-8">
          <div className="grid gap-8 md:grid-cols-2">
            
            {/* PROFILE INFO BOX */}
            <div className="p-5 rounded-2xl bg-default-50/50 border border-default-100 space-y-4">
              <div className="flex items-center gap-2 mb-2">
                <div className="h-2 w-2 rounded-full bg-blue-500" />
                <h3 className="font-bold text-default-800 tracking-wide uppercase text-xs">
                  Profile Info
                </h3>
              </div>

              <div className="space-y-1 border-b border-default-100/50 pb-3">
                <p className="text-xs font-semibold text-default-400 uppercase tracking-wider">Full Name</p>
                <p className="text-sm font-medium text-default-700">{user?.name || "Not set"}</p>
              </div>

              <div className="space-y-1 pt-1">
                <p className="text-xs font-semibold text-default-400 uppercase tracking-wider">Email Address</p>
                <p className="text-sm font-medium text-default-700">{user?.email || "Not set"}</p>
              </div>
            </div>

            {/* ACCOUNT INFO BOX */}
            <div className="p-5 rounded-2xl bg-default-50/50 border border-default-100 space-y-4">
              <div className="flex items-center gap-2 mb-2">
                <div className="h-2 w-2 rounded-full bg-purple-500" />
                <h3 className="font-bold text-default-800 tracking-wide uppercase text-xs">
                  Account Info
                </h3>
              </div>

              <div className="grid grid-cols-2 gap-4 border-b border-default-100/50 pb-3">
                <div className="space-y-1">
                  <p className="text-xs font-semibold text-default-400 uppercase tracking-wider">Role</p>
                  <p className="text-sm font-medium text-default-700 capitalize">{user?.role || "User"}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-xs font-semibold text-default-400 uppercase tracking-wider">Status</p>
                  <p className="text-sm font-medium text-default-700">
                    {user?.emailVerified ? "Active" : "Inactive"}
                  </p>
                </div>
              </div>

              <div className="space-y-1 pt-1">
                <p className="text-xs font-semibold text-default-400 uppercase tracking-wider">Member Since</p>
                <p className="text-sm font-medium text-default-700">
                  {user?.createdAt
                    ? new Date(user.createdAt).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })
                    : "N/A"}
                </p>
              </div>
            </div>

          </div>
        </Card.Content>

        {/* FOOTER */}
        <Card.Footer className="p-6 bg-default-50/30 border-t border-default-100 flex justify-center text-center">
          <p className="text-xs text-default-400 font-medium">
            Manage your account settings, roles, and personal verification parameters.
          </p>
        </Card.Footer>
      </Card>
    </div>
  );
}