export function Quote({content}:{content:string}) {
    return<div className="bg-slate-200 h-screen flex flex-col justify-center">
        <div className="flex justify-center">
            <div className=" max-w-lg">
                <div className="text-3xl text-center font-bold">
                "{content}"
                </div>
                <div className="max-w-md text-left text-xl font-semibold mt-2">
                Julies Winfield
                </div>
                <div className="text-left max-w-md text-sm font-light text-slate-400">
                CEO | Acme corp
                </div>
            </div>
        </div>
    </div>
}