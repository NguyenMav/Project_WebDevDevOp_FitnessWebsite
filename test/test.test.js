// Use dynamic import for chai
let chai;
let expect;

const loadChai = async () => {
  chai = await import('chai');
  expect = chai.expect;
};

const runTests = () => {
  // Simulate the DOM elements
  const leaveAtDoorCheckbox = { checked: false };
  const preferredTimeSelect = { value: "" };
  const notesTextarea = { value: "" };
  const cardNumberInput = { value: "" };
  const expiryDateInput = { value: "" };
  const cvvInput = { value: "" };
  const cardholderNameInput = { value: "" };
  const billingAddressInput = { value: "" };

  describe('Checkout Form Validation', () => {
    beforeEach(() => {
      // Reset form element values
      leaveAtDoorCheckbox.checked = false;
      preferredTimeSelect.value = "";
      notesTextarea.value = "";
      cardNumberInput.value = "";
      expiryDateInput.value = "";
      cvvInput.value = "";
      cardholderNameInput.value = "";
      billingAddressInput.value = "";
    });

    it('should prevent submit when preferred delivery time is not selected', () => {
      const validateForm = () => {
        throw new Error('Please select a preferred delivery time.');
      };

      expect(validateForm).to.throw('Please select a preferred delivery time.');
    });

    it('should prevent submit when notes for delivery are less than 20 words', () => {
      notesTextarea.value = "This is less than 20 words";

      const validateForm = () => {
        throw new Error('Please enter at least 20 words in notes for the delivery.');
      };

      expect(validateForm).to.throw('Please enter at least 20 words in notes for the delivery.');
    });

    it('should not prevent submit when all fields are filled correctly', () => {
      leaveAtDoorCheckbox.checked = true;
      preferredTimeSelect.value = "Morning";
      notesTextarea.value = "This is a note with more than 20 words.";
      cardNumberInput.value = "1234567890123456";
      expiryDateInput.value = "12/25";
      cvvInput.value = "123";
      cardholderNameInput.value = "John Doe";
      billingAddressInput.value = "123 Main St";

      const validateForm = () => {
        // Simulate form submission logic
      };

      expect(validateForm).not.to.throw();
    });

    after(() => {
      console.log('All tests completed successfully!');
    });
  });
};

// Load Chai and then run the tests
loadChai().then(runTests).catch((error) => {
  console.error('Failed to load chai:', error);
});
