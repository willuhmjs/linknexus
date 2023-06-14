import type mongoose from "mongoose";

export enum BackgroundType {
	COLOR,
	GRADIENT
}

export enum ButtonStyle {
	SOLID,
	DASHED,
	DOTTED
}

export enum Font {
	ARIAL,
	ROBOTO,
	VERDANA,
	CALIBRI,
	SEGOE_UI,
	HELVETICA,
	TAHOMA,
	TIMES_NEW_ROMAN
}

export interface ITheme extends mongoose.Document {
	background: {
		type: BackgroundType;
		color: string;
	},
	button: {
		radius: number;
		style: ButtonStyle;
		color: string;
		fontColor: string;
	},
	font: Font;
	fontColor: string;
};