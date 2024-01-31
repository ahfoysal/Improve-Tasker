/* eslint-disable react/prop-types */

export default function DeletePrompt({ onClose, onClick, title }) {
  return (
    <div className="fixed top-0 left-0 w-screen h-screen z-50 bg-black/60 backdrop-blur-sm">
      <div className="absolute  left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[420px] sm:max-w-[600px] lg:max-w-[984px] p-4   ">
        <div className="mx-auto my-10 w-full max-w-[740px] rounded-xl border border-[#FEFBFB]/[36%] bg-[#191D26] p-9 max-md:px-4 lg:my-20 lg:p-11  max-h-[90vh] overflow-y-auto relative">
          <div
            onClick={onClose}
            className="absolute right-5 top-5 cursor-pointer"
          >
            <img src="/assets/close.png" alt="cross" className="h-5 w-5" />
          </div>
          <div className="flex flex-col items-center">
            <img src="/assets/warning.png" alt="" className="h-36 w-36" />{" "}
            <p className="mt-16  text-2xl font-bold ">Are You Sure?</p>
          </div>
          <div className="mt-16 flex justify-center lg:mt-20">
            <button
              onClick={onClick}
              className="rounded bg-blue-600 px-4 py-2 text-white transition-all hover:opacity-80"
            >
              {title}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
