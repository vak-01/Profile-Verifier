"use client";
import React from "react";
import { ModeToggle } from "../../components/home/components/darkmode/dark";

export default function Header() {
  return (
    <>
      {/* <header className="flex z-50 flex-wrap py-3 w-full text-sm bg-white border-b border-gray-200 sm:flex-nowrap sm:justify-start sm:py-0 dark:bg-gray-800 dark:border-gray-700"> */}
      <header className="flex flex-wrap sm:justify-start sm:flex-nowrap z-50 w-full  border-b border-white/[.5] text-sm py-3 sm:py-0}">
        <nav
          className="relative px-4 mx-auto w-full max-w-7xl sm:flex sm:justify-between sm:items-center sm:px-6 lg:px-8"
          aria-label="Global"
        >
          <div className="flex justify-between items-center">
            <a
              className="flex-none text-xl font-semibold text-black dark:text-white"
              href="/"
              aria-label="Brand"
            >
              Profile Verifier
            </a>
            <div className="sm:hidden">
              <button
                type="button"
                className="inline-flex gap-2 justify-center items-center p-2 text-sm font-medium text-gray-700 align-middle bg-white rounded-md border shadow-sm transition-all dark:text-gray-400 dark:border-gray-700 hover:bg-gray-50 focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 focus:ring-offset-white focus:outline-none hs-collapse-toggle dark:bg-slate-900 dark:hover:bg-slate-800 dark:hover:text-white dark:focus:ring-offset-gray-800"
                data-hs-collapse="#navbar-collapse-with-animation"
                aria-controls="navbar-collapse-with-animation"
                aria-label="Toggle navigation"
              >
                <svg
                  className="w-4 h-4 hs-collapse-open:hidden"
                  width="16"
                  height="16"
                  fill="currentColor"
                  viewBox="0 0 16 16"
                >
                  <path
                    fill-rule="evenodd"
                    d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"
                  />
                </svg>
                <svg
                  className="hidden w-4 h-4 hs-collapse-open:block"
                  width="16"
                  height="16"
                  fill="currentColor"
                  viewBox="0 0 16 16"
                >
                  <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
                </svg>
              </button>
            </div>
          </div>

          <div
            id="navbar-collapse-with-animation"
            className="hidden overflow-hidden transition-all duration-300 sm:block hs-collapse basis-full grow"
          >
            <div className="flex flex-col gap-x-0 gap-y-4 mt-5 sm:flex-row sm:gap-y-0 sm:gap-x-7 sm:justify-end sm:items-center sm:pl-7 sm:mt-0">
              {/* <a */}
              {/*   className="text-lg font-medium text-blue-600 sm:py-6 dark:text-blue-500" */}
              {/*   href="#" */}
              {/*   aria-current="page" */}
              {/* > */}
              {/*   Home */}
              {/* </a> */}
              {/* <a */}
              {/*   className="text-lg font-medium text-blue-600 sm:py-6 dark:text-blue-500" */}
              {/*   href="#" */}
              {/*   aria-current="page" */}
              {/* > */}
              {/*   Dashboard */}
              {/* </a> */}
              {/* <a className="text-lg font-medium text-gray-500 sm:py-6 dark:text-gray-400 dark:hover:text-gray-500" href="#">Dashboard</a> */}
              <ModeToggle />
            </div>
          </div>
        </nav>
      </header>
    </>
  );
}
