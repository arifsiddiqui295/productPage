var quantity = 1;
const cartValue = 3;
var title1;
let size = "";
var colorForPop ="";
var price1;
const firstPrice = document.querySelector(".firstPrice");
const title = document.querySelector(".title");
const price = document.querySelector(".price");
const description = document.querySelector(".description");
const allsizes = document.querySelector(".allsizes");
const colors = document.querySelector(".colors");
const number = document.querySelector(".number");
const cartNumber = document.querySelector(".cartNumber");
const leftImages = document.querySelector(".leftImages");
const belowMainImages = document.querySelectorAll('.belowMain img');
const mainImage = document.querySelector('.main img');
function fetchImages() {
    const accessKey = 'ZzE1cB1wQpyQ7xVuog4wPGKcmpBLG-12jTwy-MiiHKU';
    const url = `https://api.unsplash.com/photos/women  ?count=4&client_id=${accessKey}`;

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            const images = document.querySelectorAll('.belowMain img');
            data.forEach((item, index) => {
                images[index].src = item.urls.regular;
                images[index].alt = item.alt_description || 'Image';
            });
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
        });
}

fetchImages();
belowMainImages.forEach((image) => {
    image.addEventListener('click', () => {
        belowMainImages.forEach((img) => {
            img.style.border = "none";
        });
        image.style.border = "3px solid #3a4980";
        mainImage.src = image.src;
    });
});

fetch(
  "https://cdn.shopify.com/s/files/1/0564/3685/0790/files/singleProduct.json?v=1701948448"
)
  .then((response) => {
    // Check if the response is successful (status code 200)
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    // Parse the JSON response
    return response.json();
  })
  .then((data) => {
    // Handle the data
    displayProductData(data);
  })
  .catch((error) => {
    // Handle any errors
    console.error("There was a problem with the fetch operation:", error);
  });
function displayProductData(data) {
  const newprice = parseFloat(data.product.price.replace(/\$/g, ""));
  const compareAtPrice = parseFloat(
    data.product.compare_at_price.replace(/\$/g, "")
  );
  const percentage = Math.round(
    ((compareAtPrice - newprice) / compareAtPrice) * 100
  );
  //   console.log("percentage: ", percentage);
  description.innerHTML = `<p>${data.product.description}</p>`;
  title1=data.product.title;
  price1=data.product.price;
  title.innerHTML = `
    <h1>${data.product.title}</h1>
    `;
  console.log(data.product.images[0].src);
  price.innerHTML = ` 
    <h1>${data.product.price}</h1>
    <p>${percentage}% Off</p>
    `;
  firstPrice.innerHTML = `<p class="cutprice">${data.product.compare_at_price}</p>`;

  colors.innerHTML = "";
  data.product.options[0].values.forEach((colorInfo) => {
    const color = Object.keys(colorInfo)[0];
    const value = colorInfo[color];
    colors.innerHTML += `<div class="for_center" onclick="toggleBorderColor(this)">
        <div style="border: 2px solid ${value}" class="bordercolor"></div>
        <div class="color1" style="background-color: ${value};"></div>
    </div>`;
  });

  allsizes.innerHTML = "";
  data.product.options[1].values.forEach((value) => {
    allsizes.innerHTML += `
        <div onclick="selected(event)" class="small">
            <div class="button">
                <div class="circle">
                    <div class="innercircle"></div>
                </div>
                ${value}
            </div>
        </div>`;
  });
 
  number.innerHTML = `<p>${quantity}</p>
  `;
  cartNumber.innerHTML = `
  <p>${cartValue + quantity}</p>
  `;
}
// Function to toggle border color visibility
function toggleBorderColor(clickedElement) {
    const allForCenter = document.querySelectorAll('.for_center');

    allForCenter.forEach((element) => {
        const borderColor = element.querySelector('.bordercolor');

        if (element !== clickedElement) {
            borderColor.style.display = 'none';
        } else {
            if (borderColor.style.display === 'none' || borderColor.style.display === '') {
                borderColor.style.display = 'flex';
                // Retrieve color value from the clicked element
                const colorDiv = element.querySelector('.color1');
                colorForPop = colorDiv.style.backgroundColor;
                console.log("Color for popup:", colorForPop);
            } else {
                borderColor.style.display = 'none';
                colorForPop = ""; // Reset colorForPop when the border color is hidden
            }
        }
    });
}

function selected(event) {
    let button = event.currentTarget;
    let buttonContent = button.textContent.trim();
    size = buttonContent.trim(); // Update the global size variable
    console.log('size ', size);
    document.querySelectorAll(".innercircle").forEach((circle) => {
        circle.style.display = "none";
    });
    let innerCircle = button.querySelector(".innercircle");
    if (innerCircle.style.display === "none") {
        innerCircle.style.display = "flex";
    } else {
        innerCircle.style.display = "none";
    }
}

function decreaseQuantity() {
  if (quantity > 0) {
    quantity--;
    updateQuantityDisplay();
  }
}
function increaseQuantity() {
  quantity++;
  updateQuantityDisplay();
}
function updateQuantityDisplay() {
  const number = document.querySelector(".number");
  number.innerHTML = `<p>${quantity}</p>`;
}
function showPopup() {
    document.getElementById("popup").style.display = "flex";
    setTimeout(function () {
        document.getElementById("popup").style.opacity = "1";
    }, 10);
    document.getElementById("popup").innerHTML = `<div class="popup-content">
    <span class="close" onclick="hidePopup()">&times;</span>
    <h2>You Have Added</h2>
    <div class="productDesc">
        <p>Product Name: ${title1} </p>
        <p>Price: ${price1}</p>
        <div class="colordiv">
            <p>Color:</p>
            <div style="background-color:${colorForPop};" class="popcolor"></div>  
        </div>
        <p>Size: ${size}</p>
        <p>Quantity : ${quantity}</p>
    </div>
    <div class="proceed">
    <a href="/index.html">
    <button>Proceed To Buy</button>
    </a>
    </div>
    </div>`
    console.log(title1)
}
function hidePopup() {
  document.getElementById("popup").style.opacity = "0"; // Fade out first
  setTimeout(function () {
    document.getElementById("popup").style.display = "none";
  }, 300);
}
function cartadd() {
  showPopup();
  cartNumber.innerHTML = `
    <p>${cartValue + quantity}</p>
    `;
}
