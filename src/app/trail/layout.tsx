import { FamilyHeader } from "@/components/family-header";
export const metadata = { title: { default: "Rallii Trail — Find your kind of outside", template: "%s | Rallii Trail" }, description: "Curated hikes, remarkable landscapes and a little more time outside." };
export default function TrailLayout({ children }: { children: React.ReactNode }) { return <><FamilyHeader trail />{children}</>; }
