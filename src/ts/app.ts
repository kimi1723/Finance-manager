const addTransactionBtn = document.querySelector('.add-transaction') as HTMLButtonElement;
const deleteAllBtn = document.querySelector('.delete-all') as HTMLButtonElement;
const deleteBtn = document.querySelector('.delete') as HTMLButtonElement;
const saveTransactionAdditionBtn = document.querySelector('.save') as HTMLButtonElement;
const cancelTransactionAdditionBtn = document.querySelector('.cancel') as HTMLButtonElement;

const transactionName = document.querySelector('#name') as HTMLInputElement;
const transactionAmount = document.querySelector('#amount') as HTMLInputElement;
const transactionCategory = document.querySelector('#category') as HTMLSelectElement;

const income = document.querySelector('.income-area') as HTMLDivElement;
const expenses = document.querySelector('.expenses-area') as HTMLDivElement;
const addTransactionPanel = document.querySelector('.add-transaction-panel') as HTMLDivElement;
const availableMoney = document.querySelector('.available-money') as HTMLDivElement;

const handleTransactionAddition = () => {
	const transactionDiv = document.createElement('div');
	const transactionNameP = document.createElement('p');
	const transactionNameSpan = document.createElement('span');
	const transactionAmountP = document.createElement('p');

	const transactionIcon = document.createElement('i');
	const transactionDeleteButton = document.createElement('button');
	const transactionDeleteButtonIcon = document.createElement('i');

	const selectedCategoryIndex = transactionCategory.options.selectedIndex;

	let amountPrefix;

	if (selectedCategoryIndex === 1) {
		console.log(transactionCategory.options[selectedCategoryIndex]);
		transactionIcon.classList.add('fas', 'fa-money-bill-wave');

		transactionNameP.append(transactionIcon);
		income.append(transactionDiv);

		amountPrefix = '';
	} else {
		amountPrefix = '-';
		switch (selectedCategoryIndex) {
			case 2:
				transactionIcon.classList.add('fas', 'fa-cart-arrow-down');
				transactionNameP.append(transactionIcon);
				break;

			case 3:
				transactionIcon.classList.add('fas', 'fa-hamburger');
				transactionNameP.append(transactionIcon);
				break;

			case 4:
				transactionIcon.classList.add('fas', 'fa-film');
				transactionNameP.append(transactionIcon);
				break;
		}
		expenses.append(transactionDiv);
	}

	transactionNameSpan.textContent = transactionName.value;
	transactionAmountP.textContent = `${amountPrefix}${transactionAmount.value}zł`;

	transactionDeleteButton.classList.add('delete');
	transactionDeleteButtonIcon.classList.add('fas', 'fa-times');
	transactionDeleteButton.append(transactionDeleteButtonIcon);
	transactionAmountP.append(transactionDeleteButton);

	transactionNameP.classList.add('transaction-name');
	transactionAmountP.classList.add('transaction-amount');
	transactionDiv.classList.add('transaction');

	transactionNameP.append(transactionNameSpan);
	transactionDiv.append(transactionNameP);
	transactionDiv.append(transactionAmountP);

	addTransactionPanel.classList.add('add-transaction-panel--hidden');
};

const showPanel = () => {
	addTransactionPanel.classList.remove('add-transaction-panel--hidden');
};

addTransactionBtn.addEventListener('click', showPanel);
saveTransactionAdditionBtn.addEventListener('click', handleTransactionAddition);
