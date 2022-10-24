
// Obteniendo nodos del DOM

// Tarjetas de categorías
let { children } = document.getElementById('cardContainer');

// Select de categorías
let select = document.getElementById('selectCategoria');

// Boton de resumen (para calcular el costo total)
let resumen = document.getElementById('resumen');

// Formulario de compra
let form = document.getElementById('formularioCompra');

// Boton de borrar (reiniciar el formulario)
let borrar = document.getElementById('borrar');

// mensaje de costo total
let costoTotal = document.getElementById('costoTotal');

const handleChangeSelect = (event) => {
    let { value } = event.target;
    for (let i = 0; i < children.length; i++) {
        if (value === children[i].id) {
            children[i].className = 'promoCardSelected'
        } else {
            children[i].className = 'promoCard'
        }
    }
}

const handleClickPromo = (event) => {
    let { id } = event.target;
    select.value = id;

    for (let i = 0; i < children.length; i++) {
        if (id === children[i].id) {
            if (children[i].className === 'promoCard') {
                children[i].className = 'promoCardSelected'
                select.value = id;
            } else {
                children[i].className = 'promoCard'
                select.value = '';
            }
        } else {
            children[i].className = 'promoCard'
        }
    }
}

const handleBorrar = () => {
    form.reset();
    costoTotal.innerText = 'Total a pagar: $';
    for (let i = 0; i < children.length; i++) {
        children[i].className = 'promoCard'
    }
}

const handleSubmit = (event) => {
    event.preventDefault();

    let {
        nombre: { value: nombre },
        apellido: { value: apellido },
        email: { value: email },
        categoria: { value: categoria },
        cantidad: { value: cantidad }
    } = event.target;

    // Control de errores
    if (!nombre || !apellido || !email || !categoria || !cantidad) {
        return alert('Hay campos vacios');
    }

    if (isNaN(cantidad)) {
        alert('la cantidad debe ser un numero')
    }

    costoTotal.innerText = 'Total a pagar: $';

    // Cálculo del costo final
    switch (categoria) {
        case 'estudiante':
            return costoTotal.innerText += cantidad * 200 * 0.2;
        case 'trainee':
            return costoTotal.innerText += cantidad * 200 * 0.5;
        case 'junior':
            return costoTotal.innerText += cantidad * 200 * 0.85;
        default: return ''
    }
}

const handleBlur = (event) => {
    let { name, value } = event.target;

    if (name === 'nombre' || name === 'email' || name === 'apellido') {
        
        let input = document.getElementById(`input${name[0].toUpperCase() + name.substring(1)}`);
        if (!value) {
            if (name === 'email') {
                input.className += ' errorInput'
            } else {
                input.className = 'errorInput'
            }
        } else if (name === 'email') {
            input.className = 'inputEmail'
        } else {
            input.className = ''
        }
    }

}

const handleFocus = (event) => {
    let {name} = event.target;
    let input = document.getElementById(`input${name[0].toUpperCase() + name.substring(1)}`);
    if (name !== 'email') {
        input.className = ''
        return
    }
    input.className = 'inputEmail'
}

for (let i = 0; i < children.length; i++) {
    children[i].onclick = handleClickPromo;
}

select.onchange = handleChangeSelect;
form.addEventListener('submit', handleSubmit);
form.addEventListener('blur', handleBlur, true);
form.addEventListener('focus', handleFocus, true);
borrar.onclick = handleBorrar;