import Image from "next/image";

type RalliiMarkProps = {
  className?: string;
  title?: string;
};

/** Shared five-mode Rallii family mark. */
export function RalliiMark({ className, title = "Rallii" }: RalliiMarkProps) {
  return <Image className={className} src="/rallii-icon-192.png" width={40} height={40} alt={title} unoptimized />;
}
