import CheckCircleIcon from "@heroicons/react/24/outline/CheckCircleIcon";

export function FormSuccess({message} : {message? : string}){
    if(!message) return null;
    
    return(
        <div className="bg-emerald-600/15 p-3 rounded-md flex items-center gap-x-2 text-sm text-emerald-600 dark:bg-emerald-900 dark:text-emerald-300">
            <CheckCircleIcon className="h-4 w-4"/>
            <p>{message}</p>
        </div>
    )
}