
const course = document.querySelector('#course');
const summary = document.querySelector('.summary');

const fullName = document.querySelector('#fullName');
const phone = document.querySelector('#phone');
const email = document.querySelector('#email');

const proceed = document.querySelector('#proceed');

const courses = [
    {
        title: 'Web Development',
        price: '40,000',
        duration: '3 Months'
    },
    {
        title: 'Graphic Design',
        price: '20,000',
        duration: '2 Months'
    },
    {
        title: 'Desktop Publishing',
        price: '10,000',
        duration: '2 Months'
    },
    {
        title: 'Computer Appreciation',
        price: '10,000',
        duration: '2 Months'
    },
    {
        title: 'Statistical Analysis',
        price: '10,000',
        duration: '2 Months'
    },
    {
        title: 'Networking',
        price: '40,000',
        duration: '3 Months' 
    }
]

let courseFee, courseReg, courseDur;

course.addEventListener('change', e => {
    e.preventDefault();
    const selectedCourse = courses.filter(e => e.title == course.value)
    
    courseReg = selectedCourse[0].title; 
    courseFee = selectedCourse[0].price;
    courseDur = selectedCourse[0].duration;

    summary.innerHTML = `
    <p>Course Selected: <span>${courseReg}</span></p>
    <p>Registration Fee: <span>&#8358; ${courseFee}</span></p>
    <p>Course Duration: <span>${courseDur}</span></p>
    `
})


proceed.addEventListener('click', e => {
    e.preventDefault();

    if (course.value !== '' && fullName.value !== '' && phone.value !== '' && email.value !== '') {
        
        let payAmount = parseFloat(courseFee.replace(/,/g, ''))

        function payWithPaystack() {

            var handler = PaystackPop.setup({
    
                key: 'pk_test_83f33db1f994b16e70279ac70c07601123dcae17', // Replace with your public key
                    
                email: email.value,
    
                amount: payAmount * 100, // the amount value is multiplied by 100 to convert to the lowest currency unit
    
                currency: 'NGN', // Use GHS for Ghana Cedis or USD for US Dollars
    
                ref: 'VISAGE'+Math.floor((Math.random() * 1000000000) + 1), // Replace with a reference you generated
    
                metadata: {
                    custom_fields: [
                        {
                            display_name: "Full Name:",
                            variable_name: "full_name",
                            value: fullName.value
                        },
                        {
                            display_name: "e-mail:",
                            variable_name: "email",
                            value: email.value
                        },
                        {
                            display_name: "Phone Number:",
                            variable_name: "phone_number",
                            value: phone.value
                        },
                        {
                            display_name: "Payed For:",
                            variable_name: "payed_for",
                            value: courseReg
                        },
                        {
                            display_name: "Amount Paid:",
                            variable_name: "course_price",
                            value: courseFee
                        },
                        {
                            display_name: "Course Duration:",
                            variable_name: "course_dur",
                            value: courseDur
                        },
                    ]
                },
    
                callback: function(response) {
    
                    //this happens after the payment is completed successfully
    
                    var reference = response.reference;
    
                    //this will be a message
                    alert('Registration successful! You will receive a response from us soon')
                    // success();
                    // Make an AJAX call to your server with the reference to verify the transaction
    
                },
    
                onClose: function() {
    
                    alert('Registration was not completed, please try again.');
                    // fail();
                },
    
            });
    
            handler.openIframe();
        }
        payWithPaystack();
    } else {
        alert('Please, fill all form fields')
    }
})

    