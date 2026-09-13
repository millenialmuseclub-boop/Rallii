import Image from "next/image";
import { jordypopProjects } from "@/data/jordypop";

export function JordypopCollection() {
  return <section className="jordypop-collection" aria-labelledby="jordypop-heading">
    <header><p className="rallii-kicker">From jordypop</p><h2 id="jordypop-heading">More to explore.</h2></header>
    <div className="jordypop-products">
      {jordypopProjects.map(project => <a key={project.id} className="jordypop-product" href={project.href} target="_blank" rel="noopener noreferrer" aria-label={`${project.name}: ${project.appStore ? "View on App Store" : "Explore"} (opens in a new tab)`}>
        <Image className="jordypop-product-icon" src={project.icon} width={48} height={48} unoptimized alt="" />
        <span className="jordypop-product-copy"><strong>{project.name}</strong><span>{project.description}</span></span>
        <span className="jordypop-product-action" aria-hidden="true"><span>{project.appStore ? "View on App Store" : "Explore"}</span><span>→</span></span>
      </a>)}
    </div>
    <p className="jordypop-colophon">Independent apps by jordypop.</p>
  </section>;
}

export function LatinAmericaContext(){const project=jordypopProjects.find(item=>item.id==="latam")!;return <p className="trail-fact-note">Beyond the ride: <a href={project.href} target="_blank" rel="noopener noreferrer">explore Latin America with Jet Set LatAm ↗</a>.</p>;}
