const loadMobiles = async(search, dataLimit) =>{
    const url = `https://openapi.programming-hero.com/api/phones?search=${search}`;
    const res = await fetch(url);
    const data = await res.json();
    displayMobiles(data.data, dataLimit);
}

const displayMobiles = (mobiles, dataLimit) =>{
    // console.log(mobiles);
    const mobileContainer = document.getElementById('mobiles-container');
    mobileContainer.innerHTML = '';
    //show all mobile 
    const showAllDiv = document.getElementById('show-all');
    if(dataLimit && mobiles.length > 10){
        mobiles = mobiles.slice(0, 10);
        showAllDiv.classList.remove('d-none');
    } else{
        showAllDiv.classList.add('d-none');
    }
    
    //not found
    const notFound = document.getElementById('not-found');
    if(mobiles.length > 1){
        mobiles.forEach(mobile => {
            const mobileDiv = document.createElement('div');
            mobileDiv.classList.add('col');
            mobileDiv.innerHTML = `
                <div class="card h-100">
                    <img src="${mobile.image}" class="card-img-top p-2" alt="...">
                    <div class="card-body">
                    <h5 class="card-title">${mobile.phone_name}</h5>
                    <p class="card-text">Brand: ${mobile.brand}</p>
                    <button onclick="loadMobileDetails('${mobile.slug}')" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#mobileDetailsModal">View Details</button>
                    </div>
                </div>
            `;
    
            mobileContainer.appendChild(mobileDiv);
            notFound.classList.add('d-none');
        });
    } else{
        notFound.classList.remove('d-none');
    }

    // stop loader
    toggleSpinner(false);
}

// new function to show more products using show more button
const processSearch = (dataLimit) =>{
    //start loader
    toggleSpinner(true);
    const searchField = document.getElementById('mobile-brand-field');
    const searchFieldText = searchField.value;
    loadMobiles(searchFieldText, dataLimit);
}
// handle search button click
document.getElementById('search-btn').addEventListener('click', function(){
    processSearch(10);
})

// search by enter
document.getElementById('mobile-brand-field').addEventListener('keypress', function(event){
    console.log(event.key);
    if(event.key === 'Enter'){
        processSearch(10);
    }
})



const toggleSpinner = isLoading =>{
    const spinnerSection = document.getElementById('spinner');
    if(isLoading){
        spinnerSection.classList.remove('d-none');
    } else{
        spinnerSection.classList.add('d-none');
    }
}

document.getElementById('show-all-btn').addEventListener('click', function(){
    processSearch()
})

const loadMobileDetails = async id =>{
    // console.log(id);
    const url = `https://openapi.programming-hero.com/api/phone/${id}`;
    const res = await fetch(url);
    const data = await res.json();
    displayMobileDetails(data.data);
}

const displayMobileDetails = mobile =>{
    console.log(mobile);
    document.getElementById('phone-name').innerText = `${mobile.name}`;
    const modalBody = document.getElementById('modal-body');
    modalBody.innerHTML = `
        <div class="card">
            <div class="row no-gutters">
                <div class="col-sm-4">
                    <img class="card-img" src="${mobile.image}" width="200px" alt="Mobile-Img">
                </div>
                <div class="col-sm-8">
                    <div class="card-body ">
                        <h6 class="card-title"><b>Brand:</b> ${mobile.brand}</h6>
                        <p><b>Release Date: </b> ${mobile.releaseDate}</p>
                        <p><b>Storage: </b> ${mobile.mainFeatures.storage}</p>
                        <p><b>Storage: </b> ${mobile.mainFeatures.storage}</p>
                        <p><b>Memory: </b> ${mobile.mainFeatures.memory}</p>
                        <p><b>Chipset: </b> ${mobile.mainFeatures.chipSet}</p>
                        <p><b>Display Size: </b> ${mobile.mainFeatures.displaySize}</p>
                    </div>
                </div>
            </div>
        </div>
    `;
}

loadMobiles ('oppo');