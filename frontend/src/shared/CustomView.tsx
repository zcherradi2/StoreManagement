import { ModalRoot, View } from "./interfaces"
import { useState } from "react"
import { NewEntryForm } from "@/views/NewEntry"
import { PageRoot } from "./PageRoot"

const views:Record<string,(root:PageRoot)=>React.JSX.Element> = {
    default:(root:PageRoot)=>{
        return (
            <div className="flex items-center justify-center h-full">
                <p className="text-lg font-semibold text-gray-800 text-center m-60">
                    Default View
                </p>
            </div>
        )
    },
    newEntry:(root:PageRoot)=>{
        return <NewEntryForm root={root} />;

    }
}


export function CustomView(viewKey:string):View{
    if(views[viewKey]){
        return views[viewKey]
    }
    return views.default
}



