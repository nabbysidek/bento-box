import React from "react";

export default function Header({ onAddDraggable }) {
  // onAddDraggable is passed into the Header component as a prop
  return (
    <div>
      {/* Header section */}
      <div className="bg-gray-300 border-b-1 border-gray-200">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto px-4 py-1.5">
          <a
            href="/"
            className="flex items-center space-x-3 rtl:space-x-reverse"
          >
            <svg
              className="w-4 h-4 text-gray-800 dark:text-white"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                stroke="currentColor"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 5a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V5Zm16 14a1 1 0 0 1-1 1h-4a1 1 0 0 1-1-1v-2a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2ZM4 13a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v6a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-6Zm16-2a1 1 0 0 1-1 1h-4a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v6Z"
              />
            </svg>

            <span className="self-center text-md font-semibold whitespace-nowrap dark:text-white">
              bento
            </span>
          </a>
          {/* New post button */}
          <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
            <button
              type="button"
              className="cursor-pointer text-white bg-gray-500 hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-gray-200 font-medium rounded-full text-xs px-4 py-2 text-center dark:bg-gray-500 dark:hover:bg-gray-600 dark:focus:ring-gray-800"
              onClick={onAddDraggable} // When the button is (onClick), it triggers the onAddDraggable function defined in the Map component
            >
              <span className="flex items-center justify-between">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-4"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 4.5v15m7.5-7.5h-15"
                  />
                </svg>
                New Post
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
