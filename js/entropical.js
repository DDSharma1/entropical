document.body.style.border = "5px solid green";

function createLabelElement(inpLabel){
	const lbl = document.createElement('label');
	lbl.textContent = inpLabel;
	return lbl;
}

function createInputElementTextArea(initialText) {
	const newInput = document.createElement('textarea');
	newInput.type = 'text';
	newInput.name = 'inpText';
	newInput.id = 'inpText';
	newInput.required = true;
	newInput.className = 'textbox';
	newInput.style = 'width: 500px; height:60px; display: block;';
	newInput.value = initialText;
	return newInput;
}

function createInputElement() {
	const newInput = document.createElement('input');
	newInput.type = 'text';
	newInput.name = 'inpText';
	newInput.id = 'inpText';
	newInput.required = true;
	newInput.className = 'textbox';
	newInput.style = 'width: 500px; height:60px; display: block;';
	newInput.value = "Suggested tweet will be shown in a moment....";
	return newInput;
}

function createButton() {
	const button = document.createElement('button');
	button.innerHTML = ''; // keeping the button invisible for now; future functionality.
	button.className = 'css-901oao css-16my406 r-poiln3 r-bcqeeo r-qvutc0';
	button.onclick = function(){
		// call the backend to validate the 
		      alert('here be dragons');return false;
	};
	return button;	
}

function createDiv() {
	const newDiv = document.createElement('div');
	newDiv.className = 'css-4rbku5 css-901oao r-18jsvk2 r-16y2uox r-37j5jr r-yy2aun r-1vr29t4 r-37tt59 r-bcqeeo r-fdjqy7 r-qvutc0';
	newDiv.textContent = "Entropical Assistant: ";
	return newDiv;
}

let timeoutId; // Stores the timeout ID

function handleTabPressed(message, pMessage) {
	//alert('tab pressed');
	console.log("Handling Tab pressed");
	if (pMessage === 'Previous tweet (if any) appears here...'){
		pMessage = '';
	}
	//const element = document.elementFromPoint(event.clientX, event.clientY);
	//const element = document.elementFromPoint(event.clientX, event.clientY);
	//const tweet = element.textContent;

	//var input = document.getElementById('inpText');
// TO DO - start here
	//input.textContent = message;  
	//alert(message);
	clearTimeout(timeoutId); // Clear any previous timeouts
	// Start a new timeout to trigger an action after a delay
	timeoutId = setTimeout(() => {
		validateRequest(message, pMessage).then( (result) => {
			console.log(result);
			console.log("Backend response: " + result.response[0]);
			//const inp = document.getElementById("inpText");
			//inp.value = result.response[0];
			tArea.value = result.response[0];
			// replace the contents of inpText
			// We need to add the loading/wait while processing
			// we also need to add another button to move it tweet (optional since a user may not take all of it.
		})
    }, 5000); // Delay in milliseconds (e.g., 1000ms = 1 second); It should really come from a config file.

	return false;
}

function validateRequest(pText, pTweetText){
    /*
        This function takes only one request and submits it to a desired graph on the backend
        for executions. After it receives the resonses to all the requests, it sends the response array back.
    */  
    // move the graph URL, graph name, graph user name, funding key etc to config file and retrieve it from there
    const url = "https://www.hyperthetical.dev/rungraph";
    const graphName = "Entropical";
    const graphUserName = "GenLabHackathon";
    const fundingKey = "b6814a9b-3b7e-43fb-a0ab-8097ec1edb3b";
    const headers = {
            'Accept': '*/*',
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
    };
   //TO DO pass pTweetText under Dialog
    const data = {
        "graphName": graphName,
        "graphUserName": graphUserName,
        "inputData": {
            "Dialog": [ 
                pText, pTweetText 
            ]
        },
        "fundingKey": fundingKey,
        "pollingGuid": "some-polling-guid-dd"
    };
    console.log(`The graph execution url is: ${url} and the first text is: ${pText} \n and the sectond text is {pTweetText}`);
    return fetch(url, {
        headers: headers,
        body: JSON.stringify(data),
        method: 'POST'
    }).then (result=> {
        if (!result.ok){
            throw new Error('API call did not succeed.');
        }
        return result.json();
        })
        .catch(error => {
            console.error('Error fetching data', error);
            throw error;
        });
}

// Main execution; start with creating global objects that we can reference in different functions
const label = createLabelElement("Suggested Tweet");
//var   input = createInputElement();
const tArea = createInputElementTextArea('Suggested tweet will be shown here in a moment after you press the tab key after entering your initial tweet....');
const ptArea = createInputElementTextArea('Previous tweet (if any) appears here...');
const button = createButton();

setTimeout(() => {
	//const target = document.getElementsByClassName('css-4rbku5 css-901oao r-18jsvk2 r-16y2uox r-37j5jr r-yy2aun r-1vr29t4 r-37tt59 r-bcqeeo r-fdjqy7 r-qvutc0')[0];
	//const newTarget = document.getElementsByClassName('css-1dbjc4n r-14lw9ot r-184en5c')[0];
	const newTarget = document.getElementsByClassName('css-1dbjc4n r-1sw30gj r-109y4c4')[0];
	const newDiv = createDiv();
	//Add the label after entering a line break
	newDiv.appendChild(label);
	newDiv.appendChild(ptArea);
	newDiv.appendChild(tArea);
	//newDiv.appendChild(input);
	newDiv.appendChild(button);
	console.log("previous tweet: " + ptArea.textContent);
	const tweetElement = document.getElementsByClassName('public-DraftStyleDefault-block public-DraftStyleDefault-ltr')[0];
	console.log(tweetElement);
	console.log(newTarget);
	//target.insertAdjacentElement('beforebegin', newDiv);
	newTarget.insertAdjacentElement('beforebegin', newDiv);
	document.addEventListener('keydown', (event) => {
		if (event.keyCode === 9) {
		// Perform the desired action when the Tab key is pressed
			handleTabPressed(tweetElement.textContent, ptArea.value);
			console.log('Tab key pressed');
			console.log('my tweet: ' + tweetElement.textContent);
			console.log('prev tweet value: ' + ptArea.value);
		}
	});
	//newDiv.textContent = tweetElement.textContent;
	//const tweet2 = document.getElementsByClassName('public-DraftStyleDefault-block public-DraftStyleDefault-ltr')[0];
	//setTimeout(() => {tweet2.textContent = 'Response coming from the backend'}, 5000);
}, 10000);




