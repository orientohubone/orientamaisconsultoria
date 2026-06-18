import type React from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { LogOut, Package, Users2, LayoutGrid } from "lucide-react";

import { supabase } from "@/integrations/supabase/client";
import logoUrl from "@/assets/orientamaislogo.png";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";

const NAV = [
  { title: "Funil de clientes", url: "/crm", icon: Users2 },
  { title: "Catálogo de serviços", url: "/crm/servicos", icon: Package },
];

function CrmSidebar() {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  async function logout() {
    await supabase.auth.signOut();
    window.location.href = "/login";
  }

  return (
    <Sidebar
      collapsible="icon"
      className="[&_[data-sidebar=sidebar]]:!bg-[linear-gradient(180deg,rgba(17,38,33,0.98),rgba(9,22,19,0.98))] [&_[data-sidebar=sidebar]]:!text-[#f2f7f4] [&_[data-sidebar=sidebar]]:border-r [&_[data-sidebar=sidebar]]:border-emerald-950/40"
    >
      <SidebarHeader className="border-b border-sidebar-border">
        <Link to="/" className="flex items-center gap-2 px-2 py-1.5">
          <img src={logoUrl} alt="Orientamais" className="h-8 w-auto shrink-0" />
          {!collapsed && (
            <div className="leading-tight">
              <div className="text-sm font-bold">Orientamais</div>
              <div className="text-[0.6rem] tracking-[0.25em] text-muted-foreground uppercase">
                CRM
              </div>
            </div>
          )}
        </Link>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-[#d7e7df]/75">
            <LayoutGrid className="h-3 w-3 mr-1.5 inline" /> Navegação
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {NAV.map((item) => {
                const active =
                  item.url === "/crm" ? pathname === "/crm" : pathname.startsWith(item.url);
                return (
                  <SidebarMenuItem key={item.url}>
                    <SidebarMenuButton asChild isActive={active} tooltip={item.title}>
                      <Link to={item.url} className="flex items-center gap-2">
                        <item.icon className="h-4 w-4" />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="border-t border-emerald-950/40">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton onClick={logout} tooltip="Sair">
              <LogOut className="h-4 w-4" />
              <span>Sair</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}

export function CrmShell({
  title,
  subtitle,
  actions,
  children,
}: {
  title: string;
  subtitle?: string;
  actions?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <div
        className="min-h-screen flex w-full"
        style={
          {
            background: "var(--gradient-hero)",
            "--sidebar": "oklch(0.22 0.035 171)",
            "--sidebar-foreground": "oklch(0.98 0.01 170)",
            "--sidebar-primary": "oklch(0.74 0.13 168)",
            "--sidebar-primary-foreground": "oklch(0.2 0.03 171)",
            "--sidebar-accent": "oklch(0.28 0.03 171)",
            "--sidebar-accent-foreground": "oklch(0.98 0.01 170)",
            "--sidebar-border": "oklch(0.34 0.04 171 / 0.55)",
            "--sidebar-ring": "oklch(0.74 0.13 168)",
          } as React.CSSProperties
        }
      >
        <CrmSidebar />
        <div className="flex-1 flex flex-col min-w-0">
          <header className="h-14 flex items-center gap-3 px-4 border-b border-border/40 bg-background/40 backdrop-blur sticky top-0 z-10">
            <SidebarTrigger />
            <div className="flex-1 min-w-0">
              <h1 className="text-sm font-bold truncate">{title}</h1>
              {subtitle && (
                <p className="text-[0.7rem] text-muted-foreground truncate">{subtitle}</p>
              )}
            </div>
            {actions}
          </header>
          <main className="flex-1 overflow-auto">{children}</main>
        </div>
      </div>
    </SidebarProvider>
  );
}
