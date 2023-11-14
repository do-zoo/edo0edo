import {Outlet} from "@remix-run/react";
import Header from "./header";

export default function () {
    return (
        <main>
          <Header />
            <Outlet/>
        </main>
    );
}
