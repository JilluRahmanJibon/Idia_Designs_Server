export interface IPurchase {
	userEmail: string;
	userName: string;
	productId: string;
	productName: string;
	price: number;
	status: "pending" | "succeeded" | "failed"; 
	paymentIntentId: string;
	paymentMethodId: string;
	createdAt: Date;
}
