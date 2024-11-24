document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('form');
  const entriesSection = document.getElementById('entries');

  const displayEntries = (entries) => {
    entriesSection.innerHTML = '';
    entries.forEach(entry => {
      const entryDiv = document.createElement('div');
      entryDiv.classList.add('entry');

      const entryDate = document.createElement('h3');
      entryDate.textContent = entry.date;

      const entryContent = document.createElement('p');
      entryContent.textContent = entry.content;

      const editButton = document.createElement('button');
      editButton.textContent = '編集';

      const deleteButton = document.createElement('button');
      deleteButton.textContent = '削除';

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

  const fetchEntries = async () => {
    const response = await fetch('http://localhost:3000/getEntries');
    const data = await response.json();
    displayEntries(data);
  };

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const date = document.getElementById('date').value;
    const content = document.getElementById('content').value;

    if (date && content) {
      const newEntry = { date, content, edited: false };
      await fetch('http://localhost:3000/addEntry', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newEntry)
      });
      fetchEntries();
      form.reset();
    } else {
      alert("日付と内容を入力してください");
    }
  });

  fetchEntries();
});
