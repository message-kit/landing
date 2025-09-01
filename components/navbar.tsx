import { Book, ChevronRightIcon, Menu, Sunset, Trees, Zap } from "lucide-react";

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import Image from "next/image";
import Link from "next/link";

interface MenuItem {
    title: string;
    url: string;
    description?: string;
    icon?: React.ReactNode;
    items?: MenuItem[];
}

interface Navbar1Props {
    logo?: {
        url: string;
        src: string;
        alt: string;
        title: string;
    };
    menu?: MenuItem[];
    auth?: {
        login: {
            title: string;
            url: string;
        };
        signup: {
            title: string;
            url: string;
        };
    };
}

const Navbar1 = ({
    logo = {
        url: "https://messagekit.app",
        src: "/msgkit-transparent-2.png",
        alt: "logo",
        title: "Message Kit",
    },
    menu = [
        { title: "Home", url: "/" },
        { title: "Templates", url: "/templates" },
    ],
    auth = {
        login: { title: "Login", url: "#" },
        signup: { title: "Get Started", url: "#" },
    },
}: Navbar1Props) => {
    return (
        <section className="py-4">
            <div className="container">
                {/* Desktop Menu */}
                <nav className="hidden justify-between lg:flex">
                    <div className="flex items-center gap-6">
                        {/* Logo */}
                        <a href={logo.url} className="flex items-center gap-2">
                            <Image width={32} height={32} src={logo.src} className="max-h-8" alt={logo.alt} />
                            <span className="text-lg font-semibold tracking-tighter">{logo.title}</span>
                        </a>
                        <div className="flex items-center">
                            <NavigationMenu>
                                <NavigationMenuList>{menu.map((item) => renderMenuItem(item))}</NavigationMenuList>
                            </NavigationMenu>
                        </div>
                    </div>
                    <div className="flex gap-2 my-auto">
                        {/* <Button asChild variant="outline">
                            <a href={auth.login.url}>{auth.login.title}</a>
                        </Button> */}
                        <Button asChild>
                            <Link href={auth.signup.url}>
                                {auth.signup.title} <ChevronRightIcon />
                            </Link>
                        </Button>
                    </div>
                </nav>

                {/* Mobile Menu */}
                <div className="block lg:hidden">
                    <div className="flex items-center justify-between">
                        {/* Logo */}
                        <a href={logo.url} className="flex items-center gap-2">
                            <Image width={32} height={32} src={logo.src} className="max-h-8" alt={logo.alt} />
                        </a>
                        <Sheet>
                            <SheetTrigger asChild>
                                <Button variant="outline" size="icon">
                                    <Menu className="size-4" />
                                </Button>
                            </SheetTrigger>
                            <SheetContent className="overflow-y-auto">
                                <SheetHeader>
                                    <SheetTitle>
                                        <a href={logo.url} className="flex items-center gap-2">
                                            <Image
                                                width={32}
                                                height={32}
                                                src={logo.src}
                                                className="max-h-8"
                                                alt={logo.alt}
                                            />
                                        </a>
                                    </SheetTitle>
                                </SheetHeader>
                                <div className="flex flex-col gap-6 p-4">
                                    <Accordion type="single" collapsible className="flex w-full flex-col gap-4">
                                        {menu.map((item) => renderMobileMenuItem(item))}
                                    </Accordion>

                                    <div className="flex flex-col gap-3">
                                        {/* <Button asChild variant="outline">
                                            <a href={auth.login.url}>{auth.login.title}</a>
                                        </Button> */}
                                        <Button asChild>
                                            <Link href={auth.signup.url}>
                                                {auth.signup.title}
                                                <ChevronRightIcon />
                                            </Link>
                                        </Button>
                                    </div>
                                </div>
                            </SheetContent>
                        </Sheet>
                    </div>
                </div>
            </div>
        </section>
    );
};

