// Data names
people = [
    // Strings needs to be all in lowercase or search do not work
    { name: 'ilze' }, 
    { name: 'janis' },
    { name: 'ance' },
    { name: 'igors'},
    { name: 'anna' },
    { name: 'ance' },
    { name: 'sintija' },
    { name: 'ance' },
    { name: 'zane' }
];

// Getting list
const list = document.getElementById('list');

// Set list function
function setList(group) {
    clearList();
    for (const person of group) { // person variable represents specific item in array 
        // Creating new list item in ul
        const item = document.createElement('li'); // Creating new list element
        item.classList.add('list-group-item'); // Adding class to it 'list-group-item'
        const text = document.createTextNode(person.name); // Adding text to it from people array
        // Adding together
        item.appendChild(text); // Adding to item element text element
        list.appendChild(item);  // Adding to list element item element
    }
    if (group.length === 0) { // if group length is 0 fire setNoResults() function 
        setNoResults();
    }
}

// Function for clearing list
function clearList() {
    while (list.firstChild) {
        list.removeChild(list.firstChild);
    }
}

// Function for showing message 'No results found' when text node do not exist
function setNoResults() {
    const item = document.createElement('li'); // Creating new element in who is signed to item variable
    item.classList.add('list-group-item');
    const text = document.createTextNode('No results found');
    // Adding elements together
    item.appendChild(text);
    list.appendChild(item);
} 

// Sorting items by they relevancy
function getRelevancy(value, searchTerm) {
    if (value === searchTerm)  { // if value is equal to search term
        return 2; // Closest one
    } else if (value.startsWith(searchTerm)) { // if value starts whith any search term
        return 1; // Middle closest 
    } else if (value.includes(searchTerm)) { // if in value is some letter/text parts from search term
        return 0; // Last one
    }
}



// Geting search input
const searchInput = document.getElementById('search');

// Adding search input to Event Listner
searchInput.addEventListener('input', (event) => {
    let value = event.target.value;
    // trim() function for removing spaces
    if (value && value.trim().length > 0) { // if value and value whit no spaces length is greater than 0 then
        value = value.trim().toLowerCase(); // taking off spaces and lowercase the added input value
        setList(people.filter(person => { //  setList() add people array and filter 
            return person.name.includes(value); // this line gona just sorts value if it totally
        }).sort((personA, personB) => {
            return getRelevancy(personB.name, value) - getRelevancy(personA.name, value);
        }));
    } else {
        clearList();
    }
});