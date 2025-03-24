import {ReactNode} from "react";

type Props = {
    children: ReactNode
}
function Layout({children}: Props) {
    return (
        <div className={"min-h-screen flex items-center justify-center"}>
            {children}
        </div>
    );
}

export default Layout;

// 11:46