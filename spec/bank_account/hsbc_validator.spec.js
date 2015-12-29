describe("HSBCValidator", function() {

  var validBankAccountParams;
  var validBankAccount;

  beforeEach(function() { 
    validBankAccountParams = {
      bankNumber         : "399",
      agencyNumber       : "1584",
      agencyCheckNumber  : "",
      accountNumber      : "678901",
      accountCheckNumber : "9",
      valid: jasmine.createSpy(),
      invalid: jasmine.createSpy(),
    };
  });

  describe("validate agency check number", function(){

    it("accepts a valid bank account", function() {
      Moip.BankAccount.validate(validBankAccountParams);
      expect(validBankAccountParams.valid).toHaveBeenCalled();
    });

    it("does NOT accept account less than eleven digits", function() {
      validBankAccountParams.accountNumber = "67890";
      Moip.BankAccount.validate(validBankAccountParams);
      var expectedParams = { errors: [{ 
        description: 'A conta corrente deve conter 6 números. Complete com zeros a esquerda se necessário.', 
        code: 'INVALID_ACCOUNT_NUMBER' 
      }]};
      expect(validBankAccountParams.invalid).toHaveBeenCalledWith(expectedParams);
    });

    it("does NOT accept account greater than eleven digits", function() {
      validBankAccountParams.accountNumber = "6789012";
      Moip.BankAccount.validate(validBankAccountParams);
      var expectedParams = { errors: [{ 
        description: 'A conta corrente deve conter 6 números. Complete com zeros a esquerda se necessário.', 
        code: 'INVALID_ACCOUNT_NUMBER' 
      }]};
      expect(validBankAccountParams.invalid).toHaveBeenCalledWith(expectedParams);
    });

  });

  describe("validate agency number", function(){

    it("does NOT accept invalid agency", function() {
      validBankAccountParams.agencyNumber = "123";
      Moip.BankAccount.validate(validBankAccountParams);
      var expectedParams = { errors: [{ 
        description: 'A agência deve conter 4 números. Complete com zeros a esquerda se necessário.', 
        code: 'INVALID_AGENCY_NUMBER' 
      }]};
      expect(validBankAccountParams.invalid).toHaveBeenCalledWith(expectedParams);
    });
  });
});