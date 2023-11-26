import {clearLoginStatus, getUserData} from "@/utils/auth";
import {logout} from "@/service/user";
import {getIpAddressFromRequest} from "@/utils/ip";
import {redirect} from "next/navigation";

export async function GET(request) {
    const ip = getIpAddressFromRequest();
    const userData = await getUserData();

    userData?.userId && logout({
        userId: userData.userId,
        ip: ip
    }).catch((err) => {
        console.error("[logout/route.js] logout error: ", err);
    });

    await clearLoginStatus();
    redirect('/login');
}
