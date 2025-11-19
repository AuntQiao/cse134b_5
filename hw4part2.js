// use checkValidity() and setCustomValidity() for validation
document.addEventListener("DOMContentLoaded", () => {

    let form_errors = [];

    //  Fields
    const form = document.querySelector("form");
    const nameField = document.querySelector("#name");
    const emailField = document.querySelector("#email");
    const commentsField = document.querySelector("#comments");
    const formErrorsInput = document.querySelector("#form-errors-input"); 
    const charCountOutput = document.querySelector("#char-count");
    
    const MAX_COMMENTS = commentsField.maxLength; 
    const WARNING_THRESHOLD = 10;
  
    const emailPattern = /^[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}$/;
    //  Helper
    function errOut(field) {
        return document.querySelector(`output.error[for="${field.id}"]`);
    }
    function infoOut(field) {
        return document.querySelector(`output.info[for="${field.id}"]`);
    }
    

    function flashIllegal(field, msg) {
        const out = errOut(field);
        out.textContent = msg;

        field.classList.add("flash");
        setTimeout(() => {
            field.classList.remove("flash");
            out.textContent = "";
        }, 900);//900 = 1 second
    }

    /**
     * check for disallowed characters as user types
     */

    nameField.addEventListener("input", () => {
        const v = nameField.value;
        const cleaned = v.replace(/[^A-Za-z .'-]/g, "");

        if (cleaned !== v) {
            flashIllegal(nameField, "Illegal character typed!");
            setTimeout(() => {
                nameField.value = cleaned;
                }, 50);
        }else if (v.length > 2 && /^[A-Za-z .'-]+$/.test(v)) {
        infoOut(nameField).textContent = "Looks good!";
    } else {
        infoOut(nameField).textContent = "";
    }
    });

    emailField.addEventListener("input", () => {
        const v = emailField.value;
        const cleaned = v.replace(/[^A-Za-z0-9@._+-]/g, "");

        if (cleaned !== v) {
            flashIllegal(emailField, "Email can only contain letters, numbers, and punctuation like . _ + -");
            setTimeout(() => {
                emailField.value = cleaned;
            }, 50);
        }
    });


    /**
     * comments character countdown
     */
   

    function updateCharCount() {
        const remaining = MAX_COMMENTS - commentsField.value.length;
        charCountOutput.textContent = `${remaining} characters remaining`;

        if (remaining <= WARNING_THRESHOLD) {
            charCountOutput.style.color = "orange";
        } else {
            charCountOutput.style.color = "black";
        }
    }

    commentsField.addEventListener("input", updateCharCount);
    updateCharCount(); 


    /**
     * Use checkValidity() to validate a field and show messages
     * @param {*} field 
     * @returns 
     */
//     function validateField(field) {
//         const errorOutput = errOut(field);
//         const infoOutput = infoOut(field);

//         errorOutput.textContent = "";
//         infoOutput.textContent = "";

//         field.setCustomValidity("");

//         const value = field.value.trim();
//         const name = field.name;
//         let message = "";

    
//         if (name === "name") {
//             if (value.length < 2) {
//                 message = "Name is too short.";
//             } else if (!/^[A-Z]/.test(value)) {
//                 message = "Name must start with a capital letter.";
//             }
//         }

        
//         if (name === "email") {
//             if (value === "") {
//                 message = "Email cannot be empty.";
//             } else{
//                 const pattern = new RegExp(emailField.getAttribute("pattern"));
//                 if (!pattern.test(value)) {
//                     message = "Email format is invalid.";
//                 }
//             }
//         }

        
//         if (name === "comments") {
//             if (value === "") {
//                 message = "Comments cannot be empty.";
//             }
//         }

        
//         if (message !== "") {
//             field.setCustomValidity(message);
//             errorOutput.textContent = message;

//             return {
//                 field: name,
//                 message,
//                 value,
//             };
//         }
        
//         infoOutput.textContent = "Valid input";
//         return null;
//     }

//     nameField.addEventListener("blur", () => {
//         validateField(nameField);
//     });

//     emailField.addEventListener("blur", () => {
//         validateField(emailField);
//     });

//     commentsField.addEventListener("blur", () => {
//         validateField(commentsField);
//     });
    

//     /**
//      * collect form errors on submit
//      */
// //     form.addEventListener("submit", (e) => {
// //         let hasErrors = false;
// //         const fields = [nameField, emailField, commentsField];

// //         for (const f of fields) {
// //             const err = validateField(f);
// //             if (err) {
// //                 hasErrors = true;
// //                 form_errors.push(err);
// //                 console.log("error detected:", err);
// //             }
// //         }

// //         if (hasErrors) {
// //             e.preventDefault();
// //             form.reportValidity();
// //             alert("Please fix errors.");
// //         } else {
// //             formErrorsInput.value = JSON.stringify(form_errors);
// //             console.log("Submitting with error history:", form_errors);
// //         }
// //     });
//     form.addEventListener("submit", (e) => {
//         console.log("=== FORM SUBMIT TRIGGERED ===");
        
//         let hasErrors = false;
//         const fields = [nameField, emailField, commentsField];

//         for (const f of fields) {
//             console.log(`Validating field: ${f.name}, value: "${f.value}"`);
            
//             const err = validateField(f);
            
//             console.log(`Validation result for ${f.name}:`, err);
            
//             if (err) {
//                 hasErrors = true;
//                 form_errors.push(err);
//                 console.log("Error pushed to form_errors:", err);
//                 console.log("Current form_errors array:", form_errors);
//             }
//         }

//         console.log("Has errors?", hasErrors);
//         console.log("Total form_errors:", form_errors);

//         if (hasErrors) {
//             e.preventDefault();
//             form.reportValidity();
//             alert("Please fix errors.");
//             console.log("Form submission prevented due to errors");
//         } else {
//             formErrorsInput.value = JSON.stringify(form_errors);
//             console.log("Form submitting successfully with error history:", form_errors);
//             console.log("Hidden field value:", formErrorsInput.value);
//         }
//     });
// });


    form.addEventListener("submit", (e) => {
        e.preventDefault();
        
        // Clear previous error displays
        document.querySelectorAll("output.error").forEach(out => out.textContent = "");
        
        let isValid = true;
        
        // Validate name field
        if (!nameField.value.trim()) {
            errOut(nameField).textContent = "Name is required";
            form_errors.push({
                field: "name",
                value: nameField.value,
                reason: "Required field is empty"
            });
            isValid = false;
        } else if (nameField.value.trim().length < 3) {
            errOut(nameField).textContent = "Name must be at least 3 characters long";
            form_errors.push({
                field: "name",
                value: nameField.value,
                reason: "Name too short"
            });
            isValid = false;
        }
        
        // Validate email field
        if (!emailField.value.trim()) {
            errOut(emailField).textContent = "Email is required";
            form_errors.push({
                field: "email",
                value: emailField.value,
                reason: "Required field is empty"
            });
            isValid = false;
        } else if (!emailPattern.test(emailField.value)) {
            errOut(emailField).textContent = "Invalid email format";
            form_errors.push({
                field: "email",
                value: emailField.value,
                reason: "Invalid email format"
            });
            isValid = false;
        }
        
        // Validate comments field
        if (!commentsField.value.trim()) {
            errOut(commentsField).textContent = "Comments are required";
            form_errors.push({
                field: "comments",
                value: commentsField.value,
                reason: "Required field is empty"
            });
            isValid = false;
        }
        
        // Encode form_errors as JSON and set in hidden field
        formErrorsInput.value = JSON.stringify(form_errors);
        

        if (isValid) {
            infoOut(form).textContent = "Form is valid! Submitting...";
            form.submit();
        }
    });
});