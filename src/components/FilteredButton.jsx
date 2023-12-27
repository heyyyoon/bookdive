const viewMode = ["My post", "Like", "Follow"];

export default function FilteredButton({ onChangeMode, mode }) {
  return (
    <ul className="flex flex-1 justify-end mr-5 gap-3">
      {viewMode.map((m, index) => (
        <li
          key={index}
          className={`w-28 rounded-t-lg py-3 cursor-pointer border-[3px] border-white bg-white hover:border-b-[3px] shadow-lg hover:border-b-blue-500  ${
            mode === m && "border-b-blue-500"
          }`}
          onClick={() => onChangeMode(m)}
        >
          <p className="text-xl text-center text-darkgrey font-semibold">{m}</p>
        </li>
      ))}
    </ul>
  );
}