const renderMenuItem = (item: MenuItem) => {
    if (item.items) {
        return (
            <NavigationMenuItem key={item.title}>
                <NavigationMenuTrigger>{item.title}</NavigationMenuTrigger>
                <NavigationMenuContent className="bg-popover text-popover-foreground">
                    {item.items.map((subItem) => (
                        <NavigationMenuLink asChild key={subItem.title} className="w-80">
                            <SubMenuLink item={subItem} />
                        </NavigationMenuLink>
                    ))}
                </NavigationMenuContent>
            </NavigationMenuItem>
        );
    }

    return (
        <NavigationMenuItem key={item.title}>
            <NavigationMenuLink
                href={item.url}
                className="bg-background hover:bg-muted hover:text-accent-foreground group inline-flex h-10 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors"
            >
                {item.title}
            </NavigationMenuLink>
        </NavigationMenuItem>
    );
};

const renderMobileMenuItem = (item: MenuItem) => {
    if (item.items) {
        return (
            <AccordionItem key={item.title} value={item.title} className="border-b-0">
                <AccordionTrigger className="text-md py-0 font-semibold hover:no-underline">
                    {item.title}
                </AccordionTrigger>
                <AccordionContent className="mt-2">
                    {item.items.map((subItem) => (
                        <SubMenuLink key={subItem.title} item={subItem} />
                    ))}
                </AccordionContent>
            </AccordionItem>
        );
    }

    return (
        <a key={item.title} href={item.url} className="text-md font-semibold">
            {item.title}
        </a>
    );
};

const SubMenuLink = ({ item }: { item: MenuItem }) => {
    return (
        <a
            className="hover:bg-muted hover:text-accent-foreground flex select-none flex-row gap-4 rounded-md p-3 leading-none no-underline outline-none transition-colors"
            href={item.url}
        >
            <div className="text-foreground">{item.icon}</div>
            <div>
                <div className="text-sm font-semibold">{item.title}</div>
                {item.description && <p className="text-muted-foreground text-sm leading-snug">{item.description}</p>}
            </div>
        </a>
    );
};

export { Navbar1 };

// "use client";

// import { MenuIcon } from "lucide-react";

// import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
// import { Button } from "@/components/ui/button";
// import {
//     NavigationMenu,
//     NavigationMenuContent,
//     NavigationMenuItem,
//     NavigationMenuLink,
//     NavigationMenuList,
//     NavigationMenuTrigger,
//     navigationMenuTriggerStyle,
// } from "@/components/ui/navigation-menu";
// import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
// import Image from "next/image";

// const Navbar5 = () => {
//     const features = [
//         {
//             title: "Editor",
//             description: "Easily create and edit messages with powerful message builder.",
//             href: "#",
//         },
//         {
//             title: "Templates",
//             description: "Get access to a library of templates made by the community.",
//             href: "#",
//         },
//         {
//             title: "Preview",
//             description: "Preview your message in real-time before sending it.",
//             href: "#",
//         },
//         {
//             title: "Components V2",
//             description: "Take full control over the layout and design of your messages.",
//             href: "#",
//         },
//     ];

//     return (
//         <section className="py-4">
//             <div className="container">
//                 <nav className="flex items-center justify-between">
//                     <a href="https://www.shadcnblocks.com" className="flex items-center gap-2">
//                         <Image
//                             src="/msgkit-transparent-2.png"
//                             className="max-h-8"
//                             alt="Message Kit"
//                             width={32}
//                             height={32}
//                         />
//                         <span className="text-lg font-display font-semibold">Message Kit</span>
//                     </a>
//                     <NavigationMenu className="hidden lg:block">
//                         <NavigationMenuList>
//                             <NavigationMenuItem>
//                                 <NavigationMenuTrigger>Features</NavigationMenuTrigger>
//                                 <NavigationMenuContent>
//                                     <div className="grid w-[600px] grid-cols-2 gap-1 p-2">
//                                         {features.map((feature, index) => (
//                                             <NavigationMenuLink
//                                                 href={feature.href}
//                                                 key={`${index}-${feature.title}`}
//                                                 className="rounded-md p-3 transition-colors hover:bg-muted/70"
//                                             >
//                                                 <div key={feature.title}>
//                                                     <p className="mb-1.5 font-semibold text-foreground">
//                                                         {feature.title}
//                                                     </p>
//                                                     <p className="text-sm text-muted-foreground">
//                                                         {feature.description}
//                                                     </p>
//                                                 </div>
//                                             </NavigationMenuLink>
//                                         ))}
//                                     </div>
//                                 </NavigationMenuContent>
//                             </NavigationMenuItem>
//                             <NavigationMenuItem>
//                                 <NavigationMenuLink href="#" className={navigationMenuTriggerStyle()}>

