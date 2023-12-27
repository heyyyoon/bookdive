export default function MyPageSubTitle({title}) {
  return (
    <div className="flex flex-row justify-between items-end border-b pb-1">
      <p className="text-medigrey text-xl font-bold">{title}</p>
    </div>
  );
}
