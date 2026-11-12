export default function PageHead({
  label,
  title,
  count,
  sub,
}: {
  label: string;
  title: string;
  count?: number | string;
  sub?: React.ReactNode;
}) {
  return (
    <>
      <div className="label page-label">{label}</div>
      <h1 className="h1">
        {title}
        {count !== undefined && <span className="count"> ({count})</span>}
      </h1>
      {sub && <p className="subline">{sub}</p>}
    </>
  );
}
