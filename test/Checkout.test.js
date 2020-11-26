const Checkout = require('../src/Checkout')
	, srcPricingRules = require('../src/pricingRules.json')
;

describe('No custom rules apply', () => {
	const pricingRules = {
		products: [
			{
				"id": "classic",
				"cost": 10
			},
			{
				"id": "standout",
				"cost": 15
			}
		],
		rules: []
	};

	test('total is 0 with no items', () => {
		let checkout = new Checkout(pricingRules, 'default');

		expect(checkout.total()).toBe(0);
	});

	test('total is 10 with 1 classic item', () => {
		let checkout = new Checkout(pricingRules, 'default');
		checkout.add('classic');

		expect(checkout.total()).toBe(10);
	});

	test('total is 50 with 5 classic items', () => {
		let checkout = new Checkout(pricingRules, 'default');
		checkout.add('classic');
		checkout.add('classic');
		checkout.add('classic');
		checkout.add('classic');
		checkout.add('classic');

		expect(checkout.total()).toBe(50);
	});

	test('total is 90 with 3 classic and 4 standout items', () => {
		let checkout = new Checkout(pricingRules, 'default');
		checkout.add('classic');
		checkout.add('classic');
		checkout.add('classic');
		checkout.add('standout');
		checkout.add('standout');
		checkout.add('standout');
		checkout.add('standout');

		expect(checkout.total()).toBe(90);
	});
});

describe('A custom 2 for 1 rule is applied on classic items for SecondBite', () => {
	const pricingRules = {
		products: [
			{
				"id": "classic",
				"cost": 10
			},
			{
				"id": "standout",
				"cost": 15
			}
		],
		rules: [
			{
				"customer": "SecondBite",
				"type": "bundle",
				"condition": {
					"product": "classic",
					"quantity": 2
				},
				"result": {
					"quantity": 1
				}
			}
		]
	};

	describe('default customer', () => {
		test('total is 0 with no items', () => {
			let checkout = new Checkout(pricingRules, 'default');

			expect(checkout.total()).toBe(0);
		});

		test('total is 10 with 1 classic item', () => {
			let checkout = new Checkout(pricingRules, 'default');
			checkout.add('classic');

			expect(checkout.total()).toBe(10);
		});

		test('total is 50 with 5 classic items', () => {
			let checkout = new Checkout(pricingRules, 'default');
			checkout.add('classic');
			checkout.add('classic');
			checkout.add('classic');
			checkout.add('classic');
			checkout.add('classic');

			expect(checkout.total()).toBe(50);
		});

		test('total is 90 with 3 classic and 4 standout items', () => {
			let checkout = new Checkout(pricingRules, 'default');
			checkout.add('classic');
			checkout.add('classic');
			checkout.add('classic');
			checkout.add('standout');
			checkout.add('standout');
			checkout.add('standout');
			checkout.add('standout');

			expect(checkout.total()).toBe(90);
		});
	});

	describe('SecondBite customer', () => {
		test('total is 0 with no items', () => {
			let checkout = new Checkout(pricingRules, 'SecondBite');

			expect(checkout.total()).toBe(0);
		});

		test('total is 10 with 1 classic item', () => {
			let checkout = new Checkout(pricingRules, 'SecondBite');
			checkout.add('classic');

			expect(checkout.total()).toBe(10);
		});

		test('total is 10 with 2 classic items', () => {
			let checkout = new Checkout(pricingRules, 'SecondBite');
			checkout.add('classic');
			checkout.add('classic');

			expect(checkout.total()).toBe(10);
		});

		test('total is 30 with 5 classic items', () => {
			let checkout = new Checkout(pricingRules, 'SecondBite');
			checkout.add('classic');
			checkout.add('classic');
			checkout.add('classic');
			checkout.add('classic');
			checkout.add('classic');

			expect(checkout.total()).toBe(30);
		});

		test('total is 80 with 3 classic and 4 standout items', () => {
			let checkout = new Checkout(pricingRules, 'SecondBite');
			checkout.add('classic');
			checkout.add('classic');
			checkout.add('classic');
			checkout.add('standout');
			checkout.add('standout');
			checkout.add('standout');
			checkout.add('standout');

			expect(checkout.total()).toBe(80);
		});
	});
});

