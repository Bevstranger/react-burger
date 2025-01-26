const testUrl = 'http://localhost:8080';
describe('Stellar Burgers', () => {
	it('Should open the page', () => {
		cy.visit(testUrl);
		// Add bun to the constructor
		cy.get(
			'[href="/ingredients/643d69a5c3f7b9001cfa093d"] > .mb-2 > .ml-4'
		).trigger('dragstart');
		cy.get('.constructor-element_pos_top').trigger('drop', { force: true });

		// Add filling to the constructor
		cy.get(
			'[href="/ingredients/643d69a5c3f7b9001cfa0943"] > .mb-2 > .ml-4'
		).trigger('dragstart');
		cy.get('.pt-25').trigger('drop', { force: true });

		// Place the order
		cy.contains('Оформить заказ').click();
		cy.get('input[name=email]').type('kapranoveg@yandex.ru');
		cy.get('input[name=password]').type('123123123');
		cy.get('button[type=submit]').click();
		cy.contains('Оформить заказ').trigger('click');

		cy.get('.text_type_digits-large', { timeout: 20000 }).contains(/\d+/);
		cy.wait(5000);
		cy.get('.modal-module__iconClose__W3kY7 > path').click();
	});
});
