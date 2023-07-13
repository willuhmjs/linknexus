import type mongoose from 'mongoose';

export enum SpecialLink {
	GitHub,
	Instagram,
	Twitter,
	Youtube,
	Twitch,
	TikTok,
	Patreon,
	Snapchat,
	LinkedIn,
	Facebook,
	Spotify
}

export const SpecialProps: Record<
	SpecialLink,
	{ template: (username: string) => string; icon: string }
> = {
	[SpecialLink.GitHub]: {
		template: (username: string) => `https://github.com/${username}`,
		icon: 'fa-github'
	},
	[SpecialLink.Instagram]: {
		template: (username: string) => `https://instagram.com/${username}`,
		icon: 'fa-instagram'
	},
	[SpecialLink.Twitter]: {
		template: (username: string) => `https://twitter.com/${username}`,
		icon: 'fa-twitter'
	},
	[SpecialLink.Youtube]: {
		template: (username: string) => `https://youtube.com/channel/${username}`,
		icon: 'fa-youtube'
	},
	[SpecialLink.Twitch]: {
		template: (username: string) => `https://twitch.tv/${username}`,
		icon: 'fa-twitch'
	},
	[SpecialLink.TikTok]: {
		template: (username: string) => `https://tiktok.com/@${username}`,
		icon: 'fa-tiktok'
	},
	[SpecialLink.Patreon]: {
		template: (username: string) => `https://patreon.com/${username}`,
		icon: 'fa-patreon'
	},
	[SpecialLink.Snapchat]: {
		template: (username: string) => `https://snapchat.com/add/${username}`,
		icon: 'fa-snapchat'
	},
	[SpecialLink.LinkedIn]: {
		template: (username: string) => `https://linkedin.com/in/${username}`,
		icon: 'fa-linkedin'
	},
	[SpecialLink.Facebook]: {
		template: (username: string) => `https://facebook.com/${username}`,
		icon: 'fa-facebook'
	},
	[SpecialLink.Spotify]: {
		template: (username: string) => `https://open.spotify.com/user/${username}`,
		icon: 'fa-spotify'
	}
};

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

export interface IUser extends mongoose.Document {
	email: string;
	password: string;
	username: string;
	bio?: string;
	theme: ITheme;
	links: {
		title: string;
		url: string;
		_id: string;
	}[];
	specials: {
		type: SpecialLink;
		username: string;
		_id: string;
	}[];
}

export interface ITheme extends mongoose.Document {
	background: {
		type: BackgroundType;
		color: string;
	};
	button: {
		style: ButtonStyle;
		color: string;
		fontColor: string;
	};
	font: Font;
	fontColor: string;
}
