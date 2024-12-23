import React from "react";
import { ButtonProps } from "../types/buttonProps";

function Button({ children, ...rest }: ButtonProps) {
	return <button {...rest}>{children}</button>;
}

export default Button;
