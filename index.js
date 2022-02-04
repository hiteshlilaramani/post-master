console.log('PostMan Clone');

// Utility Functions:
// 1. Utility function to get DOM element from string
function getElementFromString(string) {
    let div = document.createElement('div');
    div.innerHTML = string;
    return div.firstElementChild;
}

// Intiliaze number of parameters
let addedParamCount = 0;

// Hide parameters box intially
let parametersBox = document.getElementById('parametersBox')
parametersBox.style.display = 'none';

// Hide : If user clicks on params box, hide JSON box
let paramsRadio = document.getElementById('paramsRadio');
paramsRadio.addEventListener('click', () => {
    requestJsonBox.style.display = 'none';
    parametersBox.style.display = 'block';
})

// Hide : If user clicks on JSON box, hide params box
let jsonRadio = document.getElementById('jsonRadio');
jsonRadio.addEventListener('click', () => {
    parametersBox.style.display = 'none';
    requestJsonBox.style.display = 'block';
})

// If user clicks on + button, add more parameters
let addParams = document.getElementById('addParams');
addParams.addEventListener('click', () => {
    let params = document.getElementById('params');
    let string = `<div class="row my-2">
                        <label for="url" class="col-sm-2 col-form-label"><b>Parameter ${addedParamCount + 2}</b></label>
                        <div class="col-md-4">
                        <input type="text" class="form-control" id="parameterKey${addedParamCount + 2}" placeholder="Enter Parameter ${addedParamCount + 2} Key">
                        </div>
                        <div class="col-md-4">
                        <input type="text" class="form-control" id="parameterValue${addedParamCount + 2}" placeholder="Enter Parameter ${addedParamCount + 2} Value">
                        </div>
                        <button class="btn btn-outline-danger col-md-1 deleteParam">- Delete</button>
                    </div>`;
    // Convert the element string to DOM node
    let paramElement = getElementFromString(string);
    params.appendChild(paramElement);

    // Add an event listener to remove the parameters on clicking delete button
    let deleteParam = document.getElementsByClassName('deleteParam')
    for (item of deleteParam) {
        item.addEventListener('click', (e) => {
            e.target.parentElement.remove()
        })
    }
    addedParamCount++;
})

// If user clicks on submit button
let submit = document.getElementById('submit');
submit.addEventListener('click', () => {
    // Show please wait in the response box to request patience from the user
    // document.getElementById('reponseJsonText').value = "Please wait... Fetching Response";
    document.getElementById('responsePrism').innerHTML = "Please wait... Fetching Response";
    Prism.highlightAll();

    // Fetch all the values user has entered
    let url = document.getElementById('url').value;
    let requestType = document.querySelector("input[name='requestType']:checked").value;
    let contentType = document.querySelector("input[name='contentType']:checked").value;

    // If user has used params option instead of JSON, collect all the parameters in an object
    if (contentType == 'params') {
        data = {};
        for (let i = 0; i < addedParamCount + 1; i++) {
            if (document.getElementById('parameterKey' + (i + 1)) != undefined) {
                let key = document.getElementById('parameterKey' + (i + 1)).value;
                let value = document.getElementById('parameterValue' + (i + 1)).value;
                data[key] = value;
            }
        }
        data = JSON.stringify(data);
    }
    else {
        data = document.getElementById('requestJsonText').value;
    }

    // Log all the values in the console for debugging
    console.log('URL is ', url);
    console.log('requestType is ', requestType);
    console.log('contentType is ', contentType);
    console.log('data is ', data);

    // If request type is get, invoke fetch api to get request
    if (requestType == 'GET') {
        fetch (url,{
            method: 'GET',
        })
        .then(response=> response.text())
        .then((text)=>{
            // document.getElementById('reponseJsonText').value = text;
            document.getElementById('responsePrism').innerHTML = text;
            Prism.highlightAll();
        });
    }
    else{
        fetch (url,{
            method: 'POST',
            body: data,
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
              }
        })
        .then(response=> response.text())
        .then((text)=>{
            // document.getElementById('reponseJsonText').value = text;
            document.getElementById('responsePrism').innerHTML = text;
            Prism.highlightAll();
        });
    }
});
