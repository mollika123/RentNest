import { getUserSession } from "@/lib/core/session";
import { Card, Avatar, Button, Chip } from "@heroui/react";

export default async function OwnerProfile() {
  const user = await getUserSession();

  return (
    <div className="mx-auto max-w-4xl p-6">
      <Card>
        {/* HEADER */}
        <Card.Header>
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between w-full">
            
            <div className="flex items-center gap-4">
              <Avatar
                src={user?.image}
                name={user?.name}
                className="h-20 w-20"
              />

              <div>
                <Card.Title>
                  {user?.name || "Unknown User"}
                </Card.Title>

                <Card.Description>
                  {user?.email}
                </Card.Description>

                <div className="mt-2 flex gap-2">
                  <Chip color="primary">
                    {user?.role || "User"}
                  </Chip>

                  {user?.emailVerified && (
                    <Chip color="success">
                      Verified
                    </Chip>
                  )}
                </div>
              </div>
            </div>

            <Button color="primary">
              Edit Profile
            </Button>
          </div>
        </Card.Header>

        {/* CONTENT */}
        <Card.Content>
          <div className="grid gap-6 md:grid-cols-2">
            
            <div className="space-y-3">
              <h3 className="font-semibold">Profile Info</h3>

              <div>
                <p className="text-sm text-default-500">Name</p>
                <p>{user?.name || "Not set"}</p>
              </div>

              <div>
                <p className="text-sm text-default-500">Email</p>
                <p>{user?.email || "Not set"}</p>
              </div>

              <div>
                <p className="text-sm text-default-500">Location</p>
                <p>{user?.location || "Not set"}</p>
              </div>
            </div>

            <div className="space-y-3">
              <h3 className="font-semibold">Account Info</h3>

              <div>
                <p className="text-sm text-default-500">Role</p>
                <p>{user?.role || "User"}</p>
              </div>

              <div>
                <p className="text-sm text-default-500">
                  Email Status
                </p>
                <p>
                  {user?.emailVerified ? "Verified" : "Not Verified"}
                </p>
              </div>

              <div>
                <p className="text-sm text-default-500">
                  Member Since
                </p>
                <p>
                  {user?.createdAt
                    ? new Date(user.createdAt).toLocaleDateString()
                    : "N/A"}
                </p>
              </div>
            </div>
          </div>
        </Card.Content>

        {/* FOOTER */}
        <Card.Footer>
          <p className="text-xs text-default-500">
            Manage your account settings and personal information.
          </p>
        </Card.Footer>
      </Card>
    </div>
  );
}