function todo() {
	let todoInput = document.querySelector('.todo__input');
	let todoAdd = document.querySelector('.todo__add');
	let todoContent = document.querySelector('.todo__content');

	let keys = Object.keys(localStorage);
	for (let key of keys) {
		let div = document.createElement('div');
		div.innerHTML = localStorage.getItem(key);
		let text = div.querySelector('p')

		if (text.dataset.chec == 'true') {
			add(text.textContent, 'true')
		} else {
			add(text.textContent)
		}
	}

	function add(val = todoInput.value, che = 'false') {
		let note = document.createElement('div');
		let noteCheck = document.createElement('input');
		let noteText = document.createElement('p');

		noteText.dataset.chec = 'false'
		noteText.textContent = val;
		noteText.contentEditable = 'true';

		let noteDelete = document.createElement('button');

		note.classList = 'todo__note';

		if (che == 'true') {
			note.classList.add('note-completed');
			noteCheck.checked = 'true';
			noteText.dataset.chec = 'true'
		}

		noteCheck.type = 'checkbox';
		noteCheck.addEventListener('click', (e) => {
			let parent = noteCheck.closest('.todo__note')
			parent.classList.toggle('note-completed')

			localStorage.removeItem(parent.querySelector('p').textContent)
			if (noteCheck.checked) {
				parent.querySelector('p').dataset.chec = 'true';
			} else {
				parent.querySelector('p').dataset.chec = 'false';
			}

			localStorage.setItem(parent.querySelector('p').textContent, parent.innerHTML)
		})

		noteDelete.textContent = 'Удалить';
		noteDelete.addEventListener('click', (e) => {
			let parent = noteDelete.closest('.todo__note')
			todoContent.removeChild(parent)
			localStorage.removeItem(`${parent.querySelector('p').textContent}`)
			if (todoContent.children.length == 1) {
				todoContent.firstChild.remove()
			}
		})

		note.append(noteCheck)
		note.append(noteText)
		note.append(noteDelete)


		if (todoContent.children.length < 1) {
			clear()
		}

		todoContent.append(note)
		localStorage.setItem(noteText.textContent, note.innerHTML)
	}

	function clear() {
		let clear = document.createElement('button')
		clear.classList = 'clear btn'
		clear.textContent = 'Очистить'
		clear.addEventListener('click', (e) => {
			localStorage.clear()
			while (todoContent.lastChild) {
				todoContent.lastChild.remove()
			}
		})
		todoContent.prepend(clear)
	}

	todoAdd.addEventListener('click', (e) => {
		add()
	})
}

todo()
