import Link from "next/link";
import { IconType } from "react-icons";
import { twMerge } from "tailwind-merge";

type Props = {
  Icon: IconType;
  label: string;
  active?: boolean;
  href: React.ComponentProps<typeof Link>["href"];
};

const SidebarItem = ({ Icon, label, active, href }: Props) => {
  return (
    <Link
      href={href}
      className={twMerge(
        `flex items-center gap-x-4 font-medium cursor-pointer hover:text-white 
      transition text-neutral-400 py-1`,
        active && "text-white"
      )}
    >
      <Icon size={26} className="flex-shrink-0" />
      <p className="truncate">{label}</p>
    </Link>
  );
};

export default SidebarItem;
