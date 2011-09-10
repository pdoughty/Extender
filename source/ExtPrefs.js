enyo.kind({
  name: "MyApps.ExtPrefs",
  kind: enyo.VFlexBox,
  events: {
      onReceive: "",
      onSave: "",
      onCancel: ""
  },
  components: [
      {
          name: "getPreferencesCall",
          kind: "PalmService",
          service: "palm://com.palm.systemservice/",
          method: "getPreferences",
          onSuccess: "getPreferencesSuccess",
          onFailure: "getPreferencesFailure"
      },
      {
          name: "setPreferencesCall",
          kind: "PalmService",
          service: "palm://com.palm.systemservice/",
          method: "setPreferences",
          onSuccess: "setPreferencesSuccess",
          onFailure: "setPreferencesFailure"
      },
      {kind: "PageHeader", content: "Extender Preferences"},
      {kind: "VFlexBox",
          components: [
              {kind: "RowGroup", caption: "Instapaper Account Info", components: [
                  {name: "instapaperUsernameInput", kind: "Input", hint: "Username"},
		  {name: "instapaperPasswordInput", kind: "PasswordInput", hint: "Password"}
              ]},
	      {kind: "RowGroup", caption: "Other Preferences", components: [
		  {name: "otherInput", kind: "Input"},
		  {name: "otherInput2", kind: "Input"}
	      ]},
              {kind: "HFlexBox", pack: "end", style: "padding: 0 10px;",
                  components: [
                      {name: "saveButton", kind: "Button",
                          content: "Save", onclick: "saveClick"},
                      {width: "10px"},
                      {name: "cancelButton", kind: "Button",
                          content: "Cancel", onclick: "cancelClick"}
                  ]
              }
          ]
      },
  ],
  create: function() {
      this.inherited(arguments);
      this.$.getPreferencesCall.call(
      {
          "keys": ["instapaperUsername", "instapaperPassword"]
      });
      // keep this updated with the value that's currently saved to the service
      this.savedInstapaperUsername = "";
      this.savedInstapaperPassword = "";
  },
  getPreferencesSuccess: function(inSender, inResponse) {
      this.savedInstapaperUsername = inResponse.instapaperUsername;
      this.doReceive(this.savedInstapaperUsername);

      this.savedInstapaperPassword = inResponse.instapaperPassword;
      this.doReceive(this.savedInstapaperPassword);
  },
  getPreferencesFailure: function(inSender, inResponse) {
      enyo.log("got failure from getPreferences");
  },
  setPreferencesSuccess: function(inSender, inResponse) {
      console.log("got success from setPreferences");
  },
  setPreferencesFailure: function(inSender, inResponse) {
      console.log("got failure from setPreferences");
  },
//  showingChanged: function() {
      // reset contents of text input box to last saved value
  //    this.$.defaultFeedInput.setValue(this.savedUrl);
 // },
  saveClick: function(inSender, inEvent) {
      var newInstapaperUsernameValue = this.$.instapaperUsernameInput.getValue();
      this.$.setPreferencesCall.call(
      {
          "instapaperUsername": newInstapaperUsernameValue
      });
      this.savedInstapaperUsername = newInstapaperUsernameValue;
      this.doSave(newInstapaperUsernameValue);

      var newInstapaperPasswordValue = this.$.instapaperPasswordInput.getValue();
      this.$.setPreferencesCall.call(
      {
	  "instapaperPassword": newInstapaperPasswordValue
      });
      this.savedInstapaperPasswordValue = newInstapaperPasswordValue;
      this.doSave(newInstapaperPasswordValue);
  },
  cancelClick: function() {
      this.doCancel();
  }
});
