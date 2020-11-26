class Checkout {
	constructor(pricingRules, customerId) {
		this.add = this.add.bind(this);
		this.total = this.total.bind(this);
		
		this.products = pricingRules.products;
		this.rules = pricingRules.rules.filter((rule) => rule.customer === customerId);
		this.cart = {};
	}
	
	add(productId) {
		if (!this.cart.hasOwnProperty(productId)) {
			this.cart[productId] = 0;
		}
		
		this.cart[productId]++;
	}
	
	total() {
		let productCosts = {}
			, productBundles = {}
			, result = 0
		;
		
		this.products.forEach((product) => {
			productCosts[product.id] = product.cost;
		});
		
		this.rules.forEach((rule) => {
			switch (rule.type) {
				case 'discount': {
					productCosts[rule.condition.product] = rule.result.cost;
					break;
				}
				case 'bundle': {
					productBundles[rule.condition.product] = {
						triggerQuantity: rule.condition.quantity,
						costQuantity: rule.result.quantity
					};
					break;
				}
			}
		});
		
		for (let productId in this.cart) {
			const productCost = productCosts[productId]
				, productBundle = productBundles[productId]
			;
			
			let quantity = this.cart[productId];
			
			if (productBundle != null) {
				while (quantity >= productBundle.triggerQuantity) {
					result += productBundle.costQuantity * productCost;
					quantity -= productBundle.triggerQuantity;
				}
			}
			
			result += quantity * productCost;
		}
		
		console.log(JSON.stringify(this.cart));
		
		return result;
	}
}

module.exports = Checkout;