"use client";
import { Icon } from "@iconify/react";
import { useEffect, useState } from "react";

const SquareButton: React.FC<{
    onClick?: () => void,
    tooltipText: string,
    children?: React.ReactNode
}> = ({ tooltipText, children, onClick }) => {
    return (<>
        <button className="flex items-center justify-center w-9 h-9 text-xs font-medium text-gray-700 bg-white border border-gray-200 rounded-lg toggle-full-view hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-gray-300 dark:focus:ring-gray-500 dark:bg-gray-800 focus:outline-none dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
            onClick={onClick}
        >
            <span className="sr-only">{tooltipText}</span>
            {children ?? null}
        </button>
    </>)
}

const Testbed: React.FC<{
    children?: React.ReactNode
}> = ({ children }) => {
    const [screen, setScreen] = useState("desktop")
    const [mode, setMode] = useState("light")

    useEffect(() => {
        document.documentElement.classList.remove("dark")
        if (mode === "dark") {
            document.documentElement.classList.add("dark")
        }
    }, [mode]);

    return (<div className="w-full flex flex-col items-center">
        <div className="w-full p-4 border border-gray-200 bg-gray-100 dark:border-gray-600 dark:bg-gray-700">
            <div className="grid grid-cols-3">
                <div className="col-span-1" />
                <div className="items-center justify-center col-span-1 space-x-2 flex">
                    <SquareButton tooltipText="Toggle smartphone view" onClick={() => { setScreen("smartphone") }}>
                        <Icon icon="flowbite:mobile-phone-outline" className="w-5 h-5" />
                    </SquareButton>
                    <SquareButton tooltipText="Toggle tablet view" onClick={() => { setScreen("tablet") }} >
                        <Icon icon="flowbite:tablet-outline" className="w-5 h-5" />
                    </SquareButton>
                    <SquareButton tooltipText="Toggle desktop view" onClick={() => { setScreen("desktop") }} >
                        <Icon icon="flowbite:desktop-pc-outline" className="w-5 h-5" />
                    </SquareButton>
                </div>
                <div className="flex justify-end col-span-1">
                    {mode === "light" ? (
                        <SquareButton tooltipText="Toggle Dark mode" onClick={() => { setMode("dark") }}>
                            <Icon icon="flowbite:moon-solid" className="w-5 h-5" />
                        </SquareButton>
                    ) : (
                        <SquareButton tooltipText="Toggle Light mode" onClick={() => { setMode("light") }}>
                            <Icon icon="flowbite:sun-solid" className="w-5 h-5" />
                        </SquareButton>
                    )}
                </div>
            </div>
        </div>
        <div className={"p-4 flex flex-start items-start min-h-screen dark:bg-gray-900 border-x border-gray-200 dark:border-gray-600"
            + (screen === "smartphone" ? " w-[360px]" : "")
            + (screen === "tablet" ? " w-[768px]" : "")
            + (screen === "desktop" ? " w-[1280px]" : "")
        }>
            {children ?? null}
        </div>
    </div>
    );
}



export default Testbed
