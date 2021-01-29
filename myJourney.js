sap.ui.define(["sap/ui/test/Opa5", "sap/ui/test/matchers/PropertyStrictEquals", "sap/ui/test/opaQunit"], function (Opa5, PropertyStrictEquals, opaTest) {
    // Arrangements - Given
    var myArrangements = new Opa5({
        launchMyApp: function () {
            return this.iStartMyAppInAFrame("index.html");
        },
        removeMyApp : function () {
            return this.iTeardownMyApp("index.html");
        }
    });

    //Actions - When
    var myActions = new Opa5({
        findAndClick: function () {
            return this.waitFor({
                id: "idButton",
                success: function (oButton) {
                    oButton.firePress();
                },
                errorMessage: "Cannot find the button:fail"
            });
        }
    });

    //Assertions - Then
    var myAssertions = new Opa5({
        checkClicked: function () {
            return this.waitFor({
                id: "idButton",
                matchers: new PropertyStrictEquals({
                    name: "text",
                    value: "You clicked me"
                }),
                success: function () {
                    QUnit.assert.ok(true, "The button is working as expected")
                },
                errorMessage: "There is something wrong with the Button"
            })
        }
    });


    Opa5.extendConfig({
        arrangements: myArrangements,
        actions: myActions,
        assertions: myAssertions
    });

    // Journey First Test Case
    opaTest("Check when the button is loaded, on click it changes to you click me", function (Given, When, Then) {
        Given.launchMyApp();
        When.findAndClick();
        Then.checkClicked();
        Given.removeMyApp();
    });

});