//                                 </NavigationMenuLink>
//                             </NavigationMenuItem>
//                             <NavigationMenuItem>
//                                 <NavigationMenuLink href="#" className={navigationMenuTriggerStyle()}>
//                                     Blog
//                                 </NavigationMenuLink>
//                             </NavigationMenuItem>
//                             <NavigationMenuItem>
//                                 <NavigationMenuLink href="#" className={navigationMenuTriggerStyle()}>
//                                     Discord
//                                 </NavigationMenuLink>
//                             </NavigationMenuItem>
//                         </NavigationMenuList>
//                     </NavigationMenu>
//                     <div className="hidden items-center gap-2 lg:flex">
//                         {/* <Button variant="outline">Sign in</Button> */}
//                         <Button disabled>Get Started</Button>
//                     </div>
//                     <Sheet>
//                         <SheetTrigger asChild className="lg:hidden">
//                             <Button variant="outline" size="icon">
//                                 <MenuIcon className="h-4 w-4" />
//                             </Button>
//                         </SheetTrigger>
//                         <SheetContent side="top" className="max-h-screen overflow-auto">
//                             <SheetHeader>
//                                 <SheetTitle>
//                                     <a href="https://www.shadcnblocks.com" className="flex items-center gap-2">
//                                         <img
//                                             src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/shadcnblockscom-icon.svg"
//                                             className="max-h-8"
//                                             alt="Shadcn UI Navbar"
//                                         />
//                                         <span className="text-lg font-semibold tracking-tighter">Shadcnblocks.com</span>
//                                     </a>
//                                 </SheetTitle>
//                             </SheetHeader>
//                             <div className="flex flex-col p-4">
//                                 <Accordion type="single" collapsible className="mt-4 mb-2">
//                                     <AccordionItem value="solutions" className="border-none">
//                                         <AccordionTrigger className="text-base hover:no-underline">
//                                             Features
//                                         </AccordionTrigger>
//                                         <AccordionContent>
//                                             <div className="grid md:grid-cols-2">
//                                                 {features.map((feature, index) => (
//                                                     <a
//                                                         href={feature.href}
//                                                         key={`${index}-${feature.title}`}
//                                                         className="rounded-md p-3 transition-colors hover:bg-muted/70"
//                                                     >
//                                                         <div key={feature.title}>
//                                                             <p className="mb-1 font-semibold text-foreground">
//                                                                 {feature.title}
//                                                             </p>
//                                                             <p className="text-sm text-muted-foreground">
//                                                                 {feature.description}
//                                                             </p>
//                                                         </div>
//                                                     </a>
//                                                 ))}
//                                             </div>
//                                         </AccordionContent>
//                                     </AccordionItem>
//                                 </Accordion>
//                                 <div className="flex flex-col gap-6">
//                                     <a href="https://messagekit.app" className="font-medium">
//                                         Templates
//                                     </a>
//                                     <a href="https://messagekit.app" className="font-medium">
//                                         Blog
//                                     </a>
//                                     <a href="https://messagekit.app" className="font-medium">
//                                         Pricing
//                                     </a>
//                                 </div>
//                                 <div className="mt-6 flex flex-col gap-4">
//                                     {/* <Button variant="outline">Sign in</Button> */}
//                                     <Button disabled>Get Started</Button>
//                                 </div>
//                             </div>
//                         </SheetContent>
//                     </Sheet>
//                 </nav>
//             </div>
//         </section>
//     );
// };

// export { Navbar5 };
