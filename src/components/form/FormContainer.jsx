function FormContainer({ children, image }) {
  return (
    <div className="bg-white relative h-full">
      <div
        className="flex flex-col items-center justify-between pt-0 px-5 md:px-5 pb-0  mt-0 mr-auto mb-0 ml-auto max-w-7xl
      xl:px-5 lg:flex-row overflow-x-clip"
      >
        <div className="flex flex-col items-center w-full pt-5 md:px-10  lg:pt-1 lg:flex-row">
          <div className="hidden md:flex w-full h-full bg-cover relative max-w-md lg:max-w-2xl lg:w-1/2">
            <div className="flex flex-col items-center justify-center w-full h-full relative lg:pr-10">
              <img
                alt="form"
                src={image}
                className="flex w-full object-cover h-auto p-0"
              />
            </div>
          </div>
          <div className="w-full flex items-center mx-0  relative z-10 max-w-2xl lg:mt-0 lg:w-1/2 mt-20">
            <div
              className="flex w-full flex-col items-start h-[80vh] md:h-[80vh] justify-start p-5 lg:p-10 bg-white shadow-2xl rounded-xl
            relative z-10"
            >
              <p className="w-full text-4xl xl:text-4xl font-bold text-center leading-snug relative mb-3 text-blue-600 underline">
                Sign Up
              </p>
              {children}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FormContainer;
