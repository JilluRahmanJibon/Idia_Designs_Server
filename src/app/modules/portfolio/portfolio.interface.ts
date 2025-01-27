export interface IPortfolio {
	title: string;
	picture: string;
	description: string;
	service: string;
	price: string;
	video?: string;
	images?: Array<{
		img: string;
	}>;
}
