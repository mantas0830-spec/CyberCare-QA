type TopbarProps = {
  title: string
  subtitle?: string
}

export function Topbar({ title, subtitle }: TopbarProps) {
  return (
    <header className="topbar">
      <div>
        <h1>{title}</h1>

        {subtitle && <p>{subtitle}</p>}
      </div>
    </header>
  )
}