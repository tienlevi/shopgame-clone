import Tab from "./Tab";

function History() {
  return (
    <>
      {" "}
      <div className="max-w-[1200px] mx-auto mt-[140px] px-3">
        <h1 className="text-[29px] font-bold mb-5">Profile </h1>
        <div className="flex justify-between lg:flex-col">
          <Tab />
          <div className="w-[750px] border-gray border-2 lg:w-[100%] lg:mt-3">
            <div className="block">
              <h1 className="text-[27px] font-bold p-3 border-instagramColor-orange border-b-[1px]">
                History order
              </h1>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default History;
