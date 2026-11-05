// ITCS333 A3 starter — implement the to-do app per README.
// You may wrap everything in a DOMContentLoaded handler or an IIFE.
// Requirements: add / toggle-complete / delete / filter / counter,
// using event delegation on #todo-list.

// TODO: your code here
document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('#todo-form');
  const input = document.querySelector('#todo-input');
  const errorMsg = document.querySelector('#error-msg');
  const todoList = document.querySelector('#todo-list');
  const counter = document.querySelector('#counter');

  const filterAll = document.querySelector('#filter-all');
  const filterActive = document.querySelector('#filter-active');
  const filterDone = document.querySelector('#filter-done');

  let currentFilter = 'all';

  function updateCounter() {
    const activeCount = todoList.querySelectorAll('li:not(.completed)').length;
    counter.textContent = `${activeCount} item${activeCount === 1 ? '' : 's'} left`;
  }

  function applyFilter() {
    const items = todoList.querySelectorAll('li');
    items.forEach((item) => {
      const isCompleted = item.classList.contains('completed');
      if (currentFilter === 'all') {
        item.style.display = '';
      } else if (currentFilter === 'active') {
        item.style.display = isCompleted ? 'none' : '';
      } else if (currentFilter === 'done') {
        item.style.display = isCompleted ? '' : 'none';
      }
    });
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const text = input.value.trim();

    if (!text) {
      errorMsg.classList.remove('hidden');
      return;
    }

    errorMsg.classList.add('hidden');

    const li = document.createElement('li');

    const span = document.createElement('span');
    span.textContent = text;

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.className = 'delete-btn';

    li.appendChild(span);
    li.appendChild(deleteBtn);

    todoList.appendChild(li);

    input.value = '';

    applyFilter();
    updateCounter();
  });

  todoList.addEventListener('click', (e) => {
    if (e.target.classList.contains('delete-btn')) {
      const li = e.target.closest('li');
      if (li) {
        li.remove();
        updateCounter();
      }
      return;
    }

    const li = e.target.closest('li');
    if (li && todoList.contains(li)) {
      li.classList.toggle('completed');
      applyFilter();
      updateCounter();
    }
  });

  if (filterAll) {
    filterAll.addEventListener('click', () => {
      currentFilter = 'all';
      applyFilter();
    });
  }

  if (filterActive) {
    filterActive.addEventListener('click', () => {
      currentFilter = 'active';
      applyFilter();
    });
  }

  if (filterDone) {
    filterDone.addEventListener('click', () => {
      currentFilter = 'done';
      applyFilter();
    });
  }

  updateCounter();
});