function Loader({ classname, className }) {
  return (
    <div
      className={`w-full h-[200px] flex justify-center items-center m-auto ${className}`}
    >
      <span
        className={`w-[50px] loading loading-spinner text-success ${classname}`}
      ></span>
    </div>
  );
}

export default Loader;
