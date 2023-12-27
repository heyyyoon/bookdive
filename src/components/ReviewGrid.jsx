export default function ReviewGrid({children}) {
  return (
    <ul className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-y-10 pt-[30px]">
      {children}
    </ul>
  );
}

