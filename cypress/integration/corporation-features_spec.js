import Constants from '../Constants';

describe('Corporation features', () => {
    beforeEach(() => {
        cy.log('STARTING LOGIN TO CORP ACCOUNT');

        cy.log('Visiting login page');
        cy.visit(Constants.LOGIN_PAGE);

        cy.log('Selecting corp mode login');
        cy.get('[href="/signin/corporate"]').click();

        cy.log('Typing credentials');
        cy.get('[name=login]').type(Constants.KIRILL_CORP_MAIN_LOGIN);
        cy.get('[name=sublogin]').type(Constants.KIRILL_CORP_SECOND_LOGIN);
        cy.get('[name=password]').type(Constants.KIRILL_CORP_PASSWORD);

        cy.log('Submitting login form');
        cy.get('.Button.Button--brand.Button--large').click();
    });

    it('should be logged to corp account', function () {
        cy.log('Checking url after login');
        cy.url()
            .should('include', '/dashboard');

        cy.log('Checking login name is correct');
        cy.get('.AccountMenu-userName')
            .should('have.text', Constants.KIRILL_CORP_SECOND_LOGIN);
    });
});