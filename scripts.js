/**
 * Data Catalog Project Starter Code - SEA Stage 2
 *
 * This file is where you should be doing most of your work. You should
 * also make changes to the HTML and CSS files, but we want you to prioritize
 * demonstrating your understanding of data structures, and you'll do that
 * with the JavaScript code you write in this file.
 * 
 * The comments in this file are only to help you learn how the starter code
 * works. The instructions for the project are in the README. That said, here
 * are the three things you should do first to learn about the starter code:
 * - 1 - Change something small in index.html or style.css, then reload your 
 *    browser and make sure you can see that change. 
 * - 2 - On your browser, right click anywhere on the page and select
 *    "Inspect" to open the browser developer tools. Then, go to the "console"
 *    tab in the new window that opened up. This console is where you will see
 *    JavaScript errors and logs, which is extremely helpful for debugging.
 *    (These instructions assume you're using Chrome, opening developer tools
 *    may be different on other browsers. We suggest using Chrome.)
 * - 3 - Add another string to the titles array a few lines down. Reload your
 *    browser and observe what happens. You should see a fourth "card" appear
 *    with the string you added to the array, but a broken image.
 * 
 */

import { carList } from "./cars.js";

// Displays all car cards on the page
function showCards() {
    const cardContainer = document.getElementById("card-container");
    cardContainer.innerHTML = "";

    for (let i = 0; i < carList.length; ++i) {
        const car = carList[i];
        const card = document.createElement("div");
        card.classList.add("card");

        const cardContent = `<div class="card-content"><div class="car-title"><h2>${car.make} ${car.model}</div></h2>
        <img src="${car.imageURL}" alt="${car.make} ${car.model} image"/>
        <ul>
            <li>Engine: ${car.specifications.engine}</li>
            <li>Horsepower: ${car.specifications.horsepower}</li>
            <li>Top Speed: ${car.specifications.top_speed} mph</li>
            <li>0-60 mph: ${car.specifications.zero_to_sixty_in_seconds} seconds</li>
            <li>Price: $${car.specifications.price}</li>
        </ul> 
        <input type="checkbox" class="select-car-checkbox" id="car-checkbox-${i}" data-index="${i}"></>
        </div>`;

        card.innerHTML = cardContent;

        card.addEventListener("click", function() {
            console.log("Car selected.")
            const checkbox = card.querySelector(".select-car-checkbox");
            checkbox.checked = !checkbox.checked;
        });
        cardContainer.appendChild(card);
    }
}

// Displays comparison chart between the selected cars
function displayComparisonPopup(car1, car2) {
    console.log(car1);
    console.log(car2);
    const cardContainerContent = document.getElementById("card-container").innerHTML;
    const popupContent = `
    <html>
        <head>
            <title>Car Comparison | Results</title>
            <meta name="description" content="A Catalog of Cars" />
            <link rel="stylesheet" href="style.css" />
            <script type="module" src="scripts.js"></script>
            <style>
                .comparison-table {
                    width: 100%; 
                    max-width: auto; 
                    margin: auto; 
                }
                .comparison-table th{
                    font-family: Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;
                    font-size: 20px;
                    color: white;
                }
                .comparison-table td{
                    font-family: Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;
                    color: black;
                }
            </style>
        </head>
        <body>
            <header class="main-header">
                <h1 class="title">Results</h1>
            </header>
                <table class="comparison-table" bgcolor="black" width="600">
                    <tr bgcolor=#232531>
                        <th height="50" width="300">${car1.make} ${car1.model}</th>
                        <th width="300">${car2.make} ${car2.model}</th>
                    </tr>
                    <tr bgcolor="white" align="center">
                        <td height="30">Engine: ${car1.specifications.engine}</td>
                        <td height="30">Engine: ${car2.specifications.engine}</td>
                    </tr>
                    <tr bgcolor="white" align="center">
                        <td height="30">Horsepower: ${car1.specifications.horsepower}</td>
                        <td height="30">Horsepower: ${car2.specifications.horsepower}</td>
                    </tr>
                    <tr bgcolor="white" align="center">
                        <td height="30">Top Speed: ${car1.specifications.top_speed} mph</td>
                        <td height="30">Top Speed: ${car2.specifications.top_speed} mph</td>
                    </tr>
                    <tr bgcolor="white" align="center">
                        <td height="30">0-60 mph: ${car1.specifications.zero_to_sixty_in_seconds} seconds</td>
                        <td height="30">0-60 mph: ${car2.specifications.zero_to_sixty_in_seconds} seconds</td>
                    </tr>
                    <tr bgcolor="white" align="center">
                        <td height="30">Price: $${car1.specifications.price}</td>
                        <td height="30">Price: $${car2.specifications.price}</td>
                    </tr>
                    
                </table>
        </body>
        </html>
    `;
    const popupWindow = window.open("", "_blank", "width=800,height=300");
    popupWindow.document.write(popupContent)
}

// This calls the addCards() function when the page is first loaded
document.addEventListener("DOMContentLoaded", showCards);

document.getElementById("compare-button").addEventListener("click", function compareCars() {
    console.log("Compare button clicked"); 
    let car1, car2;
    const selectedCars = document.querySelectorAll(".card input[type='checkbox']:checked");
    if (selectedCars.length !== 2) {
        alert("Please select exactly two cars to compare.");
        return;
    }
    else {
        console.log(selectedCars[0].getAttribute("data-index"));
    console.log(selectedCars[1].getAttribute("data-index"));
        car1 = carList[selectedCars[0].getAttribute("data-index")];
        car2 = carList[selectedCars[1].getAttribute("data-index")];
        displayComparisonPopup(car1, car2);
    }
});

