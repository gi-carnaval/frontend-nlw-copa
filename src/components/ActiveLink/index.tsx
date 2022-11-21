import Link, { LinkProps } from "next/link";
import { useRouter } from "next/router";
import { ReactElement, cloneElement } from "react";

interface ActiveLinkProps extends LinkProps {
    children: ReactElement;
    activeClassName: string
}

export function ActiveLink({children, activeClassName, ...rest}: ActiveLinkProps){

    const { asPath } = useRouter()

    const style = "inline-block relative px-0 py-2 h-20 leading-20 text-gray-300 first:ml-0 ml-8"

    const className = asPath == rest.href
    ? activeClassName
    : style

    return (
        <Link className={className} {...rest}>
            {cloneElement(children, {

            })}
        </Link>
    )
}