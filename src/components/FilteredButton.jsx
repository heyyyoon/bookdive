const viewMode = ["My post", "Like", "Follow"];

export default function FilteredButton({ onChangeMode, mode }) {
  return (
    <div className="flex flex-1 justify-end mr-5 gap-3">
      {viewMode.map((m) => (
        <div
          className={`w-28 rounded-lg py-3 cursor-pointer  bg-white hover:shadow-customBook hover:brightness-95 ${
            mode === m ? "shadow-customBook" : "shadow-lg"
          }`}
          onClick={() => onChangeMode(m)}
        >
          <p className="text-xl text-center text-darkgrey font-semibold">{m}</p>
        </div>
      ))}
    </div>
  );
}
