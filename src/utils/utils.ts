import { ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export const toastStyles = {
	style: {
		boxShadow: "0px 4px 4px 0px #00000040",
		background: "#000000",
		color: "#80E142",
	},
	iconTheme: {
		primary: "#80E142",
		secondary: "#FFFAEE",
	},
};
