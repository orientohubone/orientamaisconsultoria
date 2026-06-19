import { j as jsxRuntimeExports, r as reactExports } from "../_libs/react.mjs";
import { e as useRouterState, L as Link } from "../_libs/tanstack__react-router.mjs";
import { s as supabase } from "./client-CQo1km_T.mjs";
import { S as Slot } from "../_libs/radix-ui__react-slot.mjs";
import { c as cva } from "../_libs/class-variance-authority.mjs";
import { c as clsx } from "../_libs/clsx.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
import { R as Root$1 } from "../_libs/radix-ui__react-separator.mjs";
import { R as Root, P as Portal, C as Content, a as Close, T as Title, D as Description, O as Overlay } from "../_libs/radix-ui__react-dialog.mjs";
import { P as Provider, R as Root3, T as Trigger, a as Portal$1, C as Content2 } from "../_libs/radix-ui__react-tooltip.mjs";
import { E as LayoutGrid, H as UsersRound, e as Package, b as LogOut, I as PanelLeft, X } from "../_libs/lucide-react.mjs";
const logoUrl = "/assets/orientamaislogo-B0yRCfpZ.png";
const MOBILE_BREAKPOINT = 768;
function useIsMobile() {
  const [isMobile, setIsMobile] = reactExports.useState(void 0);
  reactExports.useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`);
    const onChange = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    };
    mql.addEventListener("change", onChange);
    setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    return () => mql.removeEventListener("change", onChange);
  }, []);
  return !!isMobile;
}
function cn(...inputs) {
  return twMerge(clsx(inputs));
}
const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium cursor-pointer transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground shadow hover:bg-primary/90",
        destructive: "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
        outline: "border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground",
        secondary: "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline"
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-10 rounded-md px-8",
        icon: "h-9 w-9"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default"
    }
  }
);
const Button = reactExports.forwardRef(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Comp, { className: cn(buttonVariants({ variant, size, className })), ref, ...props });
  }
);
Button.displayName = "Button";
const Input = reactExports.forwardRef(
  ({ className, type, ...props }, ref) => {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      "input",
      {
        type,
        className: cn(
          "flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
          className
        ),
        ref,
        ...props
      }
    );
  }
);
Input.displayName = "Input";
const Separator = reactExports.forwardRef(({ className, orientation = "horizontal", decorative = true, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  Root$1,
  {
    ref,
    decorative,
    orientation,
    className: cn(
      "shrink-0 bg-border",
      orientation === "horizontal" ? "h-[1px] w-full" : "h-full w-[1px]",
      className
    ),
    ...props
  }
));
Separator.displayName = Root$1.displayName;
const Sheet = Root;
const SheetPortal = Portal;
const SheetOverlay = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  Overlay,
  {
    className: cn(
      "fixed inset-0 z-50 bg-black/80  data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      className
    ),
    ...props,
    ref
  }
));
SheetOverlay.displayName = Overlay.displayName;
const sheetVariants = cva(
  "fixed z-50 gap-4 bg-background p-6 shadow-lg transition ease-in-out data-[state=closed]:duration-300 data-[state=open]:duration-500 data-[state=open]:animate-in data-[state=closed]:animate-out",
  {
    variants: {
      side: {
        top: "inset-x-0 top-0 border-b data-[state=closed]:slide-out-to-top data-[state=open]:slide-in-from-top",
        bottom: "inset-x-0 bottom-0 border-t data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom",
        left: "inset-y-0 left-0 h-full w-3/4 border-r data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left sm:max-w-sm",
        right: "inset-y-0 right-0 h-full w-3/4 border-l data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right sm:max-w-sm"
      }
    },
    defaultVariants: {
      side: "right"
    }
  }
);
const SheetContent = reactExports.forwardRef(({ side = "right", className, children, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsxs(SheetPortal, { children: [
  /* @__PURE__ */ jsxRuntimeExports.jsx(SheetOverlay, {}),
  /* @__PURE__ */ jsxRuntimeExports.jsxs(Content, { ref, className: cn(sheetVariants({ side }), className), ...props, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Close, { className: "absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background cursor-pointer transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-secondary", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-4 w-4" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "sr-only", children: "Close" })
    ] }),
    children
  ] })
] }));
SheetContent.displayName = Content.displayName;
const SheetHeader = ({ className, ...props }) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: cn("flex flex-col space-y-2 text-center sm:text-left", className), ...props });
SheetHeader.displayName = "SheetHeader";
const SheetTitle = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  Title,
  {
    ref,
    className: cn("text-lg font-semibold text-foreground", className),
    ...props
  }
));
SheetTitle.displayName = Title.displayName;
const SheetDescription = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  Description,
  {
    ref,
    className: cn("text-sm text-muted-foreground", className),
    ...props
  }
));
SheetDescription.displayName = Description.displayName;
function Skeleton({ className, ...props }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: cn("animate-pulse rounded-md bg-primary/10", className), ...props });
}
const TooltipProvider = Provider;
const Tooltip = Root3;
const TooltipTrigger = Trigger;
const TooltipContent = reactExports.forwardRef(({ className, sideOffset = 4, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(Portal$1, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(
  Content2,
  {
    ref,
    sideOffset,
    className: cn(
      "z-50 overflow-hidden rounded-md bg-primary px-3 py-1.5 text-xs text-primary-foreground animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 origin-(--radix-tooltip-content-transform-origin)",
      className
    ),
    ...props
  }
) }));
TooltipContent.displayName = Content2.displayName;
const SIDEBAR_COOKIE_NAME = "sidebar_state";
const SIDEBAR_COOKIE_MAX_AGE = 60 * 60 * 24 * 7;
const SIDEBAR_WIDTH = "16rem";
const SIDEBAR_WIDTH_MOBILE = "18rem";
const SIDEBAR_WIDTH_ICON = "3rem";
const SIDEBAR_KEYBOARD_SHORTCUT = "b";
const SidebarContext = reactExports.createContext(null);
function useSidebar() {
  const context = reactExports.useContext(SidebarContext);
  if (!context) {
    throw new Error("useSidebar must be used within a SidebarProvider.");
  }
  return context;
}
const SidebarProvider = reactExports.forwardRef(
  ({
    defaultOpen = true,
    open: openProp,
    onOpenChange: setOpenProp,
    className,
    style,
    children,
    ...props
  }, ref) => {
    const isMobile = useIsMobile();
    const [openMobile, setOpenMobile] = reactExports.useState(false);
    const [_open, _setOpen] = reactExports.useState(defaultOpen);
    const open = openProp ?? _open;
    const setOpen = reactExports.useCallback(
      (value) => {
        const openState = typeof value === "function" ? value(open) : value;
        if (setOpenProp) {
          setOpenProp(openState);
        } else {
          _setOpen(openState);
        }
        document.cookie = `${SIDEBAR_COOKIE_NAME}=${openState}; path=/; max-age=${SIDEBAR_COOKIE_MAX_AGE}`;
      },
      [setOpenProp, open]
    );
    const toggleSidebar = reactExports.useCallback(() => {
      return isMobile ? setOpenMobile((open2) => !open2) : setOpen((open2) => !open2);
    }, [isMobile, setOpen, setOpenMobile]);
    reactExports.useEffect(() => {
      const handleKeyDown = (event) => {
        if (event.key === SIDEBAR_KEYBOARD_SHORTCUT && (event.metaKey || event.ctrlKey)) {
          event.preventDefault();
          toggleSidebar();
        }
      };
      window.addEventListener("keydown", handleKeyDown);
      return () => window.removeEventListener("keydown", handleKeyDown);
    }, [toggleSidebar]);
    const state = open ? "expanded" : "collapsed";
    const contextValue = reactExports.useMemo(
      () => ({
        state,
        open,
        setOpen,
        isMobile,
        openMobile,
        setOpenMobile,
        toggleSidebar
      }),
      [state, open, setOpen, isMobile, openMobile, setOpenMobile, toggleSidebar]
    );
    return /* @__PURE__ */ jsxRuntimeExports.jsx(SidebarContext.Provider, { value: contextValue, children: /* @__PURE__ */ jsxRuntimeExports.jsx(TooltipProvider, { delayDuration: 0, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        style: {
          "--sidebar-width": SIDEBAR_WIDTH,
          "--sidebar-width-icon": SIDEBAR_WIDTH_ICON,
          ...style
        },
        className: cn(
          "group/sidebar-wrapper flex min-h-svh w-full has-[[data-variant=inset]]:bg-sidebar",
          className
        ),
        ref,
        ...props,
        children
      }
    ) }) });
  }
);
SidebarProvider.displayName = "SidebarProvider";
const Sidebar = reactExports.forwardRef(
  ({
    side = "left",
    variant = "sidebar",
    collapsible = "offcanvas",
    className,
    children,
    ...props
  }, ref) => {
    const { isMobile, state, openMobile, setOpenMobile } = useSidebar();
    if (collapsible === "none") {
      return /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: cn(
            "flex h-full w-(--sidebar-width) flex-col bg-sidebar text-sidebar-foreground",
            className
          ),
          ref,
          ...props,
          children
        }
      );
    }
    if (isMobile) {
      return /* @__PURE__ */ jsxRuntimeExports.jsx(Sheet, { open: openMobile, onOpenChange: setOpenMobile, ...props, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
        SheetContent,
        {
          "data-sidebar": "sidebar",
          "data-mobile": "true",
          className: "w-(--sidebar-width) bg-sidebar p-0 text-sidebar-foreground [&>button]:hidden",
          style: {
            "--sidebar-width": SIDEBAR_WIDTH_MOBILE
          },
          side,
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(SheetHeader, { className: "sr-only", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(SheetTitle, { children: "Sidebar" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(SheetDescription, { children: "Displays the mobile sidebar." })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-full w-full flex-col", children })
          ]
        }
      ) });
    }
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        ref,
        className: "group peer hidden text-sidebar-foreground md:block",
        "data-state": state,
        "data-collapsible": state === "collapsed" ? collapsible : "",
        "data-variant": variant,
        "data-side": side,
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: cn(
                "relative w-(--sidebar-width) bg-transparent transition-[width] duration-200 ease-linear",
                "group-data-[collapsible=offcanvas]:w-0",
                "group-data-[side=right]:rotate-180",
                variant === "floating" || variant === "inset" ? "group-data-[collapsible=icon]:w-[calc(var(--sidebar-width-icon)_+_theme(spacing.4))]" : "group-data-[collapsible=icon]:w-(--sidebar-width-icon)"
              )
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: cn(
                "fixed inset-y-0 z-10 hidden h-svh w-(--sidebar-width) transition-[left,right,width] duration-200 ease-linear md:flex",
                side === "left" ? "left-0 group-data-[collapsible=offcanvas]:left-[calc(var(--sidebar-width)*-1)]" : "right-0 group-data-[collapsible=offcanvas]:right-[calc(var(--sidebar-width)*-1)]",
                // Adjust the padding for floating and inset variants.
                variant === "floating" || variant === "inset" ? "p-2 group-data-[collapsible=icon]:w-[calc(var(--sidebar-width-icon)_+_theme(spacing.4)_+2px)]" : "group-data-[collapsible=icon]:w-(--sidebar-width-icon) group-data-[side=left]:border-r group-data-[side=right]:border-l",
                className
              ),
              ...props,
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  "data-sidebar": "sidebar",
                  className: "flex h-full w-full flex-col bg-sidebar group-data-[variant=floating]:rounded-lg group-data-[variant=floating]:border group-data-[variant=floating]:border-sidebar-border group-data-[variant=floating]:shadow",
                  children
                }
              )
            }
          )
        ]
      }
    );
  }
);
Sidebar.displayName = "Sidebar";
const SidebarTrigger = reactExports.forwardRef(({ className, onClick, ...props }, ref) => {
  const { toggleSidebar } = useSidebar();
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    Button,
    {
      ref,
      "data-sidebar": "trigger",
      variant: "ghost",
      size: "icon",
      className: cn("h-7 w-7", className),
      onClick: (event) => {
        onClick?.(event);
        toggleSidebar();
      },
      ...props,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(PanelLeft, {}),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "sr-only", children: "Toggle Sidebar" })
      ]
    }
  );
});
SidebarTrigger.displayName = "SidebarTrigger";
const SidebarRail = reactExports.forwardRef(
  ({ className, ...props }, ref) => {
    const { toggleSidebar } = useSidebar();
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      "button",
      {
        ref,
        "data-sidebar": "rail",
        "aria-label": "Toggle Sidebar",
        tabIndex: -1,
        onClick: toggleSidebar,
        title: "Toggle Sidebar",
        className: cn(
          "absolute inset-y-0 z-20 hidden w-4 -translate-x-1/2 transition-all ease-linear after:absolute after:inset-y-0 after:left-1/2 after:w-[2px] hover:after:bg-sidebar-border group-data-[side=left]:-right-4 group-data-[side=right]:left-0 sm:flex",
          "[[data-side=left]_&]:cursor-w-resize [[data-side=right]_&]:cursor-e-resize",
          "[[data-side=left][data-state=collapsed]_&]:cursor-e-resize [[data-side=right][data-state=collapsed]_&]:cursor-w-resize",
          "group-data-[collapsible=offcanvas]:translate-x-0 group-data-[collapsible=offcanvas]:after:left-full group-data-[collapsible=offcanvas]:hover:bg-sidebar",
          "[[data-side=left][data-collapsible=offcanvas]_&]:-right-2",
          "[[data-side=right][data-collapsible=offcanvas]_&]:-left-2",
          className
        ),
        ...props
      }
    );
  }
);
SidebarRail.displayName = "SidebarRail";
const SidebarInset = reactExports.forwardRef(
  ({ className, ...props }, ref) => {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      "main",
      {
        ref,
        className: cn(
          "relative flex w-full flex-1 flex-col bg-background",
          "md:peer-data-[variant=inset]:m-2 md:peer-data-[state=collapsed]:peer-data-[variant=inset]:ml-2 md:peer-data-[variant=inset]:ml-0 md:peer-data-[variant=inset]:rounded-xl md:peer-data-[variant=inset]:shadow",
          className
        ),
        ...props
      }
    );
  }
);
SidebarInset.displayName = "SidebarInset";
const SidebarInput = reactExports.forwardRef(({ className, ...props }, ref) => {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Input,
    {
      ref,
      "data-sidebar": "input",
      className: cn(
        "h-8 w-full bg-background shadow-none focus-visible:ring-2 focus-visible:ring-sidebar-ring",
        className
      ),
      ...props
    }
  );
});
SidebarInput.displayName = "SidebarInput";
const SidebarHeader = reactExports.forwardRef(
  ({ className, ...props }, ref) => {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        ref,
        "data-sidebar": "header",
        className: cn("flex flex-col gap-2 p-2", className),
        ...props
      }
    );
  }
);
SidebarHeader.displayName = "SidebarHeader";
const SidebarFooter = reactExports.forwardRef(
  ({ className, ...props }, ref) => {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        ref,
        "data-sidebar": "footer",
        className: cn("flex flex-col gap-2 p-2", className),
        ...props
      }
    );
  }
);
SidebarFooter.displayName = "SidebarFooter";
const SidebarSeparator = reactExports.forwardRef(({ className, ...props }, ref) => {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Separator,
    {
      ref,
      "data-sidebar": "separator",
      className: cn("mx-2 w-auto bg-sidebar-border", className),
      ...props
    }
  );
});
SidebarSeparator.displayName = "SidebarSeparator";
const SidebarContent = reactExports.forwardRef(
  ({ className, ...props }, ref) => {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        ref,
        "data-sidebar": "content",
        className: cn(
          "flex min-h-0 flex-1 flex-col gap-2 overflow-auto group-data-[collapsible=icon]:overflow-hidden",
          className
        ),
        ...props
      }
    );
  }
);
SidebarContent.displayName = "SidebarContent";
const SidebarGroup = reactExports.forwardRef(
  ({ className, ...props }, ref) => {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        ref,
        "data-sidebar": "group",
        className: cn("relative flex w-full min-w-0 flex-col p-2", className),
        ...props
      }
    );
  }
);
SidebarGroup.displayName = "SidebarGroup";
const SidebarGroupLabel = reactExports.forwardRef(({ className, asChild = false, ...props }, ref) => {
  const Comp = asChild ? Slot : "div";
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Comp,
    {
      ref,
      "data-sidebar": "group-label",
      className: cn(
        "flex h-8 shrink-0 items-center rounded-md px-2 text-xs font-medium text-sidebar-foreground/70 outline-none ring-sidebar-ring transition-[margin,opacity] duration-200 ease-linear focus-visible:ring-2 [&>svg]:size-4 [&>svg]:shrink-0",
        "group-data-[collapsible=icon]:-mt-8 group-data-[collapsible=icon]:opacity-0",
        className
      ),
      ...props
    }
  );
});
SidebarGroupLabel.displayName = "SidebarGroupLabel";
const SidebarGroupAction = reactExports.forwardRef(({ className, asChild = false, ...props }, ref) => {
  const Comp = asChild ? Slot : "button";
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Comp,
    {
      ref,
      "data-sidebar": "group-action",
      className: cn(
        "absolute right-3 top-3.5 flex aspect-square w-5 items-center justify-center rounded-md p-0 text-sidebar-foreground outline-none ring-sidebar-ring cursor-pointer transition-transform hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2 [&>svg]:size-4 [&>svg]:shrink-0",
        // Increases the hit area of the button on mobile.
        "after:absolute after:-inset-2 after:md:hidden",
        "group-data-[collapsible=icon]:hidden",
        className
      ),
      ...props
    }
  );
});
SidebarGroupAction.displayName = "SidebarGroupAction";
const SidebarGroupContent = reactExports.forwardRef(
  ({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      ref,
      "data-sidebar": "group-content",
      className: cn("w-full text-sm", className),
      ...props
    }
  )
);
SidebarGroupContent.displayName = "SidebarGroupContent";
const SidebarMenu = reactExports.forwardRef(
  ({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
    "ul",
    {
      ref,
      "data-sidebar": "menu",
      className: cn("flex w-full min-w-0 flex-col gap-1", className),
      ...props
    }
  )
);
SidebarMenu.displayName = "SidebarMenu";
const SidebarMenuItem = reactExports.forwardRef(
  ({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
    "li",
    {
      ref,
      "data-sidebar": "menu-item",
      className: cn("group/menu-item relative", className),
      ...props
    }
  )
);
SidebarMenuItem.displayName = "SidebarMenuItem";
const sidebarMenuButtonVariants = cva(
  "peer/menu-button flex w-full items-center gap-2 overflow-hidden rounded-md p-2 text-left text-sm outline-none ring-sidebar-ring cursor-pointer transition-[width,height,padding] hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2 active:bg-sidebar-accent active:text-sidebar-accent-foreground disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed group-has-[[data-sidebar=menu-action]]/menu-item:pr-8 aria-disabled:pointer-events-none aria-disabled:opacity-50 data-[active=true]:bg-sidebar-accent data-[active=true]:font-medium data-[active=true]:text-sidebar-accent-foreground data-[state=open]:hover:bg-sidebar-accent data-[state=open]:hover:text-sidebar-accent-foreground group-data-[collapsible=icon]:!size-8 group-data-[collapsible=icon]:!p-2 [&>span:last-child]:truncate [&>svg]:size-4 [&>svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
        outline: "bg-background shadow-[0_0_0_1px_var(--sidebar-border)] hover:bg-sidebar-accent hover:text-sidebar-accent-foreground hover:shadow-[0_0_0_1px_var(--sidebar-accent)]"
      },
      size: {
        default: "h-8 text-sm",
        sm: "h-7 text-xs",
        lg: "h-12 text-sm group-data-[collapsible=icon]:!p-0"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default"
    }
  }
);
const SidebarMenuButton = reactExports.forwardRef(
  ({
    asChild = false,
    isActive = false,
    variant = "default",
    size = "default",
    tooltip,
    className,
    ...props
  }, ref) => {
    const Comp = asChild ? Slot : "button";
    const { isMobile, state } = useSidebar();
    const button = /* @__PURE__ */ jsxRuntimeExports.jsx(
      Comp,
      {
        ref,
        "data-sidebar": "menu-button",
        "data-size": size,
        "data-active": isActive,
        className: cn(sidebarMenuButtonVariants({ variant, size }), className),
        ...props
      }
    );
    if (!tooltip) {
      return button;
    }
    if (typeof tooltip === "string") {
      tooltip = {
        children: tooltip
      };
    }
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(Tooltip, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(TooltipTrigger, { asChild: true, children: button }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        TooltipContent,
        {
          side: "right",
          align: "center",
          hidden: state !== "collapsed" || isMobile,
          ...tooltip
        }
      )
    ] });
  }
);
SidebarMenuButton.displayName = "SidebarMenuButton";
const SidebarMenuAction = reactExports.forwardRef(({ className, asChild = false, showOnHover = false, ...props }, ref) => {
  const Comp = asChild ? Slot : "button";
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Comp,
    {
      ref,
      "data-sidebar": "menu-action",
      className: cn(
        "absolute right-1 top-1.5 flex aspect-square w-5 items-center justify-center rounded-md p-0 text-sidebar-foreground outline-none ring-sidebar-ring cursor-pointer transition-transform hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2 peer-hover/menu-button:text-sidebar-accent-foreground [&>svg]:size-4 [&>svg]:shrink-0",
        // Increases the hit area of the button on mobile.
        "after:absolute after:-inset-2 after:md:hidden",
        "peer-data-[size=sm]/menu-button:top-1",
        "peer-data-[size=default]/menu-button:top-1.5",
        "peer-data-[size=lg]/menu-button:top-2.5",
        "group-data-[collapsible=icon]:hidden",
        showOnHover && "group-focus-within/menu-item:opacity-100 group-hover/menu-item:opacity-100 data-[state=open]:opacity-100 peer-data-[active=true]/menu-button:text-sidebar-accent-foreground md:opacity-0",
        className
      ),
      ...props
    }
  );
});
SidebarMenuAction.displayName = "SidebarMenuAction";
const SidebarMenuBadge = reactExports.forwardRef(
  ({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      ref,
      "data-sidebar": "menu-badge",
      className: cn(
        "pointer-events-none absolute right-1 flex h-5 min-w-5 select-none items-center justify-center rounded-md px-1 text-xs font-medium tabular-nums text-sidebar-foreground",
        "peer-hover/menu-button:text-sidebar-accent-foreground peer-data-[active=true]/menu-button:text-sidebar-accent-foreground",
        "peer-data-[size=sm]/menu-button:top-1",
        "peer-data-[size=default]/menu-button:top-1.5",
        "peer-data-[size=lg]/menu-button:top-2.5",
        "group-data-[collapsible=icon]:hidden",
        className
      ),
      ...props
    }
  )
);
SidebarMenuBadge.displayName = "SidebarMenuBadge";
const SidebarMenuSkeleton = reactExports.forwardRef(({ className, showIcon = false, ...props }, ref) => {
  const width = reactExports.useMemo(() => {
    return `${Math.floor(Math.random() * 40) + 50}%`;
  }, []);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      ref,
      "data-sidebar": "menu-skeleton",
      className: cn("flex h-8 items-center gap-2 rounded-md px-2", className),
      ...props,
      children: [
        showIcon && /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "size-4 rounded-md", "data-sidebar": "menu-skeleton-icon" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Skeleton,
          {
            className: "h-4 max-w-(--skeleton-width) flex-1",
            "data-sidebar": "menu-skeleton-text",
            style: {
              "--skeleton-width": width
            }
          }
        )
      ]
    }
  );
});
SidebarMenuSkeleton.displayName = "SidebarMenuSkeleton";
const SidebarMenuSub = reactExports.forwardRef(
  ({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
    "ul",
    {
      ref,
      "data-sidebar": "menu-sub",
      className: cn(
        "mx-3.5 flex min-w-0 translate-x-px flex-col gap-1 border-l border-sidebar-border px-2.5 py-0.5",
        "group-data-[collapsible=icon]:hidden",
        className
      ),
      ...props
    }
  )
);
SidebarMenuSub.displayName = "SidebarMenuSub";
const SidebarMenuSubItem = reactExports.forwardRef(
  ({ ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx("li", { ref, ...props })
);
SidebarMenuSubItem.displayName = "SidebarMenuSubItem";
const SidebarMenuSubButton = reactExports.forwardRef(({ asChild = false, size = "md", isActive, className, ...props }, ref) => {
  const Comp = asChild ? Slot : "a";
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Comp,
    {
      ref,
      "data-sidebar": "menu-sub-button",
      "data-size": size,
      "data-active": isActive,
      className: cn(
        "flex h-7 min-w-0 -translate-x-px items-center gap-2 overflow-hidden rounded-md px-2 text-sidebar-foreground outline-none ring-sidebar-ring cursor-pointer hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2 active:bg-sidebar-accent active:text-sidebar-accent-foreground disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed aria-disabled:pointer-events-none aria-disabled:opacity-50 [&>span:last-child]:truncate [&>svg]:size-4 [&>svg]:shrink-0 [&>svg]:text-sidebar-accent-foreground",
        "data-[active=true]:bg-sidebar-accent data-[active=true]:text-sidebar-accent-foreground",
        size === "sm" && "text-xs",
        size === "md" && "text-sm",
        "group-data-[collapsible=icon]:hidden",
        className
      ),
      ...props
    }
  );
});
SidebarMenuSubButton.displayName = "SidebarMenuSubButton";
const NAV = [
  { title: "Funil de clientes", url: "/crm", icon: UsersRound },
  { title: "Catálogo de serviços", url: "/crm/servicos", icon: Package }
];
function CrmSidebar() {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  async function logout() {
    await supabase.auth.signOut();
    window.location.href = "/login";
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    Sidebar,
    {
      collapsible: "icon",
      className: "[&_[data-sidebar=sidebar]]:!bg-[linear-gradient(180deg,rgba(17,38,33,0.98),rgba(9,22,19,0.98))] [&_[data-sidebar=sidebar]]:!text-[#f2f7f4] [&_[data-sidebar=sidebar]]:border-r [&_[data-sidebar=sidebar]]:border-emerald-950/40",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(SidebarHeader, { className: "border-b border-sidebar-border", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/", className: "flex items-center gap-2 px-2 py-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: logoUrl, alt: "Orientamais", className: "h-8 w-auto shrink-0" }),
          !collapsed && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "leading-tight", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm font-bold", children: "Orientamais" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[0.6rem] tracking-[0.25em] text-muted-foreground uppercase", children: "CRM" })
          ] })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(SidebarContent, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(SidebarGroup, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(SidebarGroupLabel, { className: "text-[#d7e7df]/75", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(LayoutGrid, { className: "h-3 w-3 mr-1.5 inline" }),
            " Navegação"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(SidebarGroupContent, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(SidebarMenu, { children: NAV.map((item) => {
            const active = item.url === "/crm" ? pathname === "/crm" : pathname.startsWith(item.url);
            return /* @__PURE__ */ jsxRuntimeExports.jsx(SidebarMenuItem, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(SidebarMenuButton, { asChild: true, isActive: active, tooltip: item.title, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: item.url, className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(item.icon, { className: "h-4 w-4" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: item.title })
            ] }) }) }, item.url);
          }) }) })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(SidebarFooter, { className: "border-t border-emerald-950/40", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SidebarMenu, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(SidebarMenuItem, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(SidebarMenuButton, { onClick: logout, tooltip: "Sair", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(LogOut, { className: "h-4 w-4" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Sair" })
        ] }) }) }) })
      ]
    }
  );
}
function CrmShell({
  title,
  subtitle,
  actions,
  children
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(SidebarProvider, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "min-h-screen flex w-full",
      style: {
        background: "var(--gradient-hero)",
        "--sidebar": "oklch(0.22 0.035 171)",
        "--sidebar-foreground": "oklch(0.98 0.01 170)",
        "--sidebar-primary": "oklch(0.74 0.13 168)",
        "--sidebar-primary-foreground": "oklch(0.2 0.03 171)",
        "--sidebar-accent": "oklch(0.28 0.03 171)",
        "--sidebar-accent-foreground": "oklch(0.98 0.01 170)",
        "--sidebar-border": "oklch(0.34 0.04 171 / 0.55)",
        "--sidebar-ring": "oklch(0.74 0.13 168)"
      },
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CrmSidebar, {}),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 flex flex-col min-w-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { className: "h-14 flex items-center gap-3 px-4 border-b border-border/40 bg-background/40 backdrop-blur sticky top-0 z-10", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(SidebarTrigger, {}),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-sm font-bold truncate", children: title }),
              subtitle && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[0.7rem] text-muted-foreground truncate", children: subtitle })
            ] }),
            actions
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("main", { className: "flex-1 overflow-auto", children })
        ] })
      ]
    }
  ) });
}
const PAYMENT_LABELS = {
  a_vista: "À vista",
  parcelado: "Parcelado",
  recorrente_mensal: "Recorrente mensal",
  recorrente_anual: "Recorrente anual",
  permuta: "Permuta",
  outro: "Outro"
};
const PROPOSAL_STATUS_LABELS = {
  rascunho: "Rascunho",
  enviada: "Enviada",
  aceita: "Aceita",
  recusada: "Recusada"
};
const ITEM_STATUS_LABELS = {
  proposto: "Proposto",
  aprovado: "Aprovado",
  em_execucao: "Em execução",
  entregue: "Entregue",
  cancelado: "Cancelado"
};
const PROPOSAL_STATUS_STYLES = {
  rascunho: "bg-slate-500/10 text-slate-700 dark:text-slate-300 border-slate-500/30",
  enviada: "bg-sky-500/10 text-sky-700 dark:text-sky-300 border-sky-500/30",
  aceita: "bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border-emerald-500/30",
  recusada: "bg-rose-500/10 text-rose-700 dark:text-rose-300 border-rose-500/30"
};
const ITEM_STATUS_STYLES = {
  proposto: "bg-slate-500/10 text-slate-700 dark:text-slate-300 border-slate-500/30",
  aprovado: "bg-sky-500/10 text-sky-700 dark:text-sky-300 border-sky-500/30",
  em_execucao: "bg-amber-500/10 text-amber-700 dark:text-amber-300 border-amber-500/30",
  entregue: "bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border-emerald-500/30",
  cancelado: "bg-rose-500/10 text-rose-700 dark:text-rose-300 border-rose-500/30"
};
const GENERAL_WHATSAPP_TEMPLATES = [
  {
    titulo: "Abertura leve",
    categoria: "abordagem",
    mensagem: "Olá, [nome]! Tudo bem?\n\nEstou entrando em contato porque vi que o seu negócio pode se beneficiar de uma abordagem mais estruturada para gerar oportunidades. Posso te mostrar, em poucas mensagens, como isso funciona na prática?"
  },
  {
    titulo: "Conexão com dor",
    categoria: "abordagem",
    mensagem: "Olá, [nome]! Passei por aqui porque identifiquei um cenário comum em empresas do seu segmento: muito esforço comercial, mas pouca previsibilidade.\n\nEstamos mapeando alguns cenários para entender se faz sentido te ajudar nisso. Posso te explicar em 2 minutos?"
  },
  {
    titulo: "Follow-up de valor",
    categoria: "follow-up",
    mensagem: "Oi, [nome]! Passando para reforçar o ponto que te mandei.\n\nO foco aqui não é vender qualquer coisa, e sim enxergar o melhor caminho para o seu negócio. Se quiser, eu te envio uma visão resumida do que faria sentido para você."
  },
  {
    titulo: "Fechamento do próximo passo",
    categoria: "fechamento",
    mensagem: "Se fizer sentido para você, podemos marcar uma conversa rápida para eu te mostrar os próximos passos e te passar uma ideia objetiva de como começar.\n\nPrefere que eu te mande duas opções de horário?"
  }
];
function formatBRL(value) {
  const n = Number(value ?? 0);
  return n.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}
function parseEntregaveis(input) {
  if (Array.isArray(input)) return input.map((v) => String(v));
  if (typeof input === "string") {
    try {
      const parsed = JSON.parse(input);
      return Array.isArray(parsed) ? parsed.map((v) => String(v)) : [];
    } catch {
      return input.split("\n").map((s) => s.trim()).filter(Boolean);
    }
  }
  return [];
}
function parseWhatsAppScripts(input) {
  const normalize = (raw, index) => {
    if (!raw) return null;
    if (typeof raw === "string") {
      const mensagem2 = raw.trim();
      if (!mensagem2) return null;
      return {
        id: `script-${index}`,
        titulo: `Script ${index + 1}`,
        categoria: "geral",
        mensagem: mensagem2
      };
    }
    if (typeof raw !== "object") return null;
    const obj = raw;
    const mensagem = String(obj.mensagem ?? "").trim();
    if (!mensagem) return null;
    return {
      id: String(obj.id ?? `script-${index}`),
      titulo: String(obj.titulo ?? `Script ${index + 1}`),
      categoria: String(obj.categoria ?? "geral"),
      mensagem,
      observacao: obj.observacao ? String(obj.observacao) : null
    };
  };
  if (Array.isArray(input)) {
    return input.map(normalize).filter((v) => Boolean(v));
  }
  if (typeof input === "string") {
    try {
      const parsed = JSON.parse(input);
      return Array.isArray(parsed) ? parsed.map(normalize).filter((v) => Boolean(v)) : [];
    } catch {
      const parts = input.split(/\n{2,}/).map((s) => s.trim()).filter(Boolean);
      return parts.map((part, index) => normalize(part, index)).filter((v) => Boolean(v));
    }
  }
  return [];
}
function buildServiceWhatsAppScripts(service) {
  const serviceName = normalizeServiceName(service.nome);
  const serviceKey = normalizeServiceKey(service.nome);
  const description = cleanText(service.descricao);
  const deliverables = service.entregaveis.map((item) => cleanText(item)).filter(Boolean);
  const deliverablesText = joinPortuguese(deliverables);
  const price = service.valor_padrao ? formatBRL(service.valor_padrao) : null;
  const deadline = service.prazo_dias ? `${service.prazo_dias} dias` : null;
  const playbook = SERVICE_SPIN_PLAYBOOKS[serviceKey] ?? createGenericSpinPlaybook(serviceName);
  return playbook.map(
    (step) => createScript({
      titulo: step.titulo,
      categoria: step.categoria,
      mensagem: renderSpinTemplate(step.mensagem, {
        nome: "[nome]",
        servico: serviceName,
        descricao: description,
        entregaveis: deliverablesText,
        valor: price ?? "valor sob consulta",
        prazo: deadline ?? "prazo sob combinação"
      }),
      observacao: step.observacao ?? null
    })
  );
}
function normalizeServiceName(name) {
  const text = cleanText(name);
  return text || "o serviço";
}
function normalizeServiceKey(name) {
  return cleanText(name).toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]+/g, "_").replace(/^_+|_+$/g, "");
}
function cleanText(value) {
  return String(value ?? "").replace(/\s+/g, " ").trim();
}
function joinPortuguese(items) {
  if (items.length === 0) return "";
  if (items.length === 1) return items[0];
  if (items.length === 2) return `${items[0]} e ${items[1]}`;
  return `${items.slice(0, -1).join(", ")} e ${items[items.length - 1]}`;
}
function createScript(script) {
  return {
    id: globalThis.crypto?.randomUUID?.() ?? `script-${Date.now()}-${Math.random().toString(16).slice(2)}`,
    ...script
  };
}
function renderSpinTemplate(template, values) {
  return template.replace(/\{(\w+)\}/g, (_, key) => values[key] ?? `{${key}}`);
}
function createGenericSpinPlaybook(serviceName) {
  return [
    {
      titulo: `1. Abertura para ${serviceName}`,
      categoria: "abertura",
      mensagem: "Olá, [nome]! Tudo bem?\n\nQuero entender se faz sentido conversar sobre {servico} para o seu momento atual. Posso te fazer algumas perguntas rápidas?"
    },
    {
      titulo: "2. Situação atual",
      categoria: "situacao",
      mensagem: "Hoje, como vocês lidam com esse tema na prática?\n\nQuero entender o cenário atual para ver se {servico} realmente resolve algo relevante aí."
    },
    {
      titulo: "3. Problema principal",
      categoria: "problema",
      mensagem: "O que mais trava hoje: tempo, organização, visibilidade, padronização ou geração de resultado?\n\nPergunto porque é daí que a solução precisa partir."
    },
    {
      titulo: "4. Implicação",
      categoria: "implicacao",
      mensagem: "Se isso continuar do jeito que está, o impacto costuma aparecer em atraso, perda de oportunidade ou custo maior.\n\nÉ mais ou menos isso que está acontecendo aí também?"
    },
    {
      titulo: "5. Necessidade",
      categoria: "necessidade",
      mensagem: "Se {servico} resolvesse esse ponto com clareza e previsibilidade, o que mudaria mais para você nos próximos meses?"
    },
    {
      titulo: "6. Fechamento",
      categoria: "fechamento",
      mensagem: "Se fizer sentido, eu posso te mostrar como seria o caminho de implementação de {servico}, com escopo, prazo e investimento.\n\nPrefere que eu te envie uma proposta resumida ou marcamos uma conversa rápida?"
    }
  ];
}
const SERVICE_SPIN_PLAYBOOKS = {
  solucoes_empresariais: [
    {
      titulo: "1. Abertura - soluções empresariais",
      categoria: "abertura",
      mensagem: "Olá, [nome]! Tudo bem?\n\nEstou entrando em contato porque, em alguns negócios, não existe um único problema, mas vários pontos que se conectam: presença digital, marca, marketing, site, estrutura comercial e posicionamento.\n\nPosso te mostrar como isso funciona em uma conversa rápida?"
    },
    {
      titulo: "2. Situação atual - soluções empresariais",
      categoria: "situacao",
      mensagem: "Hoje, quais dessas frentes estão mais sensíveis para você: domínio e site, identidade visual, Google, marketing, consultoria estratégica ou proteção da marca?"
    },
    {
      titulo: "3. Problema - soluções empresariais",
      categoria: "problema",
      mensagem: "O que pesa mais hoje: a empresa está sem uma base digital consistente, sem clareza estratégica, sem previsibilidade comercial ou sem proteção e padronização da marca?"
    },
    {
      titulo: "4. Implicação - soluções empresariais",
      categoria: "implicacao",
      mensagem: "Quando essas frentes ficam desconectadas, o negócio perde autoridade, confiança e chance de venda. No fim, cada área puxa para um lado e o resultado fica mais lento.\n\nIsso tem acontecido por aí?"
    },
    {
      titulo: "5. Necessidade - soluções empresariais",
      categoria: "necessidade",
      mensagem: "Se você tivesse uma solução organizada, com prioridades claras e execução por etapas, isso ajudaria o negócio a ganhar mais consistência e resultado?"
    },
    {
      titulo: "6. Fechamento - soluções empresariais",
      categoria: "fechamento",
      mensagem: "Se fizer sentido, eu posso te apresentar uma proposta de soluções empresariais com diagnóstico inicial e os serviços que realmente fazem sentido para o seu caso.\n\nQuer que eu te envie uma visão resumida?"
    }
  ],
  configuracao_de_dominio: [
    {
      titulo: "1. Abertura - domínio",
      categoria: "abertura",
      mensagem: "Olá, [nome]! Tudo bem?\n\nVi que muitas empresas ainda têm dificuldade para organizar domínio, e-mail profissional e presença digital. Posso te mostrar como isso impacta a operação e a imagem da empresa?"
    },
    {
      titulo: "2. Situação atual - domínio",
      categoria: "situacao",
      mensagem: "Hoje vocês já têm domínio próprio, e-mails profissionais e apontamentos corretos no site e nos registros?\n\nQuero entender como está essa estrutura hoje."
    },
    {
      titulo: "3. Problema - domínio",
      categoria: "problema",
      mensagem: "O que mais está gerando dor nesse ponto: e-mails que não funcionam, falta de padronização, dificuldade para configurar acesso ou insegurança técnica?"
    },
    {
      titulo: "4. Implicação - domínio",
      categoria: "implicacao",
      mensagem: "Quando domínio e e-mail não estão bem organizados, a empresa perde credibilidade e ainda corre risco de travar processos simples de contato e entrega.\n\nIsso tem acontecido por aí?"
    },
    {
      titulo: "5. Necessidade - domínio",
      categoria: "necessidade",
      mensagem: "Se essa estrutura ficasse pronta e estável, ajudaria vocês a ganhar mais profissionalismo e segurança no dia a dia?"
    },
    {
      titulo: "6. Fechamento - domínio",
      categoria: "fechamento",
      mensagem: "Se fizer sentido, eu posso te enviar um escopo de configuração de domínio com o que entra, prazo e investimento.\n\nQuer que eu te mande uma proposta objetiva?"
    }
  ],
  consultoria_empresarial: [
    {
      titulo: "1. Abertura - consultoria",
      categoria: "abertura",
      mensagem: "Olá, [nome]! Tudo bem?\n\nEstou entrando em contato porque a consultoria empresarial costuma fazer diferença quando o negócio já cresceu, mas ainda falta organização para escalar. Posso te mostrar como isso funciona?"
    },
    {
      titulo: "2. Situação atual - consultoria",
      categoria: "situacao",
      mensagem: "Hoje, quais áreas estão mais sensíveis aí dentro: comercial, financeiro, processos, gestão ou posicionamento?"
    },
    {
      titulo: "3. Problema - consultoria",
      categoria: "problema",
      mensagem: "O principal problema hoje é falta de clareza, decisão lenta, time desalinhado ou dificuldade para transformar esforço em resultado?"
    },
    {
      titulo: "4. Implicação - consultoria",
      categoria: "implicacao",
      mensagem: "Quando isso continua, normalmente a empresa cresce de forma desorganizada e o dono precisa apagar incêndio o tempo todo. Isso está acontecendo também?"
    },
    {
      titulo: "5. Necessidade - consultoria",
      categoria: "necessidade",
      mensagem: "Se a consultoria trouxesse direção, rotina e prioridade clara, isso ajudaria vocês a avançar com mais segurança?"
    },
    {
      titulo: "6. Fechamento - consultoria",
      categoria: "fechamento",
      mensagem: "Se você quiser, eu posso montar uma proposta de consultoria com diagnóstico, direcionamento e próximos passos.\n\nQuer que eu te apresente o formato ideal?"
    }
  ],
  criacao_loja_virtual: [
    {
      titulo: "1. Abertura - loja virtual",
      categoria: "abertura",
      mensagem: "Olá, [nome]! Tudo bem?\n\nEstou falando com você porque uma loja virtual bem estruturada pode abrir um novo canal de vendas para o seu negócio. Posso te mostrar o caminho de forma simples?"
    },
    {
      titulo: "2. Situação atual - loja virtual",
      categoria: "situacao",
      mensagem: "Hoje vocês vendem só pelo WhatsApp, redes sociais ou já têm uma loja com catálogo e checkout organizados?"
    },
    {
      titulo: "3. Problema - loja virtual",
      categoria: "problema",
      mensagem: "O que está travando mais: falta de canal, dificuldade para organizar produtos, baixa conversão ou atendimento manual demais?"
    },
    {
      titulo: "4. Implicação - loja virtual",
      categoria: "implicacao",
      mensagem: "Sem uma loja virtual, a empresa depende muito de atendimento humano e acaba perdendo vendas fora do horário comercial. Isso já pesa hoje?"
    },
    {
      titulo: "5. Necessidade - loja virtual",
      categoria: "necessidade",
      mensagem: "Se a loja virtual ajudasse a vender com mais previsibilidade e menos esforço operacional, isso faria diferença para você?"
    },
    {
      titulo: "6. Fechamento - loja virtual",
      categoria: "fechamento",
      mensagem: "Se fizer sentido, eu posso te enviar uma proposta com estrutura, prazo e etapas da loja virtual.\n\nQuer que eu organize isso para você?"
    }
  ],
  criacao_site: [
    {
      titulo: "1. Abertura - site",
      categoria: "abertura",
      mensagem: "Olá, [nome]! Tudo bem?\n\nVi que muitas empresas perdem oportunidade por não terem um site claro e profissional. Posso te mostrar como um site bem feito apoia vendas e credibilidade?"
    },
    {
      titulo: "2. Situação atual - site",
      categoria: "situacao",
      mensagem: "Hoje vocês já têm um site ativo? Se sim, ele está trazendo resultado ou funciona só como presença institucional?"
    },
    {
      titulo: "3. Problema - site",
      categoria: "problema",
      mensagem: "O que mais pega hoje: site desatualizado, dificuldade para transmitir valor, pouca conversão ou navegação ruim no celular?"
    },
    {
      titulo: "4. Implicação - site",
      categoria: "implicacao",
      mensagem: "Quando o site não comunica bem, a empresa perde autoridade e o cliente segue para o concorrente sem pedir informação. Isso acontece com frequência aí?"
    },
    {
      titulo: "5. Necessidade - site",
      categoria: "necessidade",
      mensagem: "Se o site ajudasse a gerar mais confiança e apoio comercial, isso mudaria a forma como vocês se apresentam ao mercado?"
    },
    {
      titulo: "6. Fechamento - site",
      categoria: "fechamento",
      mensagem: "Se quiser, eu posso te mandar uma proposta para criação de site com escopo, prazo e formato de entrega.\n\nPosso seguir por aqui?"
    }
  ],
  estrategias_de_negocio: [
    {
      titulo: "1. Abertura - estratégia",
      categoria: "abertura",
      mensagem: "Olá, [nome]! Tudo bem?\n\nEstou entrando em contato porque muita empresa precisa de direção estratégica antes de crescer mais. Posso te mostrar um diagnóstico inicial sobre isso?"
    },
    {
      titulo: "2. Situação atual - estratégia",
      categoria: "situacao",
      mensagem: "Hoje vocês têm metas claras, prioridade definida e rotina de acompanhamento, ou isso ainda fica mais no improviso?"
    },
    {
      titulo: "3. Problema - estratégia",
      categoria: "problema",
      mensagem: "O principal problema é falta de foco, dificuldade para priorizar, time desalinhado ou objetivos que não viram ação prática?"
    },
    {
      titulo: "4. Implicação - estratégia",
      categoria: "implicacao",
      mensagem: "Sem estratégia clara, o negócio cresce de forma reativa e o resultado fica instável. Isso tem gerado impacto aí também?"
    },
    {
      titulo: "5. Necessidade - estratégia",
      categoria: "necessidade",
      mensagem: "Se houvesse um plano simples com prioridades, indicadores e próximo passo definido, isso ajudaria vocês a andar com mais segurança?"
    },
    {
      titulo: "6. Fechamento - estratégia",
      categoria: "fechamento",
      mensagem: "Se fizer sentido, eu posso te enviar uma proposta de estratégia com diagnóstico, direcionamento e plano de ação.\n\nQuer que eu estruture isso para você?"
    }
  ],
  google_meu_negocio: [
    {
      titulo: "1. Abertura - Google Meu Negócio",
      categoria: "abertura",
      mensagem: "Olá, [nome]! Tudo bem?\n\nEstou entrando em contato porque o Google Meu Negócio pode ajudar muito empresas que querem ser encontradas com mais facilidade. Posso te mostrar o impacto disso?"
    },
    {
      titulo: "2. Situação atual - Google Meu Negócio",
      categoria: "situacao",
      mensagem: "Hoje o perfil da empresa no Google está atualizado, com fotos, horários, avaliações e link correto para contato?"
    },
    {
      titulo: "3. Problema - Google Meu Negócio",
      categoria: "problema",
      mensagem: "O que mais está pegando hoje: perfil desatualizado, poucas avaliações, baixa visibilidade local ou dificuldade para gerar contato?"
    },
    {
      titulo: "4. Implicação - Google Meu Negócio",
      categoria: "implicacao",
      mensagem: "Quando o perfil não está bem otimizado, a empresa perde buscas locais e deixa oportunidades na mão. Isso já acontece aí com frequência?"
    },
    {
      titulo: "5. Necessidade - Google Meu Negócio",
      categoria: "necessidade",
      mensagem: "Se o perfil passasse a trazer mais visibilidade, confiança e chamadas diretas, isso ajudaria nas vendas?"
    },
    {
      titulo: "6. Fechamento - Google Meu Negócio",
      categoria: "fechamento",
      mensagem: "Se quiser, eu posso te mandar uma proposta de otimização e gestão do perfil no Google.\n\nQuer seguir com isso?"
    }
  ],
  identidade_visual: [
    {
      titulo: "1. Abertura - identidade visual",
      categoria: "abertura",
      mensagem: "Olá, [nome]! Tudo bem?\n\nEstou entrando em contato porque a identidade visual certa ajuda a empresa a parecer mais forte e vender com mais confiança. Posso te mostrar por que isso pesa tanto?"
    },
    {
      titulo: "2. Situação atual - identidade visual",
      categoria: "situacao",
      mensagem: "Hoje a marca está consistente em todos os pontos de contato, ou cada material parece de um jeito diferente?"
    },
    {
      titulo: "3. Problema - identidade visual",
      categoria: "problema",
      mensagem: "O que mais incomoda hoje: falta de padronização, marca sem personalidade, baixa percepção de valor ou dificuldade para aplicar a identidade no dia a dia?"
    },
    {
      titulo: "4. Implicação - identidade visual",
      categoria: "implicacao",
      mensagem: "Quando a identidade visual é fraca ou inconsistente, o cliente percebe menos valor e confia menos na marca. Isso já acontece por aí?"
    },
    {
      titulo: "5. Necessidade - identidade visual",
      categoria: "necessidade",
      mensagem: "Se a marca ficasse mais profissional, coerente e fácil de aplicar, isso ajudaria na percepção do negócio?"
    },
    {
      titulo: "6. Fechamento - identidade visual",
      categoria: "fechamento",
      mensagem: "Se fizer sentido, eu posso te mandar uma proposta de identidade visual com escopo e entregáveis.\n\nQuer que eu organize isso?"
    }
  ],
  marketing: [
    {
      titulo: "1. Abertura - marketing",
      categoria: "abertura",
      mensagem: "Olá, [nome]! Tudo bem?\n\nQueria te mostrar como uma estrutura de marketing mais clara pode gerar demanda de forma mais previsível. Posso te fazer algumas perguntas rápidas?"
    },
    {
      titulo: "2. Situação atual - marketing",
      categoria: "situacao",
      mensagem: "Hoje vocês estão rodando marketing de forma contínua ou as ações ainda acontecem mais quando sobra tempo?"
    },
    {
      titulo: "3. Problema - marketing",
      categoria: "problema",
      mensagem: "O principal problema hoje é falta de constância, baixa geração de leads, dificuldade de medir resultado ou comunicação pouco clara?"
    },
    {
      titulo: "4. Implicação - marketing",
      categoria: "implicacao",
      mensagem: "Sem marketing estruturado, o negócio depende de indicação e do acaso. Isso limita o crescimento e a previsibilidade. Faz sentido para você?"
    },
    {
      titulo: "5. Necessidade - marketing",
      categoria: "necessidade",
      mensagem: "Se o marketing começasse a gerar mais oportunidade qualificada com rotina e método, isso ajudaria muito o negócio?"
    },
    {
      titulo: "6. Fechamento - marketing",
      categoria: "fechamento",
      mensagem: "Se quiser, eu posso te enviar uma proposta com estratégia, execução e acompanhamento de marketing.\n\nQuer que eu monte isso?"
    }
  ],
  registro_de_marca: [
    {
      titulo: "1. Abertura - registro de marca",
      categoria: "abertura",
      mensagem: "Olá, [nome]! Tudo bem?\n\nEstou entrando em contato porque o registro de marca é uma etapa importante para proteger o negócio. Posso te explicar rapidamente por que isso evita dor de cabeça?"
    },
    {
      titulo: "2. Situação atual - registro de marca",
      categoria: "situacao",
      mensagem: "Hoje a marca já está registrada ou vocês ainda estão em fase de uso sem essa proteção formal?"
    },
    {
      titulo: "3. Problema - registro de marca",
      categoria: "problema",
      mensagem: "O que mais preocupa hoje: risco jurídico, conflito com terceiros, dúvida sobre disponibilidade ou falta de orientação no processo?"
    },
    {
      titulo: "4. Implicação - registro de marca",
      categoria: "implicacao",
      mensagem: "Sem registro, a empresa pode investir em divulgação e depois ter problema para manter o nome ou o posicionamento. Isso já passou pela cabeça de vocês?"
    },
    {
      titulo: "5. Necessidade - registro de marca",
      categoria: "necessidade",
      mensagem: "Se a marca ficasse protegida e o processo conduzido com segurança, isso traria mais tranquilidade para seguir crescendo?"
    },
    {
      titulo: "6. Fechamento - registro de marca",
      categoria: "fechamento",
      mensagem: "Se fizer sentido, eu posso te enviar uma proposta para orientar o registro da marca com escopo e prazo.\n\nQuer que eu te passe os próximos passos?"
    }
  ]
};
export {
  CrmShell as C,
  GENERAL_WHATSAPP_TEMPLATES as G,
  ITEM_STATUS_LABELS as I,
  PROPOSAL_STATUS_LABELS as P,
  PROPOSAL_STATUS_STYLES as a,
  ITEM_STATUS_STYLES as b,
  PAYMENT_LABELS as c,
  cn as d,
  parseWhatsAppScripts as e,
  formatBRL as f,
  buildServiceWhatsAppScripts as g,
  parseEntregaveis as p
};
