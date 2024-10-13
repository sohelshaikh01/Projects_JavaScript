const form = document.querySelector("form");
// const height = parseInt(document.querySelector("#height").value)
// This usecase will give empty values

form.addEventListener('submit', function(e) {
    // To avoid by defualt form data to send through the server.
    e.preventDefault();

    const height = parseInt(document.querySelector("#height").value);
    const weight = parseInt(document.querySelector("#weight").value);
    const result = document.querySelector("#result");
    

    if(height === "" || height === 0 || isNaN(height)) {
        result.innerHTML = `Please give a valid height ${height}`;
    } 
    
    else if(weight === "" || weight === 0 || isNaN(weight)) {
        result.innerHTML = `Please give a valid width ${weight}`;
    } 
    
    else {
        const bmi = (weight / ((height * height) / 10000)).toFixed(2);
        // show the result 
        result.innerHTML = `<span> ${bmi} </span>`;
    }

});

// If we takes height, width reference outside of the form, It will first reload and gives the empty values.