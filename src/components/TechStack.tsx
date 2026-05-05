import './TechStack.css'

const row1 = ['Python', 'TypeScript', 'React', 'Next.js', 'Node.js', 'FastAPI', 'OpenAI', 'LangChain', 'PostgreSQL', 'Redis']
const row2 = ['AWS', 'Docker', 'Kubernetes', 'Terraform', 'GraphQL', 'Prisma', 'Supabase', 'Pinecone', 'Stripe', 'Tailwind']
const row3 = ['GPT-4', 'Claude', 'Gemini', 'Hugging Face', 'PyTorch', 'Pandas', 'Celery', 'RabbitMQ', 'Nginx', 'GitHub Actions']

function ScrollRow({ tags, direction }: { tags: string[]; direction: 'left' | 'right' }) {
  const doubled = [...tags, ...tags, ...tags]
  return (
    <div className="ts-row">
      <div className="ts-track">
        <div className={`ts-scroll ts-scroll-${direction}`}>
          {doubled.map((tag, i) => (
            <span className="ts-tag" key={i}>{tag}</span>
          ))}
        </div>
      </div>
    </div>
  )
}

export default function TechStack() {
  return (
    <section className="ts-section">
      <div className="ts-inner">
        <div className="ts-text">
          <span className="eyebrow ts-eyebrow">Tech Stack</span>
          <h2 className="section-heading ts-heading">
            Built with<br />the best tools
          </h2>
          <p className="body-text ts-description">
            We stay current with the latest in AI and web development,
            picking the right tool for every job.
          </p>
        </div>
        <div className="ts-rows">
          <ScrollRow tags={row1} direction="left" />
          <ScrollRow tags={row2} direction="right" />
          <ScrollRow tags={row3} direction="left" />
        </div>
      </div>
    </section>
  )
}
