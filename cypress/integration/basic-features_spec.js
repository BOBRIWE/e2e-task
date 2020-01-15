import Constants from '../Constants';

describe('Basic features', () => {
    beforeEach(() => {
        cy.visit(Constants.LOGIN_PAGE);

        cy.get('[name=login]').type(Constants.KIRILL_LOGIN);
        cy.get('[name=password]').type(Constants.KIRILL_PASSWORD);

        cy.get('.Button.Button--brand.Button--large').click();
    });

    it('should be logged in', () => {
        cy.url()
            .should('include', '/dashboard');

        isLoggedIn(Constants.KIRILL_LOGIN);
    });

    it('should send emails', () => {
        isLoggedIn(Constants.KIRILL_LOGIN);

        cy.visit(Constants.CAMPAIGNS_PAGE);
        cy.get('.action-button__main').click();
        cy.get('.ControlGroup').contains('Email').click();
        cy.url()
            .should('include', '/campaigns/issues/draft-');


        cy.get(':nth-child(1) > .WizardStep > .WizardStep-wrapper > .WizardStep-header > .WizardStep-panel > .Button > .Button-wrapper').click(); // Add recipients button
        cy.get('.SelectButton > .Button > .Button-wrapper').click(); // Select list or segment
        cy.get('[title="Доступные для рассылки email"]').click();
        cy.wait(1000);
        cy.get('.WizardStepSubmitAndCloseButtons-submitButton > .Button > .Button-wrapper').click(); // Save
        cy.wait(500);

        cy.get(':nth-child(2) > .WizardStep > .WizardStep-wrapper > .WizardStep-header > .WizardStep-panel > .Button > .Button-wrapper').click(); // Edit
        cy.get('.Select-target > .TextArea > .TextArea-input').type('test name'); // From name
        // Auto selecting behaviour for email?
        // cy.contains('Select email').click();
        // cy.get('[title="kmbobrice@gmail.com"]').click();
        cy.get('[name=subject]').type('test subject');
        cy.wait(1000);
        cy.get('.WizardStepSubmitAndCloseButtons-submitButton > .Button > .Button-wrapper').click(); // Save
        cy.wait(500);

        cy.get(':nth-child(3) > .WizardStep > .WizardStep-wrapper > .WizardStep-header > .WizardStep-panel > .Button > .Button-wrapper').click(); // Design email
        cy.get('.GalleryCards-content > :nth-child(1) > .GalleryCard-preview > .GalleryCard-previewContent > .GalleryCard-shadow').click(); // HTML template
        cy.get(':nth-child(5) > .ui-button').click(); // Save and close


        cy.get('.section-header__item > .ControlGroup > :nth-child(1) > .Button > .Button-wrapper').click(); // Main send
        cy.get('.dialog__action-button > .Button > .Button-wrapper').click(); // Send

        cy.url()
            .should('include', '/campaigns/issues');

        cy.wait(1000);
        cy.get('.notification.notification_opened').should('be.visible');
    });
});

function isLoggedIn(name) {
    cy.get('.AccountMenu-userName')
        .should('have.text', name);
}
