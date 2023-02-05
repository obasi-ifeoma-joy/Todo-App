const theme = document.getElementById('theme');
const newTodoInput = document.getElementById('addItem');
const todoList = document.querySelector('.content ul');
const itemsLeft = document.querySelector('.items-left span');


itemsLeft.innerText = document.querySelectorAll('.list-item input[type="checkbox"]').length;

theme.addEventListener('click', (e) => {
document.querySelector('body').classList = [theme.checked ? 'theme-light' : 'theme-dark'];
});

newTodoInput.addEventListener('keypress', (e) => {
    if(e.key === 'Enter' && newTodoInput.value.length > 0){
        createNewTodoItem(newTodoInput.value);
        newTodoInput.value = '';
    }
});

// create new todoItem
const createNewTodoItem = (text) => {

    const newLi = document.createElement('li');
     
    newLi.classList.add('flex-row');
    newLi.innerHTML = `
    <label class="list-item">
          <input type="checkbox" name="todoItem">
          <span class="checkmark"></span>
          <span class="text">${text}</span>
        </label>
        <span class="remove"></span>
    `

    if(document.querySelector('.filter input[type="radio"]:checked').id === 'completed'){
      newLi.classList.add('hidden');
    }
   
    todoList.append(newLi);
    updateItemsCount(1)
}

const updateItemsCount = (number) => {
    itemsLeft.innerText = +itemsLeft.innerText + number;
};

// remove todo item

todoList.addEventListener('click', (e) => {
if(e.target.classList.contains('remove')){
    removeTodoItem(e.target.parentElement);
}
});

const removeTodoItem = (newLi) => {
    newLi.remove();
    updateItemsCount(-1);
}

// filter todo list items
document.querySelectorAll('.filter input').forEach(radio => {
    radio.addEventListener('change', (e) => {
        filterTodoItems(e.target.id);
    });
});

const filterTodoItems = (id) => {

    const allItems = todoList.querySelectorAll('li');

    switch(id){
        case 'all':
            allItems.forEach(item => {
                item.classList.remove('hidden');
            });
            break;

            case 'active':
                allItems.forEach(item => {
                    item.querySelector('input').checked ? item.classList.add('hidden') : item.classList.remove('hidden');
                });
                break;

                default:
                    allItems.forEach(item => {
                        !item.querySelector('input').checked ? item.classList.add('hidden') : item.classList.remove('hidden');
                    });
                    break;
    }
}

// clear completed items

document.querySelector('.clear').addEventListener('click', (e) => {
    document.querySelectorAll('.list-item input[type="checkbox"]:checked').forEach(item => {
        removeTodoItem(item.closest('li'));
    });
});