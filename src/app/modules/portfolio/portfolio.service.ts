import { Portfolio } from "./portfolio.model";

const getPortfolioInToDB = async () => {
	const result = await Portfolio.find({}, "title picture");
	return result;
};
const getSinglePortfolioInToDB = async(id:string) => {
	const result = await Portfolio.findById(id);
	return result;
};


export const PortfolioServices = { getPortfolioInToDB,getSinglePortfolioInToDB };
