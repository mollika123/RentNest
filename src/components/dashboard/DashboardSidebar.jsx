

import { getUserSession } from "@/lib/core/session";
import { LayoutSideContentLeft, Bell,Briefcase, Envelope, Gear, House, Magnifier, Person, CirclePlus } from "@gravity-ui/icons";
import { Button, Drawer } from "@heroui/react";
import { CreditCard } from "lucide-react";
import Link from "next/link";

export async function DashboardSidebar() {
        const user = await getUserSession();
    const tenantNavLinks = [
       { icon: House, href: "/", label: "Back to Home" },
        { icon: House, href: "/dashboard/tenant", label: "Overview" },
        { icon: CirclePlus, href: "/dashboard/tenant/my-bookings", label: "My Bookings" },

        { icon: Briefcase, href: "/dashboard/tenant/favorites", label: "Favorites" },
        { icon: Person, href: "/dashboard/tenant/profile", label: "Profile" },
    
    ];
    const ownerNavLinks = [
       { icon: House, href: "/", label: "Back to Home" },
        { icon: House, href: "/dashboard/owner", label: "Overview" },
        { icon: CirclePlus, href: "/dashboard/owner/properties/new", label: "Add Property" },

        { icon: Briefcase, href: "/dashboard/owner/properties", label: "My Properties" },
        { icon: Person, href: "/dashboard/owner/profile", label: "Profile" },
    
    ];
    const adminNavLinks = [
        { icon: House, href: "/", label: "Back to Home" },
        
       
        { icon: Person, href: "/dashboard/admin/users", label: "All Users" },
        { icon: CirclePlus, href: "/dashboard/admin/properties", label: "All Properties" },

        { icon: Briefcase, href: "/dashboard/admin/bookings", label: "All Bookings" },
        { icon: CreditCard, href: "/dashboard/admin/transection", label: "Transections" },
        { icon: Person, href: "/dashboard/admin/profile", label: "Profile" },
    
    ];
    const navLinksMap = {
        tenant: tenantNavLinks,
        owner: ownerNavLinks,
        admin:adminNavLinks
    }
const navItems=navLinksMap[user?.role||'tenant']
    const navContent = <nav className="flex flex-col gap-1">
        {navItems.map((item) => (
            <Link
                key={item.label}
                className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-foreground transition-colors hover:bg-default"
                href={item.href}
            >
                <item.icon className="size-5 text-muted" />
                {item.label}
            </Link>
        ))}
    </nav>

    return (
        <>
            <aside className="hidden w-64 shrink-0 border-r border-default p-4 lg:block">
                {navContent}
            </aside>
            <Drawer>
                <Button className="lg:hidden" variant="secondary">
                    <LayoutSideContentLeft />
                    Sidebar
                </Button>
                <Drawer.Backdrop>
                    <Drawer.Content placement="left">
                        <Drawer.Dialog>
                            <Drawer.CloseTrigger />
                            <Drawer.Header>
                                <Drawer.Heading>Navigation</Drawer.Heading>
                            </Drawer.Header>
                            <Drawer.Body>
                                {navContent}
                            </Drawer.Body>
                        </Drawer.Dialog>
                    </Drawer.Content>
                </Drawer.Backdrop>
            </Drawer>
        </>
    );
}