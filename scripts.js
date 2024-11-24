document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('form');
    const entriesSection = document.getElementById('entries');
    let entries = JSON.parse(localStorage.getItem('entries')) || [];
    let editingIndex = null;

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const date = document.getElementById('date').value;
        const content = document.getElementById('content').value;

        if (date && content) {
            const entry = { date, content, edited: editingIndex !== null };
            if (editingIndex !== null) {
                entries[editingIndex] = entry;
                editingIndex = null;
            } else {
                entries.push(entry);
            }
            localStorage.setItem('entries', JSON.stringify(entries));
            displayEntries();
            form.reset();
        } else {
            alert("日付と内容を入力してください");
        }
    });

    const displayEntries = () => {
        entriesSection.innerHTML = '';
        entries.forEach((entry, index) => {
            const entryDiv = document.createElement('div');
            entryDiv.classList.add('entry');

            const entryDate = document.createElement('h3');
            entryDate.textContent = entry.date;

            const entryContent = document.createElement('p');
            entryContent.textContent = entry.content;

            const editButton = document.createElement('button');
            editButton.textContent = '編集';
            editButton.addEventListener('click', () => {
                document.getElementById('date').value = entry.date;
                document.getElementById('content').value = entry.content;
                editingIndex = index;
                form.scrollIntoView();
            });

            const deleteButton = document.createElement('button');
            deleteButton.textContent = '削除';
            deleteButton.addEventListener('click', () => {
                deleteEntry(index);
            });

            if (entry.edited) {
                const editedLabel = document.createElement('span');
                editedLabel.textContent = ' (編集済み)';
                editedLabel.style.color = 'red';
                entryDate.appendChild(editedLabel);
            }

            entryDiv.appendChild(entryDate);
            entryDiv.appendChild(entryContent);
            entryDiv.appendChild(editButton);
            entryDiv.appendChild(deleteButton);
            entriesSection.appendChild(entryDiv);
        });
    };

    const deleteEntry = (index) => {
        entries.splice(index, 1);
        localStorage.setItem('entries', JSON.stringify(entries));
        displayEntries();
    };

    displayEntries();
});

