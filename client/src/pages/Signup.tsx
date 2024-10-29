import { Auth } from "../components/Auth";
import { Quote } from "../components/Quote";

export function Signup() {
    return <div className="">
        <div className="grid grid-cols-1 lg:grid-cols-2">
        <Auth type={"Signup"}/>
        <div className="hidden lg:block">
        <Quote content={"The customer support I recieved was exceptional. The support team went above and beyond to address my concerns !"} />
        </div>
        </div>
    </div>
}