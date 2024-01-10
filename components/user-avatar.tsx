import { auth, signOut } from "@/auth";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { ArrowRightEndOnRectangleIcon } from "@heroicons/react/24/outline";


export const SignOutButton = () => {
    return(
         <form action={async ()=>{
            'use server'
            await signOut();
        }}>
            <button type="submit">
                <div className="flex text-red-600">
                    Sign Out
                    <ArrowRightEndOnRectangleIcon className="h-5 w-5"/>
                </div>
            </button>
        </form>
    )
}



export async function UserAvatar(){
    const session = await auth();
    return(
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                    <Avatar>
                        <AvatarFallback>{session?.user.username.charAt(0).toUpperCase()}</AvatarFallback>
                    </Avatar>
                </Button>
            </DropdownMenuTrigger>
            
            <DropdownMenuContent align="end">
                <DropdownMenuItem className="select-auto">
                    <SignOutButton/>
                </DropdownMenuItem>
            </DropdownMenuContent>
        
        </DropdownMenu>
    )
}