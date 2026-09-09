import { FamilyHeader } from "@/components/family-header";
export const metadata={title:{default:"Rallii Snow — Follow winter",template:"%s | Rallii Snow"},description:"Snow destinations and mountain towns organized for winter travel."};
export default function SnowLayout({children}:{children:React.ReactNode}){return <><FamilyHeader mode="Snow"/>{children}</>}
