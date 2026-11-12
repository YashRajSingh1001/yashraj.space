export default function PageHead({
  title,
  count,
  sub,
}: {
  title: string;
  count?: number | string;
  sub?: React.ReactNode;
}) {
  return (
    <>
      <h1 className="h1">
        {title}
        {count !== undefined && <span className="count"> ({count})</span>}
      </h1>
      {sub && <p className="subline">{sub}</p>}
    </>
  );
}
