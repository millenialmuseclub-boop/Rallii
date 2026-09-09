import { FamilyHeader } from "@/components/family-header";
export const metadata = { title: { default: "Rallii MTB — Find your line", template: "%s | Rallii MTB" }, description: "Thirty mountain biking destinations, trail systems and bike parks. Find your terrain and save your next ride." };
export default function MtbLayout({ children }: { children: React.ReactNode }) { return <><FamilyHeader mode="MTB" />{children}</>; }
