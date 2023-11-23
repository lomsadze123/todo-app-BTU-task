import detective from "../assets/detective.svg";

const Empty = () => {
  return (
    <div className="text-center text-xl mt-10">
      <img
        className="max-w-[221px] h-auto inline-block mb-5"
        src={detective}
        alt="detective checker"
      />
      <p>Empty...</p>
    </div>
  );
};

export default Empty;