describe('A custom cost-per-item rule is applied on classic items for SecondBite', () => {
	const pricingRules = {
		products: [
			{
				"id": "classic",
				"cost": 10
			},
			{
				"id": "standout",
				"cost": 15
			}
		],
		rules: [
			{
				"customer": "SecondBite",
				"type": "discount",
				"condition": {
					"product": "classic"
				},
				"result": {
					"cost": 9
				}
			}
		]
	};

	describe('default customer', () => {
		test('total is 0 with no items', () => {
			let checkout = new Checkout(pricingRules, 'default');

			expect(checkout.total()).toBe(0);
		});

		test('total is 10 with 1 classic item', () => {
			let checkout = new Checkout(pricingRules, 'default');
			checkout.add('classic');

			expect(checkout.total()).toBe(10);
		});

		test('total is 50 with 5 classic items', () => {
			let checkout = new Checkout(pricingRules, 'default');
			checkout.add('classic');
			checkout.add('classic');
			checkout.add('classic');
			checkout.add('classic');
			checkout.add('classic');

			expect(checkout.total()).toBe(50);
		});

		test('total is 90 with 3 classic and 4 standout items', () => {
			let checkout = new Checkout(pricingRules, 'default');
			checkout.add('classic');
			checkout.add('classic');
			checkout.add('classic');
			checkout.add('standout');
			checkout.add('standout');
			checkout.add('standout');
			checkout.add('standout');

			expect(checkout.total()).toBe(90);
		});
	});

	describe('SecondBite customer', () => {
		test('total is 0 with no items', () => {
			let checkout = new Checkout(pricingRules, 'SecondBite');

			expect(checkout.total()).toBe(0);
		});

		test('total is 9 with 1 classic item', () => {
			let checkout = new Checkout(pricingRules, 'SecondBite');
			checkout.add('classic');

			expect(checkout.total()).toBe(9);
		});

		test('total is 45 with 5 classic items', () => {
			let checkout = new Checkout(pricingRules, 'SecondBite');
			checkout.add('classic');
			checkout.add('classic');
			checkout.add('classic');
			checkout.add('classic');
			checkout.add('classic');

			expect(checkout.total()).toBe(45);
		});

		test('total is 87 with 3 classic and 4 standout items', () => {
			let checkout = new Checkout(pricingRules, 'SecondBite');
			checkout.add('classic');
			checkout.add('classic');
			checkout.add('classic');
			checkout.add('standout');
			checkout.add('standout');
			checkout.add('standout');
			checkout.add('standout');

			expect(checkout.total()).toBe(87);
		});
	});
});

describe('Example scenarios', () => {
	test('1 - total is 987.97 when default purchases 1 classic, 1 standout, 1 premium', () => {
		let checkout = new Checkout(srcPricingRules, 'default');
		checkout.add('classic');
		checkout.add('standout');
		checkout.add('premium');

		expect(checkout.total()).toBe(987.97);
	});

	test('2 - total is 934.97 when SecondBite purchases 3 classic, 1 premium', () => {
		let checkout = new Checkout(srcPricingRules, 'SecondBite');
		checkout.add('classic');
		checkout.add('classic');
		checkout.add('classic');
		checkout.add('premium');

		expect(checkout.total()).toBe(934.97);
	});

	test('3 - total is 1294.96 when Axil Coffee Roasters purchases 3 standout, 1 premium', () => {
		let checkout = new Checkout(srcPricingRules, 'Axil Coffee Roasters');
		checkout.add('standout');
		checkout.add('standout');
		checkout.add('standout');
		checkout.add('premium');

		expect(checkout.total()).toBe(1294.96);
	});
});
