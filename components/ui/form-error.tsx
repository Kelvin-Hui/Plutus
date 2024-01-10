import { ExclamationCircleIcon } from "@heroicons/react/24/outline";

export function FormError({message} : {message? : string}){
    if(!message) return null;
    
    return(
        <div className="bg-red-600/15 p-3 rounded-md flex items-center gap-x-2 text-sm text-red-600 dark:bg-red-900 dark:text-red-300">
            <ExclamationCircleIcon className="h-5 w-5"/>
            <p>{message}</p>
        </div>
    )
}