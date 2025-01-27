import { model, Schema } from "mongoose";
import { IPortfolio } from "./portfolio.interface";

const portfolioSchema: Schema = new Schema<IPortfolio>(
	{
		title: { type: String, required: true },
		picture: { type: String, required: true },
		description: { type: String, required: true },
		service: { type: String, required: true },
		price: { type: String, required: true },
		video: { type: String },
		images: [
			{
				img: { type: String },
			},
		],
	},
	{
		timestamps: true,  
	}
);

// Create the Mongoose model for the portfolio
export const Portfolio = model<IPortfolio>("Portfolio", portfolioSchema);
