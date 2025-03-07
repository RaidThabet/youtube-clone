import React, {ReactNode} from 'react';
import {HomeLayout} from "@/modules/home/ui/layouts/home-layout";

type Props = {
    children: ReactNode
}

function Layout({children}: Props) {
    return (
        // eslint-disable-next-line react/no-children-prop
        <HomeLayout children={children} />
    );
}

export default Layout;