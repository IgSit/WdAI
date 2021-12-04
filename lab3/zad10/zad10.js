const categories = new Map();
const products = document.getElementById('products');
let selectedProducts = document.getElementById('selected-products');
let productWithCheckbox = []

async function load() {
    await loadProducts();
    categories.forEach(function(values, key) { insertProducts(key, values) } )
}

async function loadProducts() {
    let responseA = await fetch('productsA.json');
    let responseB = await fetch('productsB.json');
    let responseC = await fetch('productsC.json');
    
    let productsA = await responseA.json();
    let productsB = await responseB.json();
    let productsC = await responseC.json();

    let lists = [productsA.Products, productsB.Products, productsC.Products];
    lists.forEach(productSheet => {
        productSheet.forEach(category => {
            addFromSheet(category);
        });
    });
    
    function addFromSheet(category) {
        let categoryName = Object.keys(category)[0];
        let categoryValues = Object.values(category)[0];
        if (! categories.has(categoryName)) {
            categories.set(categoryName, new Set() );
        }
        categoryValues.forEach(value => {
            let name = categories.get(categoryName);  
            name.add(value.nazwa)
        });
    }
}

function insertProducts(key, values){
    let categoryDiv = document.createElement('div');
    categoryDiv.classList.add('category');

    let promptCheckbox = document.createElement('input');
    promptCheckbox.classList.add('prompt');
    promptCheckbox.setAttribute('id', `${key}Prompt`);
    promptCheckbox.setAttribute('type', 'checkbox');
    categoryDiv.appendChild(promptCheckbox);

    let promptLabel = document.createElement('label');
    promptLabel.setAttribute('for', `${key}Prompt`);
    promptLabel.innerHTML = '<i class="fa fa-angle-down"></i>';
    categoryDiv.appendChild(promptLabel);

    let catCheckbox = document.createElement('input');
    catCheckbox.setAttribute('type', 'checkbox');
    catCheckbox.setAttribute('id', `${key}`);
    catCheckbox.classList.add('category');
    categoryDiv.appendChild(catCheckbox);

    let categoryLabel = document.createElement('label');
    categoryLabel.setAttribute('for', `${key}`);
    categoryDiv.appendChild(categoryLabel);

    let catSpanBox = document.createElement('span');
    catSpanBox.classList.add('tick');
    catSpanBox.innerHTML = ' ';
    catSpanBox.setAttribute('id', `${key}-span`)

    categoryLabel.appendChild(catSpanBox);
    categoryLabel.innerHTML += `${key}`;

    let typeCheckboxArray = [];
    values.forEach(value => {
        let typesDiv = document.createElement('div');
        typesDiv.classList.add('types');
        categoryDiv.appendChild(typesDiv);

        let typeCheckbox = document.createElement('input');
        typeCheckbox.setAttribute('id', `${value}val`);
        typeCheckbox.setAttribute('type', 'checkbox');
        typeCheckbox.classList.add('value');
        typesDiv.appendChild(typeCheckbox);

        typeCheckboxArray.push(typeCheckbox);

        productWithCheckbox.push([typeCheckbox, value]);

         let valueLabel = document.createElement('label');
        valueLabel.setAttribute('for', `${value}val`);
        valueLabel.innerHTML = `${value}`;
        typesDiv.appendChild(valueLabel);
 
        categoryDiv.appendChild(typesDiv);

        typeCheckbox.addEventListener('change', checkAll);
        typeCheckbox.addEventListener('change', updateSelected);
    });

    products.appendChild(categoryDiv);

    catCheckbox.addEventListener('change', function() {
        if (this.checked) {
            promptCheckbox.checked = true;
            typeCheckboxArray.forEach(checkbox => {
                checkbox.checked = true;
            })
        }
        else {
            promptCheckbox.checked = false;
            typeCheckboxArray.forEach(checkbox => {
                checkbox.checked = false;
            })
        }
        updateSelected();
        checkAll();
    });

    function updateSelected () {
        let selected = []
        productWithCheckbox.forEach(function ([checkbox, value]) {
            if (checkbox.checked) {
                selected.push(value);
            }
        })
        let selectedProducts = document.getElementById('selected-products');
        selectedProducts.innerText = '';
        selected.forEach(value => {
            selectedProducts.innerText += value + ', \n';
        })
    }

    function checkAll (){
        let toChange = document.getElementById(`${key}-span`)
        if (typeCheckboxArray.every(box => box.checked == true)) {
            toChange.innerHTML='<i class="fas fa-check"></i>';
        } else if (typeCheckboxArray.every(box => box.checked == false)) {
            toChange.innerHTML = ' ';            
        } else {
            toChange.innerHTML = '*';
        }
    }
}

window.onload = load;