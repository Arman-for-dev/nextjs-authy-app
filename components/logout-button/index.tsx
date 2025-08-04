'use client';

import { Button } from "../ui/button";
import { logout } from "./action";


export default function LogoutButton(){
    return (
        <Button size="sm" onClick={async () =>{
            await logout();
        }}>
            Logout
        </Button>
    )
}